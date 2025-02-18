import Rechazo from "../models/rechazoModel.js";

export const crearRechazo = async (req, res) => {
    try {
        const nuevoRechazo = await Rechazo.create(req.body);
        res.status(201).json(nuevoRechazo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const obtenerRechazos = async (req, res) => {
    try {
        const rechazos = await Rechazo.find().populate("produccion");
        res.json(rechazos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const obtenerRechazoPorId = async (req, res) => {
    try {
        const rechazo = await Rechazo.findById(req.params.id).populate("produccion");
        if (!rechazo) return res.status(404).json({ error: "Rechazo no encontrado" });
        res.json(rechazo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const actualizarRechazo = async (req, res) => {
    try {
        const rechazoActualizado = await Rechazo.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!rechazoActualizado) return res.status(404).json({ error: "Rechazo no encontrado" });
        res.json(rechazoActualizado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const eliminarRechazo = async (req, res) => {
    try {
        const rechazoEliminado = await Rechazo.findByIdAndDelete(req.params.id);
        if (!rechazoEliminado) return res.status(404).json({ error: "Rechazo no encontrado" });
        res.json({ mensaje: "Rechazo eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
