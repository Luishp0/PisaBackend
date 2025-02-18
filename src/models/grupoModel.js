import mongoose from "mongoose";

const GrupoSchema = new mongoose.Schema({
    produccion: { type: mongoose.Schema.Types.ObjectId, ref: 'Produccion', required: true },
    nombreGrupo: {type: String, required: true}

})

const Grupo = mongoose.model('grupos', GrupoSchema)

export default Grupo