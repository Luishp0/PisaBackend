import Produccion from '../models/Produccion.js';

// Crear una nueva producción
export const crearProduccion = async (req, res) => {
    try {
        const { usuario, ciclo, velocidadMin, piezasProduccidas } = req.body;

        const nuevaProduccion = new Produccion({
            usuario,
            piezasProduccidas,
            ciclo,
            velocidadMin
        });

        await nuevaProduccion.save();

        res.status(201).json({ mensaje: 'Producción creada exitosamente', produccion: nuevaProduccion });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear la producción', error: error.message });
    }
};

// Obtener todas las producciones
export const obtenerProducciones = async (req, res) => {
    try {
        const producciones = await Produccion.find().populate('usuario');
        res.status(200).json(producciones);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener las producciones', error: error.message });
    }
};

// Obtener una producción por ID
export const obtenerProduccionPorId = async (req, res) => {
    try {
        const produccion = await Produccion.findById(req.params.id).populate('usuario');
        if (!produccion) {
            return res.status(404).json({ mensaje: 'Producción no encontrada' });
        }
        res.status(200).json(produccion);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener la producción', error: error.message });
    }
};

// Actualizar una producción
export const actualizarProduccion = async (req, res) => {
    try {
        const { ciclo, velocidadMin } = req.body;

        const produccionActualizada = await Produccion.findByIdAndUpdate(
            req.params.id,
            { ciclo, velocidadMin },
            { new: true }
        );

        if (!produccionActualizada) {
            return res.status(404).json({ mensaje: 'Producción no encontrada' });
        }

        res.status(200).json({ mensaje: 'Producción actualizada exitosamente', produccion: produccionActualizada });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar la producción', error: error.message });
    }
};

// Eliminar una producción
export const eliminarProduccion = async (req, res) => {
    try {
        const produccionEliminada = await Produccion.findByIdAndDelete(req.params.id);

        if (!produccionEliminada) {
            return res.status(404).json({ mensaje: 'Producción no encontrada' });
        }

        res.status(200).json({ mensaje: 'Producción eliminada exitosamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar la producción', error: error.message });
    }
};