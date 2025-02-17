import User from '../models/userModel.js';
import Role from '../models/roleModel.js';
import bcrypt from 'bcrypt';

// Registrar un usuario
export const registerUser = async (req, res) => {
    try {
      const { nombreUsuario, contrasena, familia, puesto, idRol } = req.body;
  
      // Verificar si el rol existe
      const role = await Role.findOne({ idRol });
      if (!role) return res.status(400).json({ error: 'Rol no válido' });
  
      // Encriptar la contraseña
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(contrasena, salt);
  
      // Crear usuario
      const newUser = new User({
        nombreUsuario,
        contrasena: hashedPassword,
        familia,
        puesto,
        idRol: role.idRol, // Asignamos el rol existente
      });
  
      await newUser.save();
      res.status(201).json({ message: 'Usuario registrado correctamente' });
  
    } catch (error) {
      res.status(500).json({ error: 'Error al registrar usuario' });
    }
  };


// Obtener todos los usuarios
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate('idRol', 'NombreRol'); // Trae el rol asociado
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
};

// Buscar usuarios por nombre
export const getUserByName = async (req, res) => {
  try {
    const { nombre } = req.params;
    const users = await User.find({ nombreUsuario: new RegExp(nombre, 'i') }); // Búsqueda insensible a mayúsculas/minúsculas
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar usuario' });
  }
};

// Obtener estado de un usuario por su ID
export const getUserStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select('estado nombreUsuario');
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener estado del usuario' });
  }
};
