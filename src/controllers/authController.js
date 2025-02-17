import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const loginUser = async (req, res) => {
    try {
      const { nombreUsuario, contraseña } = req.body;
  
      // Verificar si el usuario existe
      const user = await User.findOne({ nombreUsuario });
      if (!user) {
        return res.status(400).json({ error: 'Usuario no encontrado' });
      }
  
      // Verificar si está bloqueado
      if (user.bloqueado) {
        return res.status(403).json({ 
          error: 'Usuario bloqueado por múltiples intentos fallidos', 
          intentosFallidos: user.intentosFallidos 
        });
      }
  
      // Verificar la contraseña
      const isMatch = await bcrypt.compare(contraseña, user.contraseña);
      if (!isMatch) {
        // Incrementar intentos fallidos
        user.intentosFallidos += 1;
  
        // Bloquear usuario si supera 5 intentos
        if (user.intentosFallidos >= 5) {
          user.bloqueado = true;
          await user.save();
          return res.status(403).json({ 
            error: 'Usuario bloqueado por múltiples intentos fallidos', 
            intentosFallidos: user.intentosFallidos 
          });
        }
  
        await user.save();
        return res.status(400).json({ 
          error: 'Contraseña incorrecta', 
          intentosFallidos: user.intentosFallidos, 
          intentosRestantes: 5 - user.intentosFallidos 
        });
      }
  
      // Resetear intentos fallidos en caso de éxito
      user.intentosFallidos = 0;
      await user.save();
  
      // Generar token
      const token = jwt.sign({ id: user._id, rol: user.idRol }, 'secreto', { expiresIn: '1h' });
  
      res.status(200).json({ message: 'Login exitoso', token });
    } catch (error) {
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
  