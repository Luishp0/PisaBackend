import express from "express";
import * as procesoController from "../controllers/procesoController.js";

const router = express.Router();

router.post("/", procesoController.crearProceso);
router.get("/", procesoController.obtenerProcesos);
router.get("/:id", procesoController.obtenerProcesoPorId);
router.put("/:id", procesoController.actualizarProceso);
router.delete("/:id", procesoController.eliminarProceso);

export default router;
