const photoServices = require('../services/photoServices');


const getAllPhotos = async (_request, response, next) => {
    try {
        const photos = await photoServices.fetchAllPhotos();
        response.status(200).json(photos);
    } catch (error) {
        next(error);
    }
};

const upLoadPhoto = async (request, response, next) => {
    try {
        const data = request.file;
        if (!data) {
            return response.status(400).send('No se subió ningún archivo');
        }

        const newPhoto = await photoServices.uploadPhoto(data);
        response.status(200).json(newPhoto);
    } catch (error) {
        next(error);
    }
};

const downloadPhoto = async (request, response, next) => {
    try {
        const { filename } = request.params;
        const data = await photoServices.downloadPhoto(filename);

        response.setHeader(
            'Content-Disposition',
            `attachment; filename="${filename}"`,
        );
        response.setHeader(
            'Content-Type',
            data.ContentType || 'application/octet-stream',
        );
        data.Body.pipe(response);
    } catch (error) {
        next(error);
    }
};

const deletePhoto = async (request, response, next) => {
    try {
        const { filename } = request.params;
        await photoServices.deletePhoto(filename);
        response.status(200).json(filename);
    } catch (error) {
        next(error);
    }
};

module.exports = { getAllPhotos, upLoadPhoto, downloadPhoto, deletePhoto };
