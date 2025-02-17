import express from 'express';
import { loginUser, desbloquearUsuario } from '../controllers/authController.js';

const router = express.Router();

router.post('/login', loginUser);
router.post('/desbloquear', desbloquearUsuario);


export default router;
