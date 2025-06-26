import axios from 'axios'
const baseUrl = '/api/photos'

const getAll = async () => {
  try {
    const res = await axios.get(`${baseUrl}/allPhotos`)
    return res.data
  } catch (error) {
    console.error('Error al obtener las fotos', error.message)
  }
}

const uploadPhoto = async file => {
  const formData = new FormData()
  formData.append('file', file)

  try {
    const res = await axios.post(`${baseUrl}/upload`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return res.data
  } catch (error) {
    console.error('Error al subir la imagen', error.response.data)
  }
}

const deletePhoto = async fileName => {
  try {
    await axios.delete(`${baseUrl}/${fileName}`)
  } catch (error) {
    console.error('Error al eliminar la imagen: ', error)
  }
}

const downloadPhoto = async fileName => {
  console.log('SERVICES AQQUIIII')
  try {
    const res = await axios.get(`${baseUrl}/download/${fileName}`, {
      responseType: 'blob', // 👈 importante para recibir datos binarios
    })
    return res
  } catch (error) {
    console.error('Error al descargar la imagen: ', error)
  }
}

export default { getAll, uploadPhoto, deletePhoto, downloadPhoto }
