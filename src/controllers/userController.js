import Usuario from '../models/userModel.js';
import Role from '../models/roleModel.js';
import bcrypt from 'bcrypt';

// Crear usuario
export const createUser = async (req, res) => {
  try {
      const { nombreUsuario, contrasena, familia, puesto, idRol } = req.body;

      // Hashear la contraseña antes de guardarla
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(contrasena, salt);

      const newUser = new Usuario({
          nombreUsuario,
          contrasena: hashedPassword,
          familia,
          puesto,
          idRol,
      });

      await newUser.save();
      res.status(201).json({ message: "Usuario creado exitosamente", usuario: newUser });
  } catch (error) {
      console.error("Error al crear el usuario:", error); // 🔴 Esto mostrará el error real en la consola
      res.status(500).json({ message: "Error al crear el usuario", error: error.message });
  }
};

// Obtener todos los usuarios
export const getUsers = async (req, res) => {
  try {
      const users = await Usuario.find().populate("idRol", "tipo"); // Trae el nombre del rol
      res.json(users);
  } catch (error) {
      res.status(500).json({ message: "Error al obtener los usuarios", error });
  }
};

// Obtener usuario por ID
export const getUserById = async (req, res) => {
  try {
      const { id } = req.params;
      const user = await Usuario.findById(id).populate("idRol", "tipo");

      if (!user) {
          return res.status(404).json({ message: "Usuario no encontrado" });
      }

      res.json(user);
  } catch (error) {
      res.status(500).json({ message: "Error al obtener el usuario", error });
  }
};

// Actualizar usuario
export const updateUser = async (req, res) => {
  try {
      const { id } = req.params;
      const { nombreUsuario, contrasena, familia, puesto, idRol } = req.body;

      const updatedData = { nombreUsuario, familia, puesto, idRol };

      // Si el usuario envía una nueva contraseña, la hasheamos
      if (contrasena) {
          const salt = await bcrypt.genSalt(10);
          updatedData.contrasena = await bcrypt.hash(contrasena, salt);
      }

      const updatedUser = await Usuario.findByIdAndUpdate(id, updatedData, { new: true });

      if (!updatedUser) {
          return res.status(404).json({ message: "Usuario no encontrado" });
      }

      res.json({ message: "Usuario actualizado exitosamente", usuario: updatedUser });
  } catch (error) {
      res.status(500).json({ message: "Error al actualizar el usuario", error });
  }
};

// Eliminar usuario
export const deleteUser = async (req, res) => {
  try {
      const { id } = req.params;
      const deletedUser = await Usuario.findByIdAndDelete(id);

      if (!deletedUser) {
          return res.status(404).json({ message: "Usuario no encontrado" });
      }

      res.json({ message: "Usuario eliminado exitosamente" });
  } catch (error) {
      res.status(500).json({ message: "Error al eliminar el usuario", error });
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
