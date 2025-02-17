import mongoose from "mongoose";

const RechazoSchema = new mongoose.Schema({
    produccion: { type: mongoose.Schema.Types.ObjectId, ref: 'Produccion', required: true },
    nombreRechazo: { type: String, required: true },
    cantidad: { type: Number, required: true, min: 0 }
});

const Rechazo = mongoose.model('Rechazos', RechazoSchema);

export default Rechazo;