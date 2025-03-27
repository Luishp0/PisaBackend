import express from 'express';
import { crearProduccion, obtenerProducciones, obtenerProduccionPorId, actualizarProduccion, eliminarProduccion } from '../controllers/produccionController.js';

const router = express.Router();

// Rutas para la producción
router.post('/', crearProduccion);
router.get('/', obtenerProducciones);
router.get('/:id', obtenerProduccionPorId);
router.put('/:id', actualizarProduccion);
router.delete('/:id', eliminarProduccion);

export default router;