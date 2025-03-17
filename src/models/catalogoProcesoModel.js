import mongoose from "mongoose";

const CatalogoProcesoSchema = new mongoose.Schema({
    nombreProcesoCatalogo: {type: String, required: true}
})

const CatalogoProceso = mongoose.model('catalogoProceso', CatalogoProcesoSchema)


export default CatalogoProceso
