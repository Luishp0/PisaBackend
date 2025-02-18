import express from "express";
import * as grupoController from "../controllers/grupoController.js";

const router = express.Router();

router.post("/", grupoController.crearGrupo);
router.get("/", grupoController.obtenerGrupos);
router.get("/:id", grupoController.obtenerGrupoPorId);
router.put("/:id", grupoController.actualizarGrupo);
router.delete("/:id", grupoController.eliminarGrupo);

export default router;
