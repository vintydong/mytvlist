const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    name: String,
    rating: Number,
    delete: { type: Boolean, default: false },
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
