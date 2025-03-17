import mongoose from "mongoose";

const CatalogoCentroSchema =  new mongoose.Schema({
    nombreCentroCatalogo: { type: String, required: true}
});
const CatalogoCentroModel = mongoose.model("CatalogoCentro", CatalogoCentroSchema);


export default CatalogoCentroModel