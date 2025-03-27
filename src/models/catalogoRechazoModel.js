import mongoose from "mongoose";

const CatalogoRechazoSchema = new mongoose.Schema({
    nombreRechazoCatalogo: {type: String, required: true}
})

const CatalogoRechazo = mongoose.model('catalogoRechazo', CatalogoRechazoSchema)


export default CatalogoRechazo