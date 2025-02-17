import mongoose from "mongoose";

const DepartamentoSchema = new mongoose.Schema({
    produccion: { type: mongoose.Schema.Types.ObjectId, ref: 'Produccion', required: true },
    nombreDepartamento: { type: String, required: true }
});

const Departamento = mongoose.model('Departamentos', DepartamentoSchema);

export default Departamento;