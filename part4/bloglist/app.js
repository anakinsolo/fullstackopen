const express = require('express');
const app = express();
const blogRouter = require('./controller/router');
const config = require('./utils/config');
const middleware = require('./utils/middleware');

const cors = require('cors');
const mongoose = require('mongoose');

mongoose.connect(config.MONGODB_URI);

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);


app.use('/api/blogs', blogRouter);

module.exports = app;