import mongoose from "mongoose";

const TurnoSchema = mongoose.Schema({
    produccion: { type: mongoose.Schema.Types.ObjectId, ref: 'Produccion', required: true },
    nombreTurno: {type: String, required:true}
})

const turno = mongoose.model('turno', TurnoSchema);

export default turno