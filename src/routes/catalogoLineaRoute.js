import express from 'express';
import {
  getAllCatalogoLineas,
  getCatalogoLineaById,
  createCatalogoLinea,
  updateCatalogoLinea,
  deleteCatalogoLinea
} from '../controllers/catalogoLineaController.js';

const router = express.Router();

// Rutas para el catálogo de líneas
router.get('/', getAllCatalogoLineas);
router.get('/:id', getCatalogoLineaById);
router.post('/', createCatalogoLinea);
router.put('/:id', updateCatalogoLinea);
router.delete('/:id', deleteCatalogoLinea);

export default router;