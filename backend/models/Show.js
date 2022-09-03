const mongoose = require('mongoose');

const showSchema = new mongoose.Schema({
    name: String,
    rating: Number,
    season: Number,
    episode: Number,
    delete: { type: Boolean, default: false },
});

const Show = mongoose.model('Show', showSchema);

module.exports = Show;
