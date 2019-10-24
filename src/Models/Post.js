import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    isImage: Boolean,
    link: String,
    images: [String],
    instagram: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Instagram',
    },
    girl: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Gril',
    },
});

const model = mongoose.model('Post', postSchema);

export default model;
