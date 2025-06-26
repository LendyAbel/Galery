const awsPhotoRouter = require('./controllers/aws-photo-controller')
const {awsErrorHandler} = require('./utils/middleware')
const express = require('express')

const app = express()
app.use(express.json())

app.use('/api/photos', awsPhotoRouter)

app.use(awsErrorHandler)

module.exports = app
