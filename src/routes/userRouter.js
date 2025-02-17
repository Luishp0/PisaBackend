import express from 'express';
import { getAllUsers, getUserByName, getUserStatus, registerUser} from '../controllers/userController.js';

const router = express.Router();

router.get('/', getAllUsers); // Obtener todos los usuarios
router.get('/buscar/:nombre', getUserByName); // Buscar usuarios por nombre
router.get('/estado/:id', getUserStatus); // Obtener estado del usuario
router.post('/registrar', registerUser);

export default router;
