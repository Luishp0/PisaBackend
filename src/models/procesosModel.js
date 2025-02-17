import mongoose from "mongoose";

const ProcesoSchema = new mongoose.Schema({
    produccion: { type: mongoose.Schema.Types.ObjectId, ref: 'Produccion', required: true },
    nombreProceso: { type: String, required: true }
});

const Proceso = mongoose.model('Procesos', ProcesoSchema);

export default Proceso;