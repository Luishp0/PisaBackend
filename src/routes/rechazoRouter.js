import express from "express";
import * as rechazoController from "../controllers/rechazoController.js";

const router = express.Router();

router.post("/", rechazoController.crearRechazo);
router.get("/", rechazoController.obtenerRechazos);
router.get("/:id", rechazoController.obtenerRechazoPorId);
router.put("/:id", rechazoController.actualizarRechazo);
router.delete("/:id", rechazoController.eliminarRechazo);

export default router;
