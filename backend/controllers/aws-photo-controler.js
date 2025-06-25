const awsPhotoRouter = require('express').Router()
const multer = require('multer')
require('dotenv').config()

const {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
  ListBucketsCommand,
  ListObjectsV2Command,
} = require('@aws-sdk/client-s3')
const { json } = require('express')

const BUCKET = 'gallery-app-project'
const REGION = 'eu-north-1'

// Configura multer para leer archivos desde el body
const storage = multer.memoryStorage()
const upload = multer({ storage })

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

    const photos = data.Contents.map(obj => {
      const photo = {
        url: `https://${BUCKET}.s3.${REGION}.amazonaws.com/${obj.Key}`,
        name: obj.Key,
      }
      return photo
    })

    console.log(`GET: /allImages`)
    res.status(200).json(photos)
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

awsPhotoRouter.post('/upload', upload.single('file'), async (req, res) => {
  const file = req.file
  if (!file) {
    return res.status(400).send('No se subió ningún archivo')
  }

  console.log('file: ', file)

  const fileName = `${Date.now()}_${file.originalname}`
  const fileUrl = `https://${BUCKET}.s3.${REGION}.amazonaws.com/${fileName}`
  const newPhoto = { name: fileName, url: fileUrl }
  const params = {
    Bucket: BUCKET,
    Key: fileName,
    Body: file.buffer,
    ContentType: file.mimetype,
  }

  try {
    const command = new PutObjectCommand(params)
    await s3.send(command)

    console.log(`POST ${fileName}`)
    res.status(200).json(newPhoto)
  } catch (err) {
    console.error('Error al subir la imagen:', err)
    res.status(500).send('Error al subir imagen')
  }
})

module.exports = awsPhotoRouter
