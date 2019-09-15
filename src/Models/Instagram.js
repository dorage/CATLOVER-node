import mongoose from 'mongoose';

const instagramSchema = mongoose.Schema({
    id: String,
    profile: String,
    girl: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Girl'
    }
});

const model = mongoose.model('Instagram', instagramSchema);

export default model;
