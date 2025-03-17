import CatalogoTurno from '../models/catalogoTurnoModel.js';

// Obtener todos los turnos del catálogo
export const getAllCatalogoTurnos = async (req, res) => {
  try {
    const catalogoTurnos = await CatalogoTurno.find();
    res.status(200).json(catalogoTurnos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener catálogo de turnos', error: error.message });
  }
};

// Obtener un turno específico por ID
export const getCatalogoTurnoById = async (req, res) => {
  try {
    const { id } = req.params;
    const catalogoTurno = await CatalogoTurno.findById(id);
    
    if (!catalogoTurno) {
      return res.status(404).json({ message: 'Turno no encontrado' });
    }
    
    res.status(200).json(catalogoTurno);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el turno', error: error.message });
  }
};

// Crear un nuevo turno
export const createCatalogoTurno = async (req, res) => {
  try {
    const { nombreTurnoCatalogo } = req.body;
    
    if (!nombreTurnoCatalogo) {
      return res.status(400).json({ message: 'El nombre del turno es requerido' });
    }
    
    const newCatalogoTurno = new CatalogoTurno({ nombreTurnoCatalogo });
    await newCatalogoTurno.save();
    
    res.status(201).json({ message: 'Turno creado exitosamente', turno: newCatalogoTurno });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear turno', error: error.message });
  }
};

// Actualizar un turno existente
export const updateCatalogoTurno = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombreTurnoCatalogo } = req.body;
    
    if (!nombreTurnoCatalogo) {
      return res.status(400).json({ message: 'El nombre del turno es requerido' });
    }
    
    const updatedCatalogoTurno = await CatalogoTurno.findByIdAndUpdate(
      id,
      { nombreTurnoCatalogo },
      { new: true }
    );
    
    if (!updatedCatalogoTurno) {
      return res.status(404).json({ message: 'Turno no encontrado' });
    }
    
    res.status(200).json({ message: 'Turno actualizado exitosamente', turno: updatedCatalogoTurno });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar turno', error: error.message });
  }
};

// Eliminar un turno
export const deleteCatalogoTurno = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCatalogoTurno = await CatalogoTurno.findByIdAndDelete(id);
    
    if (!deletedCatalogoTurno) {
      return res.status(404).json({ message: 'Turno no encontrado' });
    }
    
    res.status(200).json({ message: 'Turno eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar turno', error: error.message });
  }
};