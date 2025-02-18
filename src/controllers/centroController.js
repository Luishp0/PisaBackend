import Centro from '../models/Centro.js';

// Crear un nuevo centro
export const crearCentro = async (req, res) => {
    try {
        const { produccion, nombreCentro } = req.body;

        const nuevoCentro = new Centro({
            produccion,
            nombreCentro
        });

        await nuevoCentro.save();

        res.status(201).json({ mensaje: 'Centro creado exitosamente', centro: nuevoCentro });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear el centro', error: error.message });
    }
};

// Obtener todos los centros
export const obtenerCentros = async (req, res) => {
    try {
        const centros = await Centro.find().populate('produccion');
        res.status(200).json(centros);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener los centros', error: error.message });
    }
};

// Obtener un centro por ID
export const obtenerCentroPorId = async (req, res) => {
    try {
        const centro = await Centro.findById(req.params.id).populate('produccion');
        if (!centro) {
            return res.status(404).json({ mensaje: 'Centro no encontrado' });
        }
        res.status(200).json(centro);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener el centro', error: error.message });
    }
};

// Actualizar un centro
export const actualizarCentro = async (req, res) => {
    try {
        const { nombreCentro } = req.body;

        const centroActualizado = await Centro.findByIdAndUpdate(
            req.params.id,
            { nombreCentro },
            { new: true }
        );

        if (!centroActualizado) {
            return res.status(404).json({ mensaje: 'Centro no encontrado' });
        }

        res.status(200).json({ mensaje: 'Centro actualizado exitosamente', centro: centroActualizado });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar el centro', error: error.message });
    }
};

// Eliminar un centro
export const eliminarCentro = async (req, res) => {
    try {
        const centroEliminado = await Centro.findByIdAndDelete(req.params.id);

        if (!centroEliminado) {
            return res.status(404).json({ mensaje: 'Centro no encontrado' });
        }

        res.status(200).json({ mensaje: 'Centro eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar el centro', error: error.message });
    }
};