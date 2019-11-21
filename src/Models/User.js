import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    googleId: String,
    name: String
});

const model = mongoose.model('User', userSchema);

export default model;
