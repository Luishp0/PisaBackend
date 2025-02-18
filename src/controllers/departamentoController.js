import Departamento from "../models/departamentoModel.js";

export const crearDepartamento = async (req, res) => {
    try {
        const nuevoDepartamento = await Departamento.create(req.body);
        res.status(201).json(nuevoDepartamento);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const obtenerDepartamentos = async (req, res) => {
    try {
        const departamentos = await Departamento.find().populate("produccion");
        res.json(departamentos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const obtenerDepartamentoPorId = async (req, res) => {
    try {
        const departamento = await Departamento.findById(req.params.id).populate("produccion");
        if (!departamento) return res.status(404).json({ error: "Departamento no encontrado" });
        res.json(departamento);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const actualizarDepartamento = async (req, res) => {
    try {
        const departamentoActualizado = await Departamento.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!departamentoActualizado) return res.status(404).json({ error: "Departamento no encontrado" });
        res.json(departamentoActualizado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const eliminarDepartamento = async (req, res) => {
    try {
        const departamentoEliminado = await Departamento.findByIdAndDelete(req.params.id);
        if (!departamentoEliminado) return res.status(404).json({ error: "Departamento no encontrado" });
        res.json({ mensaje: "Departamento eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
