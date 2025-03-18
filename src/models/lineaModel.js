import mongoose from "mongoose";

const LineaSchema = new mongoose.Schema({
    produccion: { type: mongoose.Schema.Types.ObjectId, ref: 'Produccion', required: true },
    nombreLinea: { type: String, required: true },
});

const Linea = mongoose.model('Linea', LineaSchema);

export default Linea;
