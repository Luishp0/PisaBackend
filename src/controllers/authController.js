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
          error: 'Tu cuenta ha sido bloqueada por múltiples intentos fallidos de inicio de sesión. Por favor, contacta al administrador para desbloquearla.',
          intentosFallidos: user.intentoFallidos,
          bloqueado: true
        });
      }
      
      // Verificar contraseña
      const isMatch = await bcrypt.compare(contraseña, user.contrasena);
      
      if (!isMatch) {
        // Incrementar contador de intentos fallidos
        user.intentoFallidos = (user.intentoFallidos || 0) + 1;
        
        // Bloquear usuario después de 5 intentos fallidos
        if (user.intentoFallidos >= 5) {
          user.bloqueado = true;
          await user.save();
          
          return res.status(403).json({
            error: 'Tu cuenta ha sido bloqueada por exceder el número máximo de intentos fallidos. Por favor, contacta al administrador para desbloquearla.',
            intentosFallidos: user.intentoFallidos,
            intentosRestantes: 0,
            bloqueado: true
          });
        }
        
        // Guardar el usuario actualizado
        await user.save();
        
        // Calcular intentos restantes DESPUÉS de guardar el usuario
        const intentosRestantes = Math.max(0, 5 - user.intentoFallidos);
        
        // Mensaje personalizado basado en los intentos restantes
        let mensajeError = 'Contraseña incorrecta.';
        if (intentosRestantes > 0) {
          mensajeError += ` Te quedan ${intentosRestantes} ${intentosRestantes === 1 ? 'intento' : 'intentos'} antes de que tu cuenta sea bloqueada.`;
        }
        
        return res.status(400).json({
          error: mensajeError,
          intentosFallidos: user.intentoFallidos,
          intentosRestantes: intentosRestantes
        });
      }
      
      // Si la autenticación es exitosa, resetear intentos fallidos
      user.intentoFallidos = 0;
      user.bloqueado = false; // Asegurarse de que el usuario no esté bloqueado
      
      // Actualizar fecha de último login
      user.ultimoInicioSesion = new Date();
      await user.save();
      
      // Generar token JWT
      const token = jwt.sign(
        {
          id: user._id,
          idRol: user.idRol,
          nombreUsuario: user.nombreUsuario
        },
        process.env.JWT_SECRET || 'secret',
        { expiresIn: '24h' }
      );
      
      // Devolver token y datos del usuario (sin la contraseña)
      const userToReturn = {
        _id: user._id,
        nombreUsuario: user.nombreUsuario,
        familia: user.familia,
        puesto: user.puesto,
        idRol: user.idRol,
        ultimoInicioSesion: user.ultimoInicioSesion
      };
      
      return res.status(200).json({
        token,
        user: userToReturn
      });
      
    } catch (error) {
      console.error('Error en login:', error);
      return res.status(500).json({ error: 'Error en el servidor. Por favor, inténtalo de nuevo más tarde.' });
    }
  };

// Bloquear usuario por nombre de usuario
export const bloquearUsuario = async (req, res) => {
    try {
      const { nombreUsuario } = req.body;
      
      if (!nombreUsuario) {
        return res.status(400).json({ error: 'Nombre de usuario requerido' });
      }
      
      const user = await User.findOne({ nombreUsuario });
      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      
      // Verificar si el usuario ya está bloqueado
      if (user.bloqueado) {
        return res.status(200).json({
          message: 'El usuario ya se encuentra bloqueado',
          nombreUsuario: user.nombreUsuario
        });
      }
      
      // Bloquear el usuario
      user.bloqueado = true;
      await user.save();
      
      return res.status(200).json({
        message: 'Usuario bloqueado exitosamente',
        nombreUsuario: user.nombreUsuario
      });
    } catch (error) {
      console.error('Error al bloquear usuario:', error);
      return res.status(500).json({ error: 'Error en el servidor al intentar bloquear el usuario' });
    }
  };

// Desbloquear usuario
export const desbloquearUsuario = async (req, res) => {
    try {
      const { userId } = req.body;
      
      if (!userId) {
        return res.status(400).json({ error: 'ID de usuario requerido' });
      }
      
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      
      // Comprobar si el usuario ya está desbloqueado
      if (!user.bloqueado && user.intentoFallidos === 0) {
        return res.status(200).json({ 
          message: 'El usuario ya se encuentra desbloqueado',
          nombreUsuario: user.nombreUsuario
        });
      }
      
      // Desbloquear el usuario y resetear intentos fallidos
      user.bloqueado = false;
      user.intentoFallidos = 0;
      await user.save();
      
      return res.status(200).json({ 
        message: 'Usuario desbloqueado exitosamente',
        nombreUsuario: user.nombreUsuario
      });
    } catch (error) {
      console.error('Error al desbloquear usuario:', error);
      return res.status(500).json({ error: 'Error en el servidor al intentar desbloquear el usuario' });
    }
  };
  
// Desbloquear usuario por nombre de usuario
export const desbloquearUsuarioPorNombre = async (req, res) => {
    try {
      const { nombreUsuario } = req.body;
      
      if (!nombreUsuario) {
        return res.status(400).json({ error: 'Nombre de usuario requerido' });
      }
      
      const user = await User.findOne({ nombreUsuario });
      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      
      // Comprobar si el usuario ya está desbloqueado
      if (!user.bloqueado && user.intentoFallidos === 0) {
        return res.status(200).json({ 
          message: 'El usuario ya se encuentra desbloqueado',
          nombreUsuario: user.nombreUsuario
        });
      }
      
      // Desbloquear el usuario y resetear intentos fallidos
      user.bloqueado = false;
      user.intentoFallidos = 0;
      await user.save();
      
      return res.status(200).json({ 
        message: 'Usuario desbloqueado exitosamente',
        nombreUsuario: user.nombreUsuario
      });
    } catch (error) {
      console.error('Error al desbloquear usuario:', error);
      return res.status(500).json({ error: 'Error en el servidor al intentar desbloquear el usuario' });
    }
  };
  
// Obtener último login
export const getLastLogin = async (req, res) => {
    try {
      const { userId } = req.params;
      
      if (!userId) {
        return res.status(400).json({ error: 'ID de usuario requerido' });
      }
      
      const user = await User.findById(userId).select('ultimoInicioSesion nombreUsuario');
      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      
      return res.status(200).json({ 
        ultimoInicioSesion: user.ultimoInicioSesion,
        nombreUsuario: user.nombreUsuario 
      });
    } catch (error) {
      console.error('Error al obtener último inicio de sesión:', error);
      return res.status(500).json({ error: 'Error en el servidor' });
    }
  };

// Endpoint para restablecer intentos fallidos (para pruebas)
export const resetIntentosFallidos = async (req, res) => {
    try {
      const { userId } = req.body;
      
      if (!userId) {
        return res.status(400).json({ error: 'ID de usuario requerido' });
      }
      
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      
      // Restablecer intentos fallidos y desbloquear
      user.intentoFallidos = 0;
      user.bloqueado = false;
      await user.save();
      
      return res.status(200).json({ 
        message: 'Intentos fallidos restablecidos y usuario desbloqueado', 
        nombreUsuario: user.nombreUsuario 
      });
    } catch (error) {
      console.error('Error al restablecer intentos fallidos:', error);
      return res.status(500).json({ error: 'Error en el servidor' });
    }
  };