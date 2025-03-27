import CatalogoRechazo from '../models/catalogoRechazoModel.js';

// Obtener todos los catálogos de rechazo
export const getCatalogosRechazo = async (req, res) => {
    try {
        const catalogosRechazo = await CatalogoRechazo.find();
        res.status(200).json(catalogosRechazo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener un catálogo de rechazo por ID
export const getCatalogoRechazoById = async (req, res) => {
    try {
        const catalogoRechazo = await CatalogoRechazo.findById(req.params.id);
        
        if (!catalogoRechazo) {
            return res.status(404).json({ message: 'Catálogo de rechazo no encontrado' });
        }
        
        res.status(200).json(catalogoRechazo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear un nuevo catálogo de rechazo
export const createCatalogoRechazo = async (req, res) => {
    const { nombreRechazoCatalogo } = req.body;
    
    try {
        // Verificar si ya existe un catálogo con el mismo nombre
        const existingCatalogo = await CatalogoRechazo.findOne({ nombreRechazoCatalogo });
        
        if (existingCatalogo) {
            return res.status(400).json({ message: 'Ya existe un catálogo de rechazo con ese nombre' });
        }
        
        const nuevoCatalogoRechazo = new CatalogoRechazo({
            nombreRechazoCatalogo
        });
        
        const catalogoGuardado = await nuevoCatalogoRechazo.save();
        res.status(201).json(catalogoGuardado);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar un catálogo de rechazo
export const updateCatalogoRechazo = async (req, res) => {
    const { nombreRechazoCatalogo } = req.body;
    
    try {
        // Verificar si ya existe otro catálogo con el mismo nombre
        const existingCatalogo = await CatalogoRechazo.findOne({ 
            nombreRechazoCatalogo, 
            _id: { $ne: req.params.id } 
        });
        
        if (existingCatalogo) {
            return res.status(400).json({ message: 'Ya existe otro catálogo de rechazo con ese nombre' });
        }
        
        const catalogoActualizado = await CatalogoRechazo.findByIdAndUpdate(
            req.params.id,
            { nombreRechazoCatalogo },
            { new: true }
        );
        
        if (!catalogoActualizado) {
            return res.status(404).json({ message: 'Catálogo de rechazo no encontrado' });
        }
        
        res.status(200).json(catalogoActualizado);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar un catálogo de rechazo
export const deleteCatalogoRechazo = async (req, res) => {
    try {
        const catalogoEliminado = await CatalogoRechazo.findByIdAndDelete(req.params.id);
        
        if (!catalogoEliminado) {
            return res.status(404).json({ message: 'Catálogo de rechazo no encontrado' });
        }
        
        res.status(200).json({ message: 'Catálogo de rechazo eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};