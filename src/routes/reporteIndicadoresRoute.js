// routes/reporteIndicadoresRoute.js
import express from 'express';
import { getReporteIndicadores } from '../controllers/reporteIndicadorController.js';

const router = express.Router();

/**
 * @route   GET /api/reporteIndicadores
 * @desc    Obtener reporte de indicadores con filtros aplicados
 * @access  Privado
 */
router.get('/', getReporteIndicadores);

/**
 * @route   GET /api/reporteIndicadores/resumen
 * @desc    Obtener resumen de indicadores (totales y promedios)
 * @access  Privado
 */


// Puedes agregar más rutas relacionadas con reportes e indicadores aquí

export default router;