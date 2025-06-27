const awsPhotoRouter = require('express').Router()
const multer = require('multer')
require('dotenv').config()

const {
  S3Client,
  ListObjectsV2Command,
  GetObjectCommand,
  PutObjectCommand,
  DeleteObjectCommand,
} = require('@aws-sdk/client-s3')

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

awsPhotoRouter.get('/allPhotos', async (request, response, next) => {
  try {
    const params = {
      Bucket: BUCKET,
    }
    const command = new ListObjectsV2Command(params)
    const data = await s3.send(command)

    if (!data.Contents) {
      return response.json([])
    }

    const photos = data.Contents.map(obj => {
      const photo = {
        url: `https://${BUCKET}.s3.${REGION}.amazonaws.com/${obj.Key}`,
        name: obj.Key,
      }
      return photo
    })

    response.status(200).json(photos)
    console.log(`GET: /allImages`)
  } catch (error) {
    next(error)
  }
})

awsPhotoRouter.get('/download/:filename', async (request, response, next) => {
  const filename = request.params.filename
  const params = { Bucket: BUCKET, Key: filename }
  try {
    const command = new GetObjectCommand(params)
    const data = await s3.send(command)

    response.setHeader(
      'Content-Disposition',
      `attachment; filename="${filename}"`
    )
    response.setHeader(
      'Content-Type',
      data.ContentType || 'application/octet-stream'
    )
    data.Body.pipe(response)
    console.log(`DOWLOAD: /download/${filename}`)
  } catch (error) {
    next(error)
  }
})

awsPhotoRouter.post(
  '/upload',
  upload.single('file'),
  async (request, response, next) => {
    const file = request.file
    if (!file) {
      return response.status(400).send('No se subió ningún archivo')
    }

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
      response.status(200).json(newPhoto)
    } catch (err) {
      next(error)
    }
  }
)

awsPhotoRouter.delete('/:filename', async (request, response, next) => {
  const filename = request.params.filename
  const params = { Bucket: BUCKET, Key: filename }

  try {
    const command = new DeleteObjectCommand(params)
    await s3.send(command)
    console.log(`DELETE:`)
    response.status(200).json(filename)
  } catch (error) {
    next(error)
  }
})

module.exports = awsPhotoRouter
