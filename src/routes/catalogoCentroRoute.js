import express from 'express';
import {
  getAllCatalogoCentros,
  getCatalogoCentroById,
  createCatalogoCentro,
  updateCatalogoCentro,
  deleteCatalogoCentro
} from '../controllers/catalogoCentroController.js';

const router = express.Router();

// Rutas para el catálogo de centros
router.get('/', getAllCatalogoCentros);
router.get('/:id', getCatalogoCentroById);
router.post('/', createCatalogoCentro);
router.put('/:id', updateCatalogoCentro);
router.delete('/:id', deleteCatalogoCentro);

export default router;