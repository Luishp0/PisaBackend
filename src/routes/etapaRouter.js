import express from "express";
import * as etapaController from "../controllers/etapaController.js";

const router = express.Router();

router.post("/", etapaController.crearEtapa);
router.get("/", etapaController.obtenerEtapas);
router.get("/:id", etapaController.obtenerEtapaPorId);
router.put("/:id", etapaController.actualizarEtapa);
router.delete("/:id", etapaController.eliminarEtapa);

export default router;
