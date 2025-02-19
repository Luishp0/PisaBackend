import express from 'express';
import { getAllRoles, getRoleByClase, 
    createRole,
    getRoleById,
    updateRole,
    deleteRole } from '../controllers/roleController.js';

const router = express.Router();

router.get('/', getAllRoles);

// Ruta para crear un nuevo role
router.post("/", createRole);

// Ruta para obtener un role por su ID
router.get("/:id", getRoleById);

// Ruta para actualizar un role por su ID
router.put("/:id", updateRole);

// Ruta para eliminar un role por su ID
router.delete("/:id", deleteRole);

export default router;
