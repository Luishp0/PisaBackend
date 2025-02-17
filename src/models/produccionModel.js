import mongoose from "mongoose"

const ProduccionSchema = new mongoose.Schema({
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuarios', required: true },
    fechaHora: { type: Date, default: Date.now },
    ciclo: { type: Number, required: true, min: 1 },
    velocidadMin: { type: Number, required: true, min: 0 }
});

const Produccion = mongoose.model('Produccion', ProduccionSchema);

export default Produccion;