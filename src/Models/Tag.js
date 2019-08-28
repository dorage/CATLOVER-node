import mongoose from 'mongoose';

const tagSchema = mongoose.Schema({
    name: String,
});

const model = mongoose.model('Tag', tagSchema);

export default model;
