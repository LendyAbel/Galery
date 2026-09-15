const path = require('path')
const awsPhotoRouter = require('./modules/photos/routers/photoRouter');
const { awsErrorHandler } = require('./middleware/awsErrorHandler');
const express = require('express');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/photos', awsPhotoRouter);

app.get('/*splat', (req, res) =>
    res.sendFile(path.join(__dirname, 'public', 'index.html')),
);

app.use(awsErrorHandler);

module.exports = app;
