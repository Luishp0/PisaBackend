import express from 'express';
import {
  getAllCatalogoDepartamentos,
  getCatalogoDepartamentoById,
  createCatalogoDepartamento,
  updateCatalogoDepartamento,
  deleteCatalogoDepartamento
} from '../controllers/catalogoDepartamentoController.js';

const router = express.Router();

// Rutas para el catálogo de departamentos
router.get('/', getAllCatalogoDepartamentos);
router.get('/:id', getCatalogoDepartamentoById);
router.post('/', createCatalogoDepartamento);
router.put('/:id', updateCatalogoDepartamento);
router.delete('/:id', deleteCatalogoDepartamento);

export default router;