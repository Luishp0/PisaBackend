import mongoose from "mongoose";


const MaterialSchema = new mongoose.Schema({
    produccion: { type: mongoose.Schema.Types.ObjectId, ref: 'Produccion', required: true },
    nombreMaterial:{type: String},
    lote: { type: String, required: true },
    orden: { type: Number, required: true },
    descripcionMaterial: { type: String, required: true },
    velocidadNominal: {type: Number, required: true }
});

const Material = mongoose.model('Material', MaterialSchema);

export default Material;
