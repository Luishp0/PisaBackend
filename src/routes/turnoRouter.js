import express from "express";
import * as turnoController from "../controllers/turnoController.js";

const router = express.Router();

router.post("/", turnoController.crearTurno);
router.get("/", turnoController.obtenerTurnos);
router.get("/:id", turnoController.obtenerTurnoPorId);
router.put("/:id", turnoController.actualizarTurno);
router.delete("/:id", turnoController.eliminarTurno);

export default router;
