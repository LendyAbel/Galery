const {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
  ListBucketsCommand,
  ListObjectsV2Command,
} = require('@aws-sdk/client-s3')
const multer = require('multer')
const express = require('express')
const fs = require('fs')

require('dotenv').config()

const app = express()
const upload = multer({ dest: 'uploads/' })

const BUCKET = 'gallery-app-project'
const REGION = 'eu-north-1'

// Configura AWS
const s3 = new S3Client({
  region: REGION,
  credentials: {
    accessKeyId: process.env.API_AWS_ACCESS_KEY,
    secretAccessKey: process.env.API_AWS_SECRET_ACCESS_KEY,
  },
})

//Consultar buckets disponibles
// const listBuckets = async () => {
//   try {
//     const command = new ListBucketsCommand()
//     const response = await s3.send(command)

//     console.log('Lista de buckets:')
//     response.Buckets.forEach(bucket => {
//       console.log(`-${bucket.Name}`)
//     })
//   } catch (error) {
//     console.log('Error', err)
//   }
// }
// listBuckets()

//Obtener imagnes del Bucket
app.get('/imagen/:filename', async (req, res) => {
  const filename = req.params.filename

  const params = {
    Bucket: BUCKET,
    Key: filename,
  }

  try {
    const command = new GetObjectCommand(params)
    const data = await s3.send(command)
    // res.setHeader('Content-Type', data.ContentType || 'image/jpeg')
    console.log(`GET /imagen/${filename}`)

    data.Body.pipe(res)
  } catch (error) {
    console.error('Error al obtener la imagen:', err)
    res.status(500).send('No se pudo obtener la imagen')
  }
})

app.get('/allImages', async (req, res) => {
  const params = {
    Bucket: BUCKET,
  }
  try {
    const command = new ListObjectsV2Command(params)
    const data = await s3.send(command)

    if (!data.Contents) {
      return res.json([])
    }

    console.log('Imagenes URLS:')
    const imageUrls = data.Contents.map(obj => {
      const Urls = `http://${BUCKET}.s3.${REGION}.amazonaws.com/${obj.Key}`

      console.log(`-${Urls}`)
      return Urls
    })
    console.log(`GET /allImages`)

    res.json(imageUrls)
  } catch (err) {
    console.error('Error al listar imágenes:', err)
    res.status(500).send('Error al listar imágenes')
  }
})

module.exports = app
