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
  console.log(file)

  const formData = new FormData()
  console.log('FORMDATA:', formData)

  formData.append('file', file)
  console.log('FORMDATA:', formData)

  try {
    const res = await axios.post(`${baseUrl}/upload`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return res.data
  } catch (error) {
    console.error('Error al subir la imagen', error)
  }
}

export default { getAll, uploadPhoto }
