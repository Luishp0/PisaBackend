import mongoose from "mongoose"

const ProduccionSchema = new mongoose.Schema({
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuarios', required: true },
    fechaHora: { type: Date, default: Date.now },
    piezasProduccidas: {type: Number},
    ciclo: { type: Number, required: true },
});

const Produccion = mongoose.model('Produccion', ProduccionSchema, 'produccion');

export default Produccion;