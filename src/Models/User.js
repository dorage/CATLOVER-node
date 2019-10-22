import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    id: String,
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post'
        }
    ],
    girls: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Girl'
        }
    ],
    tags: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Tag'
        }
    ]
});

const model = mongoose.model('User', userSchema);

export default model;
