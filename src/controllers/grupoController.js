import Grupo from "../models/grupoModel.js";

export const crearGrupo = async (req, res) => {
    try {
        const nuevoGrupo = await Grupo.create(req.body);
        res.status(201).json(nuevoGrupo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const obtenerGrupos = async (req, res) => {
    try {
        const grupos = await Grupo.find().populate("produccion");
        res.json(grupos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const obtenerGrupoPorId = async (req, res) => {
    try {
        const grupo = await Grupo.findById(req.params.id).populate("produccion");
        if (!grupo) return res.status(404).json({ error: "Grupo no encontrado" });
        res.json(grupo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const actualizarGrupo = async (req, res) => {
    try {
        const grupoActualizado = await Grupo.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!grupoActualizado) return res.status(404).json({ error: "Grupo no encontrado" });
        res.json(grupoActualizado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const eliminarGrupo = async (req, res) => {
    try {
        const grupoEliminado = await Grupo.findByIdAndDelete(req.params.id);
        if (!grupoEliminado) return res.status(404).json({ error: "Grupo no encontrado" });
        res.json({ mensaje: "Grupo eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
