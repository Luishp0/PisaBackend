import express from "express";
import * as materialController from "../controllers/materialController.js";

const router = express.Router();

router.post("/", materialController.crearMaterial);
router.get("/", materialController.obtenerMateriales);
router.get("/:id", materialController.obtenerMaterialPorId);
router.put("/:id", materialController.actualizarMaterial);
router.delete("/:id", materialController.eliminarMaterial);

export default router;
