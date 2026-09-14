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

module.exports = { getAllPhotos, upLoadPhoto };
