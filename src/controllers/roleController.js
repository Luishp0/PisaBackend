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
  