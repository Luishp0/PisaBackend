import Role from '../models/roleModel.js';

// Obtener todos los roles
export const getAllRoles = async (req, res) => {
  try {
    const roles = await Role.find();
    res.json(roles);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener roles' });
  }
};

export const getRoleByClase = async (req, res) => {
    try {
      const role = await Role.findOne({ clase: req.params.clase });
  
      if (!role) return res.status(404).json({ error: 'Rol no encontrado' });
  
      res.json(role);
    } catch (error) {
      res.status(500).json({ error: 'Error al buscar rol' });
    }
  };
  
  // Crear un nuevo role
export const createRole = async (req, res) => {
  try {
    const { tipo } = req.body;
    const newRole = new Role({ tipo });
    await newRole.save();
    res.status(201).json(newRole);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el rol", error });
  }
};


// Obtener un role por ID
export const getRoleById = async (req, res) => {
  try {
    const role = await Role.findById(req.params.id);
    if (!role) {
      return res.status(404).json({ message: "Role no encontrado" });
    }
    res.status(200).json(role);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el rol", error });
  }
};

// Actualizar un role
export const updateRole = async (req, res) => {
  try {
    const role = await Role.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!role) {
      return res.status(404).json({ message: "Role no encontrado" });
    }
    res.status(200).json(role);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el rol", error });
  }
};

// Eliminar un role
export const deleteRole = async (req, res) => {
  try {
    const role = await Role.findByIdAndDelete(req.params.id);
    if (!role) {
      return res.status(404).json({ message: "Role no encontrado" });
    }
    res.status(200).json({ message: "Role eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el rol", error });
  }
};