import CatalogoCentroModel from '../models/catalogoCentroModel.js';

// Obtener todos los centros del catálogo
export const getAllCatalogoCentros = async (req, res) => {
  try {
    const catalogoCentros = await CatalogoCentroModel.find();
    res.status(200).json(catalogoCentros);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener catálogo de centros', error: error.message });
  }
};

// Obtener un centro específico por ID
export const getCatalogoCentroById = async (req, res) => {
  try {
    const { id } = req.params;
    const catalogoCentro = await CatalogoCentroModel.findById(id);
    
    if (!catalogoCentro) {
      return res.status(404).json({ message: 'Centro no encontrado' });
    }
    
    res.status(200).json(catalogoCentro);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el centro', error: error.message });
  }
};

// Crear un nuevo centro
export const createCatalogoCentro = async (req, res) => {
  try {
    const { nombreCentroCatalogo } = req.body;
    
    if (!nombreCentroCatalogo) {
      return res.status(400).json({ message: 'El nombre del centro es requerido' });
    }
    
    const newCatalogoCentro = new CatalogoCentroModel({ nombreCentroCatalogo });
    await newCatalogoCentro.save();
    
    res.status(201).json({ message: 'Centro creado exitosamente', centro: newCatalogoCentro });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear centro', error: error.message });
  }
};

// Actualizar un centro existente
export const updateCatalogoCentro = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombreCentroCatalogo } = req.body;
    
    if (!nombreCentroCatalogo) {
      return res.status(400).json({ message: 'El nombre del centro es requerido' });
    }
    
    const updatedCatalogoCentro = await CatalogoCentroModel.findByIdAndUpdate(
      id,
      { nombreCentroCatalogo },
      { new: true }
    );
    
    if (!updatedCatalogoCentro) {
      return res.status(404).json({ message: 'Centro no encontrado' });
    }
    
    res.status(200).json({ message: 'Centro actualizado exitosamente', centro: updatedCatalogoCentro });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar centro', error: error.message });
  }
};

// Eliminar un centro
export const deleteCatalogoCentro = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCatalogoCentro = await CatalogoCentroModel.findByIdAndDelete(id);
    
    if (!deletedCatalogoCentro) {
      return res.status(404).json({ message: 'Centro no encontrado' });
    }
    
    res.status(200).json({ message: 'Centro eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar centro', error: error.message });
  }
};