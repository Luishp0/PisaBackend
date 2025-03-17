import CatalogoDepartamento from '../models/catalogoDepartamentoModel.js';

// Obtener todos los departamentos del catálogo
export const getAllCatalogoDepartamentos = async (req, res) => {
  try {
    const catalogoDepartamentos = await CatalogoDepartamento.find();
    res.status(200).json(catalogoDepartamentos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener catálogo de departamentos', error: error.message });
  }
};

// Obtener un departamento específico por ID
export const getCatalogoDepartamentoById = async (req, res) => {
  try {
    const { id } = req.params;
    const catalogoDepartamento = await CatalogoDepartamento.findById(id);
    
    if (!catalogoDepartamento) {
      return res.status(404).json({ message: 'Departamento no encontrado' });
    }
    
    res.status(200).json(catalogoDepartamento);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el departamento', error: error.message });
  }
};

// Crear un nuevo departamento
export const createCatalogoDepartamento = async (req, res) => {
  try {
    const { nombreDepartementoCatalogo } = req.body;
    
    if (!nombreDepartementoCatalogo) {
      return res.status(400).json({ message: 'El nombre del departamento es requerido' });
    }
    
    const newCatalogoDepartamento = new CatalogoDepartamento({ nombreDepartementoCatalogo });
    await newCatalogoDepartamento.save();
    
    res.status(201).json({ message: 'Departamento creado exitosamente', departamento: newCatalogoDepartamento });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear departamento', error: error.message });
  }
};

// Actualizar un departamento existente
export const updateCatalogoDepartamento = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombreDepartementoCatalogo } = req.body;
    
    if (!nombreDepartementoCatalogo) {
      return res.status(400).json({ message: 'El nombre del departamento es requerido' });
    }
    
    const updatedCatalogoDepartamento = await CatalogoDepartamento.findByIdAndUpdate(
      id,
      { nombreDepartementoCatalogo },
      { new: true }
    );
    
    if (!updatedCatalogoDepartamento) {
      return res.status(404).json({ message: 'Departamento no encontrado' });
    }
    
    res.status(200).json({ message: 'Departamento actualizado exitosamente', departamento: updatedCatalogoDepartamento });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar departamento', error: error.message });
  }
};

// Eliminar un departamento
export const deleteCatalogoDepartamento = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCatalogoDepartamento = await CatalogoDepartamento.findByIdAndDelete(id);
    
    if (!deletedCatalogoDepartamento) {
      return res.status(404).json({ message: 'Departamento no encontrado' });
    }
    
    res.status(200).json({ message: 'Departamento eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar departamento', error: error.message });
  }
};