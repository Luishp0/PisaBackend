import Paro from "../models/paroModel.js";

export const crearParo = async (req, res) => {
    try {
        // Validación básica de campos requeridos
        const { produccion, numeroNivel, descripcion, duracion } = req.body;
        
        if (!produccion) {
            return res.status(400).json({ error: "El ID de producción es requerido" });
        }
        
        if (!numeroNivel || !descripcion) {
            return res.status(400).json({ error: "El nivel y la descripción son requeridos" });
        }
        
        if (!duracion || duracion <= 0) {
            return res.status(400).json({ error: "La duración debe ser mayor a 0 minutos" });
        }
        
        const nuevoParo = await Paro.create(req.body);
        res.status(201).json({
            message: "Paro registrado correctamente",
            paro: nuevoParo
        });
    } catch (error) {
        console.error("Error al crear paro:", error);
        res.status(500).json({ error: error.message });
    }
};

export const obtenerParos = async (req, res) => {
    try {
        const paros = await Paro.find().populate("produccion");
        res.json(paros);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const obtenerParosPorProduccion = async (req, res) => {
    try {
        const { produccionId } = req.params;
        
        const paros = await Paro.find({ produccion: produccionId })
            .sort({ fechaCreacion: -1 });
        
        res.json(paros);
    } catch (error) {
        console.error("Error al obtener paros por producción:", error);
        res.status(500).json({ error: error.message });
    }
};

export const obtenerParoPorId = async (req, res) => {
    try {
        const paro = await Paro.findById(req.params.id).populate("produccion");
        if (!paro) return res.status(404).json({ error: "Paro no encontrado" });
        res.json(paro);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const actualizarParo = async (req, res) => {
    try {
        // Validación básica para campos requeridos en la actualización
        const { numeroNivel, descripcion, duracion } = req.body;
        
        if (!numeroNivel || !descripcion) {
            return res.status(400).json({ error: "El nivel y la descripción son requeridos" });
        }
        
        if (duracion !== undefined && duracion <= 0) {
            return res.status(400).json({ error: "La duración debe ser mayor a 0 minutos" });
        }
        
        const paroActualizado = await Paro.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!paroActualizado) return res.status(404).json({ error: "Paro no encontrado" });
        res.json({
            message: "Paro actualizado correctamente",
            paro: paroActualizado
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const eliminarParo = async (req, res) => {
    try {
        const paroEliminado = await Paro.findByIdAndDelete(req.params.id);
        if (!paroEliminado) return res.status(404).json({ error: "Paro no encontrado" });
        res.json({ mensaje: "Paro eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};