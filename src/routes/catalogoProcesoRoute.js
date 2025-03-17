import express from 'express';
import {
  getAllCatalogoProcesos,
  getCatalogoProcesoById,
  createCatalogoProceso,
  updateCatalogoProceso,
  deleteCatalogoProceso
} from '../controllers/catalogoProcesoController.js';

const router = express.Router();

// Rutas para el catálogo de procesos
router.get('/', getAllCatalogoProcesos);
router.get('/:id', getCatalogoProcesoById);
router.post('/', createCatalogoProceso);
router.put('/:id', updateCatalogoProceso);
router.delete('/:id', deleteCatalogoProceso);

export default router;