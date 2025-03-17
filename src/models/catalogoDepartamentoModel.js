import mongoose from "mongoose";

const CatalogoDepartamentoSchema = new mongoose.Schema({
    nombreDepartementoCatalogo: {type: String, required: true}
});

const CatalogoCentro = mongoose.model("catalogoDepartamento", CatalogoDepartamentoSchema)


export default CatalogoCentro
