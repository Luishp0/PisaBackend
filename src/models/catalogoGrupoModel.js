import mongoose from "mongoose";

const CatalogoGrupoSchema = new mongoose.Schema({
    nombreGrupoCatalogo: {type:String, required: true}
})

const CatalogoGrupo = mongoose.model('GrupoCatalogo', CatalogoGrupoSchema)

export default CatalogoGrupo