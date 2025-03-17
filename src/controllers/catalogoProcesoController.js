import CatalogoProceso from '../models/catalogoProcesoModel.js';

// Obtener todos los procesos del catálogo
export const getAllCatalogoProcesos = async (req, res) => {
  try {
    const catalogoProcesos = await CatalogoProceso.find();
    res.status(200).json(catalogoProcesos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener catálogo de procesos', error: error.message });
  }
};

// Obtener un proceso específico por ID
export const getCatalogoProcesoById = async (req, res) => {
  try {
    const { id } = req.params;
    const catalogoProceso = await CatalogoProceso.findById(id);
    
    if (!catalogoProceso) {
      return res.status(404).json({ message: 'Proceso no encontrado' });
    }
    
    res.status(200).json(catalogoProceso);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el proceso', error: error.message });
  }
};

// Crear un nuevo proceso
export const createCatalogoProceso = async (req, res) => {
  try {
    const { nombreProcesoCatalogo } = req.body;
    
    if (!nombreProcesoCatalogo) {
      return res.status(400).json({ message: 'El nombre del proceso es requerido' });
    }
    
    const newCatalogoProceso = new CatalogoProceso({ nombreProcesoCatalogo });
    await newCatalogoProceso.save();
    
    res.status(201).json({ message: 'Proceso creado exitosamente', proceso: newCatalogoProceso });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear proceso', error: error.message });
  }
};

// Actualizar un proceso existente
export const updateCatalogoProceso = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombreProcesoCatalogo } = req.body;
    
    if (!nombreProcesoCatalogo) {
      return res.status(400).json({ message: 'El nombre del proceso es requerido' });
    }
    
    const updatedCatalogoProceso = await CatalogoProceso.findByIdAndUpdate(
      id,
      { nombreProcesoCatalogo },
      { new: true }
    );
    
    if (!updatedCatalogoProceso) {
      return res.status(404).json({ message: 'Proceso no encontrado' });
    }
    
    res.status(200).json({ message: 'Proceso actualizado exitosamente', proceso: updatedCatalogoProceso });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar proceso', error: error.message });
  }
};

// Eliminar un proceso
export const deleteCatalogoProceso = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCatalogoProceso = await CatalogoProceso.findByIdAndDelete(id);
    
    if (!deletedCatalogoProceso) {
      return res.status(404).json({ message: 'Proceso no encontrado' });
    }
    
    res.status(200).json({ message: 'Proceso eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar proceso', error: error.message });
  }
};