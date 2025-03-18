import express from 'express';
import { 
  getAllMateriales, 
  getMaterialById, 
  createMaterial, 
  updateMaterial, 
  deleteMaterial 
} from '../controllers/catalogoMaterialController.js';

const router = express.Router();

// Ruta para obtener todos los materiales
router.get('/', getAllMateriales);

// Ruta para obtener un material específico por ID
router.get('/:id', getMaterialById);

// Ruta para crear un nuevo material
router.post('/', createMaterial);

// Ruta para actualizar un material existente
router.put('/:id', updateMaterial);

// Ruta para eliminar un material
router.delete('/:id', deleteMaterial);

export default router;