import express from 'express';
import { 
    getCatalogosRechazo, 
    getCatalogoRechazoById, 
    createCatalogoRechazo, 
    updateCatalogoRechazo, 
    deleteCatalogoRechazo 
} from '../controllers/catalogoRechazoController.js';

const router = express.Router();

// Rutas para catálogo de rechazo
router.get('/', getCatalogosRechazo);
router.get('/:id', getCatalogoRechazoById);
router.post('/', createCatalogoRechazo);
router.put('/:id', updateCatalogoRechazo);
router.delete('/:id', deleteCatalogoRechazo);

export default router;