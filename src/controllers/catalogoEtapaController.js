import CatalogoEtapa from '../models/catalogoEtapaModel.js';

// Obtener todas las etapas del catálogo
export const getAllCatalogoEtapas = async (req, res) => {
  try {
    const catalogoEtapas = await CatalogoEtapa.find();
    res.status(200).json(catalogoEtapas);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener catálogo de etapas', error: error.message });
  }
};

// Obtener una etapa específica por ID
export const getCatalogoEtapaById = async (req, res) => {
  try {
    const { id } = req.params;
    const catalogoEtapa = await CatalogoEtapa.findById(id);
    
    if (!catalogoEtapa) {
      return res.status(404).json({ message: 'Etapa no encontrada' });
    }
    
    res.status(200).json(catalogoEtapa);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la etapa', error: error.message });
  }
};

// Crear una nueva etapa
export const createCatalogoEtapa = async (req, res) => {
  try {
    const { nombreEtapaCatalogo } = req.body;
    
    if (!nombreEtapaCatalogo) {
      return res.status(400).json({ message: 'El nombre de la etapa es requerido' });
    }
    
    const newCatalogoEtapa = new CatalogoEtapa({ nombreEtapaCatalogo });
    await newCatalogoEtapa.save();
    
    res.status(201).json({ message: 'Etapa creada exitosamente', etapa: newCatalogoEtapa });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear etapa', error: error.message });
  }
};

// Actualizar una etapa existente
export const updateCatalogoEtapa = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombreEtapaCatalogo } = req.body;
    
    if (!nombreEtapaCatalogo) {
      return res.status(400).json({ message: 'El nombre de la etapa es requerido' });
    }
    
    const updatedCatalogoEtapa = await CatalogoEtapa.findByIdAndUpdate(
      id,
      { nombreEtapaCatalogo },
      { new: true }
    );
    
    if (!updatedCatalogoEtapa) {
      return res.status(404).json({ message: 'Etapa no encontrada' });
    }
    
    res.status(200).json({ message: 'Etapa actualizada exitosamente', etapa: updatedCatalogoEtapa });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar etapa', error: error.message });
  }
};

// Eliminar una etapa
export const deleteCatalogoEtapa = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCatalogoEtapa = await CatalogoEtapa.findByIdAndDelete(id);
    
    if (!deletedCatalogoEtapa) {
      return res.status(404).json({ message: 'Etapa no encontrada' });
    }
    
    res.status(200).json({ message: 'Etapa eliminada exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar etapa', error: error.message });
  }
};