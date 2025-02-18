import express from "express";
import * as departamentoController from "../controllers/departamentoController.js";

const router = express.Router();

router.post("/", departamentoController.crearDepartamento);
router.get("/", departamentoController.obtenerDepartamentos);
router.get("/:id", departamentoController.obtenerDepartamentoPorId);
router.put("/:id", departamentoController.actualizarDepartamento);
router.delete("/:id", departamentoController.eliminarDepartamento);

export default router;
