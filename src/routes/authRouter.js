import express from 'express';
import { loginUser, desbloquearUsuario, getLastLogin } from '../controllers/authController.js';

const router = express.Router();

router.get('/last-login/:userId', getLastLogin); // 🔹 Obtener la última fecha de inicio
router.post('/login', loginUser);
router.post('/desbloquear', desbloquearUsuario);



export default router;
