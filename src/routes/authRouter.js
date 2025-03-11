import express from 'express';
import { loginUser, desbloquearUsuario, getLastLogin, bloquearUsuario, desbloquearUsuarioPorNombre, resetIntentosFallidos } from '../controllers/authController.js';

const router = express.Router();

router.post('/login', loginUser);
router.post('/bloquear', bloquearUsuario); // Nueva ruta para bloquear por nombre
router.post('/desbloquear', desbloquearUsuario);
router.post('/desbloquear-por-nombre', desbloquearUsuarioPorNombre); // Nueva ruta
router.get('/last-login/:userId', getLastLogin);
router.post('/reset-intentos', resetIntentosFallidos); // Útil para pruebas


export default router;
