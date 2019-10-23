import mongoose from 'mongoose';

const TagListSchema = mongoose.Schema({
    tag: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag',
    },
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post',
        },
    ],
});

const model = mongoose.model('TagList', TagListSchema);

export default model;
