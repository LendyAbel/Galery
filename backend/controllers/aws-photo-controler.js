const awsPhotoRouter = require('express').Router()
require('dotenv').config()
const {
  S3Client,
  GetObjectCommand,
  ListBucketsCommand,
  ListObjectsV2Command,
} = require('@aws-sdk/client-s3')

const BUCKET = 'gallery-app-project'
const REGION = 'eu-north-1'

console.log('AccessKeyId:', process.env.API_AWS_ACCESS_KEY)
console.log(
  'SecretAccessKey:',
  process.env.API_AWS_SECRET_ACCESS_KEY ? '********' : 'NO DEFINIDA'
)

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

awsPhotoRouter.get('/allPhotos', async (req, res) => {
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
      const Urls = `https://${BUCKET}.s3.${REGION}.amazonaws.com/${obj.Key}`

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

awsPhotoRouter.get('/:filename', async (req, res) => {
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
  } catch (err) {
    console.error('Error al obtener la imagen:', err)
    res.status(500).send('No se pudo obtener la imagen')
  }
})

module.exports = awsPhotoRouter
