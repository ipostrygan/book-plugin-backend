const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const bookSearch = require('./routes/search');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use('/search', bookSearch);

app.listen(3000);

module.exports = app;
