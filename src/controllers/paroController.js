import Paro from "../models/paroModel.js";

export const crearParo = async (req, res) => {
    try {
        const nuevoParo = await Paro.create(req.body);
        res.status(201).json(nuevoParo);
    } catch (error) {
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
        const paroActualizado = await Paro.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!paroActualizado) return res.status(404).json({ error: "Paro no encontrado" });
        res.json(paroActualizado);
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
