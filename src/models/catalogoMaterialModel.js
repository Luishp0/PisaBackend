import mongoose from "mongoose";


const CatalogoMaterialSchema = new mongoose.Schema({
    nombreMaterialCatalogo: {type: String, required: true},
    descripcionMaterial: {type: String, required: true}
})

const CatalogoMaterial = mongoose.model('CatalogoMaterial', CatalogoMaterialSchema);


export default CatalogoMaterial