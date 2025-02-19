import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Login y actualización del último inicio de sesión
export const loginUser = async (req, res) => {
  try {
      const { nombreUsuario, contraseña } = req.body;

      // Verificar si el usuario existe
      const user = await User.findOne({ nombreUsuario });
      if (!user) {
          return res.status(400).json({ error: 'Usuario no encontrado' });
      }

      // Verificar si el usuario está bloqueado
      if (user.bloqueado) {
          return res.status(403).json({ 
              error: 'Usuario bloqueado por múltiples intentos fallidos', 
              intentosFallidos: user.intentosFallidos 
          });
      }

      // Verificar la contraseña
      const isMatch = await bcrypt.compare(contraseña, user.contrasena);
      if (!isMatch) {
          // Incrementar intentos fallidos
          user.intentoFallidos += 1;

          // Bloquear usuario si supera 5 intentos
          if (user.intentosFallidos >= 5) {
              user.bloqueado = true;
              await user.save();
              return res.status(403).json({ 
                  error: 'Usuario bloqueado por múltiples intentos fallidos', 
                  intentosFallidos: user.intentoFallidos 
              });
          }

          await user.save();
          return res.status(400).json({ 
              error: 'Contraseña incorrecta', 
              intentosFallidos: user.intentoFallidos, 
              intentosRestantes: 5 - user.intentoFallidos 
          });
      }

      // Resetear intentos fallidos en caso de éxito
      user.intentoFallidos = 0;
      user.ultimoInicioSesion = new Date(); // 🔹 Actualiza la fecha del último inicio de sesión
      await user.save();

      // Generar token
      const token = jwt.sign({ id: user._id, rol: user.idRol }, 'secreto', { expiresIn: '1h' });

      res.status(200).json({ 
          message: 'Login exitoso', 
          token, 
          usuario: {
              id: user._id,
              nombreUsuario: user.nombreUsuario,
              ultimoInicioSesion: user.ultimoInicioSesion
          }
      });
  } catch (error) {
      console.error("Error en loginx:", error);
      res.status(500).json({ error: 'Error en el login' });
  }
};
  

export const desbloquearUsuario = async (req, res) => {
    try {
      const { nombreUsuario } = req.body;
  
      // Buscar usuario
      const user = await User.findOne({ nombreUsuario });
      if (!user) return res.status(400).json({ error: 'Usuario no encontrado' });
  
      // Desbloquear usuario
      user.intentosFallidos = 0;
      user.bloqueado = false;
      await user.save();
  
      res.status(200).json({ message: 'Usuario desbloqueado exitosamente' });
    } catch (error) {
      res.status(500).json({ error: 'Error al desbloquear usuario' });
    }
  };
  
  export const getLastLogin = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findById(userId, 'nombreUsuario ultimoInicioSesion');
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        // 🔹 Formatear la fecha
        const fechaFormateada = user.ultimoInicioSesion
            ? new Intl.DateTimeFormat('es-MX', { dateStyle: 'short', timeStyle: 'medium' }).format(user.ultimoInicioSesion)
            : 'Nunca ha iniciado sesión';

        res.json({
            nombreUsuario: user.nombreUsuario,
            ultimoInicioSesion: fechaFormateada
        });
    } catch (error) {
        console.error("Error al obtener el último inicio de sesión:", error);
        res.status(500).json({ error: 'Error al obtener la información' });
    }
};

