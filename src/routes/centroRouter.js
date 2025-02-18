import express from 'express';
import { crearCentro, obtenerCentros, obtenerCentroPorId, actualizarCentro, eliminarCentro } from '../controllers/centroController.js';

const router = express.Router();

// Rutas para los centros
router.post('/centro', crearCentro);
router.get('/centro', obtenerCentros);
router.get('/centro/:id', obtenerCentroPorId);
router.put('/centro/:id', actualizarCentro);
router.delete('/centro/:id', eliminarCentro);

export default router;