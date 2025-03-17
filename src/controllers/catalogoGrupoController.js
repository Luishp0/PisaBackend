import CatalogoGrupo from '../models/catalogoGrupoModel.js';

// Obtener todos los grupos del catálogo
export const getAllCatalogoGrupos = async (req, res) => {
  try {
    const catalogoGrupos = await CatalogoGrupo.find();
    res.status(200).json(catalogoGrupos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener catálogo de grupos', error: error.message });
  }
};

// Obtener un grupo específico por ID
export const getCatalogoGrupoById = async (req, res) => {
  try {
    const { id } = req.params;
    const catalogoGrupo = await CatalogoGrupo.findById(id);
    
    if (!catalogoGrupo) {
      return res.status(404).json({ message: 'Grupo no encontrado' });
    }
    
    res.status(200).json(catalogoGrupo);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el grupo', error: error.message });
  }
};

// Crear un nuevo grupo
export const createCatalogoGrupo = async (req, res) => {
  try {
    const { nombreGrupoCatalogo } = req.body;
    
    if (!nombreGrupoCatalogo) {
      return res.status(400).json({ message: 'El nombre del grupo es requerido' });
    }
    
    const newCatalogoGrupo = new CatalogoGrupo({ nombreGrupoCatalogo });
    await newCatalogoGrupo.save();
    
    res.status(201).json({ message: 'Grupo creado exitosamente', grupo: newCatalogoGrupo });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear grupo', error: error.message });
  }
};

// Actualizar un grupo existente
export const updateCatalogoGrupo = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombreGrupoCatalogo } = req.body;
    
    if (!nombreGrupoCatalogo) {
      return res.status(400).json({ message: 'El nombre del grupo es requerido' });
    }
    
    const updatedCatalogoGrupo = await CatalogoGrupo.findByIdAndUpdate(
      id,
      { nombreGrupoCatalogo },
      { new: true }
    );
    
    if (!updatedCatalogoGrupo) {
      return res.status(404).json({ message: 'Grupo no encontrado' });
    }
    
    res.status(200).json({ message: 'Grupo actualizado exitosamente', grupo: updatedCatalogoGrupo });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar grupo', error: error.message });
  }
};

// Eliminar un grupo
export const deleteCatalogoGrupo = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCatalogoGrupo = await CatalogoGrupo.findByIdAndDelete(id);
    
    if (!deletedCatalogoGrupo) {
      return res.status(404).json({ message: 'Grupo no encontrado' });
    }
    
    res.status(200).json({ message: 'Grupo eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar grupo', error: error.message });
  }
};