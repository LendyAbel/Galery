const { ListObjectsV2Command, S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');

const BUCKET = 'gallery-app-project';
const REGION = 'eu-north-1';

const s3 = new S3Client({
    region: REGION,
    credentials: {
        accessKeyId: process.env.API_AWS_ACCESS_KEY,
        secretAccessKey: process.env.API_AWS_SECRET_ACCESS_KEY,
    },
});

const fetchAllPhotos = async () => {
    
        const params = { Bucket: BUCKET };
        const command = new ListObjectsV2Command(params);
        const data = await s3.send(command);

        if (!data.Contents) {
            return [];
        }

        const photos = data.Contents.map(obj => {
            const photo = {
                url: `https://${BUCKET}.s3.${REGION}.amazonaws.com/${obj.Key}`,
                name: obj.Key,
                date: obj.LastModified,
                size: obj.Size,
            };
            return photo;
        });
        return photos;
};

const uploadPhoto = async (data) => {
    const fileName = data.originalname;
    const fileUrl = `https://${BUCKET}.s3.${REGION}.amazonaws.com/${fileName}`;
    const newPhoto = {
        name: fileName,
        url: fileUrl,
        date: new Date().toISOString(),
        size: data.size,
    };
    const params = {
        Bucket: BUCKET,
        Key: fileName,
        Body: data.buffer,
        ContentType: data.mimetype,
    };

    const command = new PutObjectCommand(params)
    await s3.send(command)
    return newPhoto
}

const downloadPhoto = async (filename) => {
    const params = { Bucket: BUCKET, Key: filename };
    const command = new GetObjectCommand(params);
    return s3.send(command);
};

const deletePhoto = async (filename) => {
    const params = { Bucket: BUCKET, Key: filename };
    const command = new DeleteObjectCommand(params);
    await s3.send(command);
};

module.exports = { fetchAllPhotos, uploadPhoto, downloadPhoto, deletePhoto };
