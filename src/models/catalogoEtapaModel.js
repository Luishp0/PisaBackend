import mongoose from "mongoose";

const CatalogoEtapaSchema = new mongoose.Schema({
    nombreEtapaCatalogo: {type:String, required: true}
})

const CatalogoEtapa = mongoose.model('CatalogoEtapa', CatalogoEtapaSchema);

export default CatalogoEtapa




