import express from "express";
import * as lineaController from "../controllers/lineaController.js";

const router = express.Router();

router.post("/", lineaController.crearLinea);
router.get("/", lineaController.obtenerLineas);
router.get("/:id", lineaController.obtenerLineaPorId);
router.put("/:id", lineaController.actualizarLinea);
router.delete("/:id", lineaController.eliminarLinea);

export default router;
