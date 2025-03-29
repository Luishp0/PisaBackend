import express from "express";
import * as paroController from "../controllers/paroController.js";

const router = express.Router();



// Rutas básicas CRUD
router.post("/", paroController.crearParo);
router.get("/", paroController.obtenerParos);
router.get("/:id", paroController.obtenerParoPorId);
router.put("/:id", paroController.actualizarParo);
router.delete("/:id", paroController.eliminarParo);

// Ruta especial para obtener paros por producción
router.get("/produccion/:produccionId", paroController.obtenerParosPorProduccion);

export default router;