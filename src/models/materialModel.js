import mongoose from "mongoose";


const MaterialSchema = new mongoose.Schema({
    produccion: { type: mongoose.Schema.Types.ObjectId, ref: 'Produccion', required: true },
    codigoMaterial: { type: Number, required: true },
    lote: { type: Number, required: true },
    orden: { type: Number, required: true },
    piezasPorUnidad: { type: Number, required: true, min: 1 },
    descripcionMaterial: { type: String, required: true }
});

const Material = mongoose.model('Material', MaterialSchema);

export default Material;
