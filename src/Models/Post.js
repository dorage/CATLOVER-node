import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    view: Number,
    like: Number,
    isImage: Boolean,
    link: String,
    images: [String],
    tags: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Tag',
        },
    ],
});

const model = mongoose.model('Post', postSchema);

export default model;
