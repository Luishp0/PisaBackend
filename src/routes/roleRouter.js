import express from 'express';
import { getAllRoles, getRoleByClase } from '../controllers/roleController.js';

const router = express.Router();

router.get('/', getAllRoles);
router.get('/:clase', getRoleByClase);


export default router;
