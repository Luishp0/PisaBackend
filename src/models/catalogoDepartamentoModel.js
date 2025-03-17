import mongoose from "mongoose";

const CatalogoDepartamentoSchema = new mongoose.Schema({
    nombreDepartamentoCatalogo: {type: String, required: true}
});

const CatalogoDepartamento = mongoose.model("catalogoDepartamento", CatalogoDepartamentoSchema)


export default CatalogoDepartamento
