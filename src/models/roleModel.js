import mongoose from 'mongoose';

const RoleSchema = new mongoose.Schema({
    tipo: { type: String, required: true }
});

const Role = mongoose.model('roles', RoleSchema);

export default Role;
