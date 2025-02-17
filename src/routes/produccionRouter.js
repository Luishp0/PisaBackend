import express from 'express';
import { crearProduccion, obtenerProducciones, obtenerProduccionPorId, actualizarProduccion, eliminarProduccion } from '../controllers/produccionController.js';

const router = express.Router();

// Rutas para la producción
router.post('/produccion', crearProduccion);
router.get('/produccion', obtenerProducciones);
router.get('/produccion/:id', obtenerProduccionPorId);
router.put('/produccion/:id', actualizarProduccion);
router.delete('/produccion/:id', eliminarProduccion);

export default router;