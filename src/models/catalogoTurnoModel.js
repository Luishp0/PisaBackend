import mongoose from "mongoose";

const CatalogoTurnoSchema = new mongoose.Schema({
    nombreTurnoCatalogo: {type: String, required:true}
})

const CatalogoTurno = mongoose.model('catalogoTurno', CatalogoTurnoSchema)

export default CatalogoTurno