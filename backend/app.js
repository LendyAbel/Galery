const awsPhotoRouter = require('./modules/photos/routers/photoRouter');
const { awsErrorHandler } = require('./middleware/awsErrorHandler');
const express = require('express');

const app = express();
app.use(express.json());

app.use('/api/photos', awsPhotoRouter);

app.use(awsErrorHandler);

module.exports = app;
