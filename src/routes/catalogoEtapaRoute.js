import express from 'express';
import {
  getAllCatalogoEtapas,
  getCatalogoEtapaById,
  createCatalogoEtapa,
  updateCatalogoEtapa,
  deleteCatalogoEtapa
} from '../controllers/catalogoEtapaController.js';

const router = express.Router();

// Rutas para el catálogo de etapas
router.get('/', getAllCatalogoEtapas);
router.get('/:id', getCatalogoEtapaById);
router.post('/', createCatalogoEtapa);
router.put('/:id', updateCatalogoEtapa);
router.delete('/:id', deleteCatalogoEtapa);

export default router;