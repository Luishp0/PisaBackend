import Proceso from "../models/procesoModel.js";

export const crearProceso = async (req, res) => {
    try {
        const nuevoProceso = await Proceso.create(req.body);
        res.status(201).json(nuevoProceso);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const obtenerProcesos = async (req, res) => {
    try {
        const procesos = await Proceso.find().populate("produccion");
        res.json(procesos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const obtenerProcesoPorId = async (req, res) => {
    try {
        const proceso = await Proceso.findById(req.params.id).populate("produccion");
        if (!proceso) return res.status(404).json({ error: "Proceso no encontrado" });
        res.json(proceso);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const actualizarProceso = async (req, res) => {
    try {
        const procesoActualizado = await Proceso.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!procesoActualizado) return res.status(404).json({ error: "Proceso no encontrado" });
        res.json(procesoActualizado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const eliminarProceso = async (req, res) => {
    try {
        const procesoEliminado = await Proceso.findByIdAndDelete(req.params.id);
        if (!procesoEliminado) return res.status(404).json({ error: "Proceso no encontrado" });
        res.json({ mensaje: "Proceso eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
