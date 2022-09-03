const apiRouter = require('./api.js');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/api', apiRouter);

const PORT = 5000 || process.env.PORT;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
