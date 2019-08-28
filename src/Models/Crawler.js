import mongoose from 'mongoose';

const CrawlerSchema = mongoose.Schema({
    name: String,
    startDate: Date,
});

const model = mongoose.model('Crawler', CrawlerSchema);

export default model;
