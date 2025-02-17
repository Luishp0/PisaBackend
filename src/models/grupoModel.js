import mongoose from "mongoose";

const GrupoSchema = new mongoose.Schema({
    produccion: { type: mongoose.Schema.Types.ObjectId, ref: 'Produccion', required: true },
    nombreGrupo: {type: String, required: true}

})

const Paro = mongoose.model('grupos', GrupoSchema)

export default Paro