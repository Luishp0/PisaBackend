import mongoose from "mongoose";

const EtapaSchema = new mongoose.Schema({
    produccion: { type: mongoose.Schema.Types.ObjectId, ref: 'Produccion', required: true },
    nombreEtapa: { type: String, required: true }
});

const Etapa = mongoose.model('Etapa', EtapaSchema);


export default Etapa;