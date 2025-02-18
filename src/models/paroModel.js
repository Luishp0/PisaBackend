import mongoose from "mongoose";

const ParoSchema = new mongoose.Schema({
    produccion: { type: mongoose.Schema.Types.ObjectId, ref: 'Produccion', required: true },
    numeroNivel: { type: Number, required: true },
    descripcion: { type: String, required: true }
});

const Paro = mongoose.model('Paros', ParoSchema);

export default Paro;