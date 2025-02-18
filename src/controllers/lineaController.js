import Linea from "../models/lineaModel.js";

export const crearLinea = async (req, res) => {
    try {
        const nuevaLinea = await Linea.create(req.body);
        res.status(201).json(nuevaLinea);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const obtenerLineas = async (req, res) => {
    try {
        const lineas = await Linea.find().populate("produccion");
        res.json(lineas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const obtenerLineaPorId = async (req, res) => {
    try {
        const linea = await Linea.findById(req.params.id).populate("produccion");
        if (!linea) return res.status(404).json({ error: "Línea no encontrada" });
        res.json(linea);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const actualizarLinea = async (req, res) => {
    try {
        const lineaActualizada = await Linea.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!lineaActualizada) return res.status(404).json({ error: "Línea no encontrada" });
        res.json(lineaActualizada);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const eliminarLinea = async (req, res) => {
    try {
        const lineaEliminada = await Linea.findByIdAndDelete(req.params.id);
        if (!lineaEliminada) return res.status(404).json({ error: "Línea no encontrada" });
        res.json({ mensaje: "Línea eliminada correctamente" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
