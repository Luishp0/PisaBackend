import express from 'express';
import {  getUserByName, getUserStatus,  createUser, getUsers, getUserById, updateUser, deleteUser} from '../controllers/userController.js';

const router = express.Router();


router.get('/buscar/:nombre', getUserByName); // Buscar usuarios por nombre
router.get('/estado/:id', getUserStatus); // Obtener estado del usuario
router.post("/", createUser); // Crear usuario
router.get("/", getUsers); // Obtener todos los usuarios
router.get("/:id", getUserById); // Obtener usuario por ID
router.put("/:id", updateUser); // Actualizar usuario
router.delete("/:id", deleteUser); // Eliminar usuario

export default router;
