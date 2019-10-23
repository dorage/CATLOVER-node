import mongoose from 'mongoose';

const postLikeSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
    },
});

const girlLikeSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    girl: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Girl',
    },
});

export const PostLike = mongoose.model('PostLike', postLikeSchema);
export const GirlLike = mongoose.model('GirlLike', girlLikeSchema);
