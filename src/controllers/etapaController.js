import Etapa from "../models/etapaModel.js";

export const crearEtapa = async (req, res) => {
    try {
        const nuevaEtapa = await Etapa.create(req.body);
        res.status(201).json(nuevaEtapa);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const obtenerEtapas = async (req, res) => {
    try {
        const etapas = await Etapa.find().populate("produccion");
        res.json(etapas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const obtenerEtapaPorId = async (req, res) => {
    try {
        const etapa = await Etapa.findById(req.params.id).populate("produccion");
        if (!etapa) return res.status(404).json({ error: "Etapa no encontrada" });
        res.json(etapa);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const actualizarEtapa = async (req, res) => {
    try {
        const etapaActualizada = await Etapa.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!etapaActualizada) return res.status(404).json({ error: "Etapa no encontrada" });
        res.json(etapaActualizada);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const eliminarEtapa = async (req, res) => {
    try {
        const etapaEliminada = await Etapa.findByIdAndDelete(req.params.id);
        if (!etapaEliminada) return res.status(404).json({ error: "Etapa no encontrada" });
        res.json({ mensaje: "Etapa eliminada correctamente" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
