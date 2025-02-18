import express from "express";
import * as paroController from "../controllers/paroController.js";

const router = express.Router();

router.post("/", paroController.crearParo);
router.get("/", paroController.obtenerParos);
router.get("/:id", paroController.obtenerParoPorId);
router.put("/:id", paroController.actualizarParo);
router.delete("/:id", paroController.eliminarParo);

export default router;
