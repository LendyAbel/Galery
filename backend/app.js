const awsPhotoRouter = require('./controllers/aws-photo-controler')

const express = require('express')

const app = express()

app.use('/api/photos', awsPhotoRouter)

module.exports = app
