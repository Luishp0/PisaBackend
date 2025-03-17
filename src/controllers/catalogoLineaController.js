import CatalogoLinea from '../models/catalogoLineaModel.js';

// Obtener todas las líneas del catálogo
export const getAllCatalogoLineas = async (req, res) => {
  try {
    const catalogoLineas = await CatalogoLinea.find();
    res.status(200).json(catalogoLineas);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener catálogo de líneas', error: error.message });
  }
};

// Obtener una línea específica por ID
export const getCatalogoLineaById = async (req, res) => {
  try {
    const { id } = req.params;
    const catalogoLinea = await CatalogoLinea.findById(id);
    
    if (!catalogoLinea) {
      return res.status(404).json({ message: 'Línea no encontrada' });
    }
    
    res.status(200).json(catalogoLinea);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la línea', error: error.message });
  }
};

// Crear una nueva línea
export const createCatalogoLinea = async (req, res) => {
  try {
    const { nombreLineaCatalogo } = req.body;
    
    if (!nombreLineaCatalogo) {
      return res.status(400).json({ message: 'El nombre de la línea es requerido' });
    }
    
    const newCatalogoLinea = new CatalogoLinea({ nombreLineaCatalogo });
    await newCatalogoLinea.save();
    
    res.status(201).json({ message: 'Línea creada exitosamente', linea: newCatalogoLinea });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear línea', error: error.message });
  }
};

// Actualizar una línea existente
export const updateCatalogoLinea = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombreLineaCatalogo } = req.body;
    
    if (!nombreLineaCatalogo) {
      return res.status(400).json({ message: 'El nombre de la línea es requerido' });
    }
    
    const updatedCatalogoLinea = await CatalogoLinea.findByIdAndUpdate(
      id,
      { nombreLineaCatalogo },
      { new: true }
    );
    
    if (!updatedCatalogoLinea) {
      return res.status(404).json({ message: 'Línea no encontrada' });
    }
    
    res.status(200).json({ message: 'Línea actualizada exitosamente', linea: updatedCatalogoLinea });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar línea', error: error.message });
  }
};

// Eliminar una línea
export const deleteCatalogoLinea = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCatalogoLinea = await CatalogoLinea.findByIdAndDelete(id);
    
    if (!deletedCatalogoLinea) {
      return res.status(404).json({ message: 'Línea no encontrada' });
    }
    
    res.status(200).json({ message: 'Línea eliminada exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar línea', error: error.message });
  }
};