import express from 'express';
import {
  getAllCatalogoGrupos,
  getCatalogoGrupoById,
  createCatalogoGrupo,
  updateCatalogoGrupo,
  deleteCatalogoGrupo
} from '../controllers/catalogoGrupoController.js';

const router = express.Router();

// Rutas para el catálogo de grupos
router.get('/', getAllCatalogoGrupos);
router.get('/:id', getCatalogoGrupoById);
router.post('/', createCatalogoGrupo);
router.put('/:id', updateCatalogoGrupo);
router.delete('/:id', deleteCatalogoGrupo);

export default router;