import mongoose from "mongoose";

const CatalogoGrupoSchema = new mongoose.Schema({
    nombreGrupoCatalogo: {type:String, required: true}
})

const CatalogoGrupo = mongoose.model('CatalogoGrupo', CatalogoGrupoSchema)

export default CatalogoGrupo