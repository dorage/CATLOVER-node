import mongoose from 'mongoose';

const girlSchema = mongoose.Schema({
    name: String,
    nickname: String,
    like: Number,
    profile: String,
    instagram: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Instagram',
        },
    ],
    tags: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Tag',
        },
    ],
});

const model = mongoose.model('Girl', girlSchema);

export default model;
