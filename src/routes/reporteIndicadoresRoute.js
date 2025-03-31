// routes/reporteIndicadoresRoute.js
import express from 'express';
import { getReporteIndicadores,filtrarProduccion } from '../controllers/reporteIndicadorController.js';

const router = express.Router();

/**
 * @route   GET /api/reporteIndicadores
 * @desc    Obtener reporte de indicadores con filtros aplicados
 * @access  Privado
 */

// Ruta GET para consultar reportes con query params
router.get('/', getReporteIndicadores);

// Ruta POST para filtrar con body (útil para Postman)
router.post('/filtrar', filtrarProduccion);

/**
 * @route   GET /api/reporteIndicadores/resumen
 * @desc    Obtener resumen de indicadores (totales y promedios)
 * @access  Privado
 */


// Puedes agregar más rutas relacionadas con reportes e indicadores aquí

export default router;