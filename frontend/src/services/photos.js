import axios from 'axios'
const baseUrl = '/api/photos'

const getAll = async () => {
  try {
    const res = await axios.get(`${baseUrl}/allPhotos`)
    return res.data
  } catch (error) {
    console.error('Error al obtener las fotos', error)
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
    console.error('Error al subir la imagen', error)
  }
}

const deletePhoto = async file => {
  try {
    const res = await axios.delete(`${baseUrl}/${file}`)
    console.log(`DELETE done: ${file}`)

    console.log('res.data:', res.data)
    return res.data
  } catch (error) {
    console.error('Error al eliminar la imagen: ', error)
  }
}

export default { getAll, uploadPhoto, deletePhoto }
