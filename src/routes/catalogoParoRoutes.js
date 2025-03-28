import express from 'express';
import {
  getCatalogosParos,
  getCatalogosPorNivel,
  getCatalogoParo,
  createCatalogoParo,
  updateCatalogoParo,
  deleteCatalogoParo,
  initializeNivel1Categorias
} from '../controllers/catalogoParoController.js';

const router = express.Router();

// Rutas para el catálogo de paros
router.get('/', getCatalogosParos);
router.get('/nivel/:nivel', getCatalogosPorNivel);
router.get('/inicializar-nivel1', initializeNivel1Categorias);
router.get('/:id', getCatalogoParo);
router.post('/', createCatalogoParo);
router.put('/:id', updateCatalogoParo);
router.delete('/:id', deleteCatalogoParo);

export default router;