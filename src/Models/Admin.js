import mongoose from 'mongoose';

const AdminSchema = mongoose.Schema({
    id: String,
    password: String
});

const model = mongoose.model('Admin', AdminSchema);

export default model;
