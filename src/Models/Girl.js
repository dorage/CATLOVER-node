import mongoose from 'mongoose';

const girlSchema = mongoose.Schema({
    name: String,
    like: Number,
    nickname: String,
    tags: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Tag'
        }
    ]
});

const model = mongoose.model('Girl', girlSchema);

export default model;
