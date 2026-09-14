const awsPhotoRouter = require('express').Router();
const photoController = require('../controllers/photoController');
const multer = require('multer');

// Configura multer para leer archivos desde el body
const storage = multer.memoryStorage();
const upload = multer({ storage });

awsPhotoRouter.get('/allPhotos', photoController.getAllPhotos);
awsPhotoRouter.post(
    '/upload',
    upload.single('file'),
    photoController.upLoadPhoto,
);

awsPhotoRouter.get('/download/:filename', photoController.downloadPhoto);

awsPhotoRouter.delete('/:filename', photoController.deletePhoto);

module.exports = awsPhotoRouter;
