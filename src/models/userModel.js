import mongoose from 'mongoose';

const UsuarioSchema = new mongoose.Schema({
    nombreUsuario: { type: String, required: true },
    contrasena: { type: String, required: true },
    familia: { type: String },
    puesto: { type: String },
    bloqueado: { type: Boolean, default: false },
    intentoFallidos: { type: Number, default: 0 },
    fechaHora: { type: Date, default: Date.now },
    idRol: { type: mongoose.Schema.Types.ObjectId, ref: 'roles', required: true }
});


const usuario = mongoose.model('usuario', UsuarioSchema)

export default usuario
