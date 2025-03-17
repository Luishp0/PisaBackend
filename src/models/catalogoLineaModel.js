import mongoose from "mongoose";

const CatalogoLineaSchema = new mongoose.Schema({
    nombreLineaCatalogo: {type: String, required: true}
})

const CatalogoLinea = mongoose.model('catalogoLinea', CatalogoLineaSchema)

export default CatalogoLinea
