const express = require('express');
const mongoose = require('mongoose');
const Movie = require('./models/Movie.js');
const Show = require('./models/Show.js');
const router = express.Router();

require('dotenv').config();
const { DB_URI, DB_USER, DB_PASSWORD } = process.env;

mongoose
    .connect(DB_URI)
    .then(() => console.log('Connected to MongoDB '))
    .catch((err) => console.log(err));

router.post('/login', (req, res) => {
    let credentials =
        DB_USER && DB_PASSWORD
            ? { username: DB_USER, password: DB_PASSWORD }
            : { username: 'abc', password: 'abc' };
    const { username, password } = req.body;
    if (username === credentials.username && password === credentials.password)
        res.json({ message: 'Logged in' });
    else res.status(401).json({ message: 'Incorrect credentials' });
});

router.post('/logout', (req, res) => {
    // Not implemented
    res.send('Logging out...');
});

router.get('/shows', async (req, res) => {
    const shows = await Show.find({}).catch((err) => console.log(err));
    res.json(shows);
});
router.get('/movies', async (req, res) => {
    const movies = await Movie.find({}).catch((err) => console.log(err));
    res.json(movies);
});

router.get('/shows/:name', async (req, res) => {
    const { name } = req.params;
    const show = await Show.find({ name }).catch((err) => console.log(err));
    res.json(show);
});

router.get('/movies/:id', async (req, res) => {
    const { name } = req.params;
    const movie = await Movie.find({ name }).catch((err) => console.log(err));
    res.json(movie);
});

router.post('/shows', async (req, res) => {
    const { items } = req.body;
    for (let i of items) {
        if (i.delete) {
            await Show.deleteOne({ name: i.name });
        } else {
            const result = await Show.updateOne({ name: i.name }, i, {
                upsert: true,
            });
        }
    }
});

router.post('/movies', async (req, res) => {
    const { items } = req.body;
    for (let i of items) {
        if (i.delete) {
            await Movie.deleteOne({ name: i.name });
        } else {
            const result = await Movie.updateOne({ name: i.name }, i, {
                upsert: true,
            });
        }
    }
});

module.exports = router;
