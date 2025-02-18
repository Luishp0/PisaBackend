import Material from "../models/materialModel.js";

export const crearMaterial = async (req, res) => {
    try {
        const nuevoMaterial = await Material.create(req.body);
        res.status(201).json(nuevoMaterial);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const obtenerMateriales = async (req, res) => {
    try {
        const materiales = await Material.find().populate("produccion");
        res.json(materiales);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const obtenerMaterialPorId = async (req, res) => {
    try {
        const material = await Material.findById(req.params.id).populate("produccion");
        if (!material) return res.status(404).json({ error: "Material no encontrado" });
        res.json(material);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const actualizarMaterial = async (req, res) => {
    try {
        const materialActualizado = await Material.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!materialActualizado) return res.status(404).json({ error: "Material no encontrado" });
        res.json(materialActualizado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const eliminarMaterial = async (req, res) => {
    try {
        const materialEliminado = await Material.findByIdAndDelete(req.params.id);
        if (!materialEliminado) return res.status(404).json({ error: "Material no encontrado" });
        res.json({ mensaje: "Material eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
