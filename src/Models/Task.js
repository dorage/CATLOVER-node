import mongoose from 'mongoose';

const taskSchema = mongoose.Schema({
    state: String,
    crawler: String,
    updatedDate: Date,
    instagram: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Instagram',
    },
});

const model = mongoose.model('Task', taskSchema);

export default model;
