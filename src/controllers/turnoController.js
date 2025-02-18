import Turno from "../models/turnoModel.js";

export const crearTurno = async (req, res) => {
    try {
        const nuevoTurno = await Turno.create(req.body);
        res.status(201).json(nuevoTurno);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const obtenerTurnos = async (req, res) => {
    try {
        const turnos = await Turno.find().populate("produccion");
        res.json(turnos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const obtenerTurnoPorId = async (req, res) => {
    try {
        const turno = await Turno.findById(req.params.id).populate("produccion");
        if (!turno) return res.status(404).json({ error: "Turno no encontrado" });
        res.json(turno);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const actualizarTurno = async (req, res) => {
    try {
        const turnoActualizado = await Turno.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!turnoActualizado) return res.status(404).json({ error: "Turno no encontrado" });
        res.json(turnoActualizado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const eliminarTurno = async (req, res) => {
    try {
        const turnoEliminado = await Turno.findByIdAndDelete(req.params.id);
        if (!turnoEliminado) return res.status(404).json({ error: "Turno no encontrado" });
        res.json({ mensaje: "Turno eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
