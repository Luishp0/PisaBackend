import mongoose from "mongoose";

const CentroSchema = new mongoose.Schema({
    produccion: { type: mongoose.Schema.Types.ObjectId, ref: 'Produccion', required: true },
    nombreCentro: { type: String, required: true }
});

const Centro = mongoose.model('Centro', CentroSchema);

export default Centro;
