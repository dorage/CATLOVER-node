import mongoose from 'mongoose';

const instagramSchema = mongoose.Schema({
    id: String,
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post',
        },
    ],
});

const model = mongoose.model('Instagram', instagramSchema);

export default model;
