import express from 'express';
import {
  getAllCatalogoTurnos,
  getCatalogoTurnoById,
  createCatalogoTurno,
  updateCatalogoTurno,
  deleteCatalogoTurno
} from '../controllers/catalogoTurnoController.js';

const router = express.Router();

// Rutas para el catálogo de turnos
router.get('/', getAllCatalogoTurnos);
router.get('/:id', getCatalogoTurnoById);
router.post('/', createCatalogoTurno);
router.put('/:id', updateCatalogoTurno);
router.delete('/:id', deleteCatalogoTurno);

export default router;