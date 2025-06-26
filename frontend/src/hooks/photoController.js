import { useEffect, useState } from 'react'
import photoServices from '../services/photos'

const usePhotos = () => {
  const [photos, setPhotos] = useState([])

  useEffect(() => {
    fetchPhotos()
  }, [])

  const fetchPhotos = async () => {
    try {
      const photos = await photoServices.getAll()
      setPhotos(photos)
    } catch (error) {
      console.error('No se pudo cargar todas la fotos: ', error)
    }
  }

  const uploadPhotos = async file => {
    if (!file) return
    try {
      const newPhoto = await photoServices.uploadPhoto(file)
      setPhotos(prevPhotos => [...prevPhotos, newPhoto])
      console.log('photo uploaded')
    } catch (error) {
      console.error('Error al subir la imagen', error)
    }
  }

  const deletePhoto = async file => {
    try {
      await photoServices.deletePhoto(file.name)
      const photosAfter = photos.filter(photo => photo.name !== file.name)
      setPhotos(photosAfter)
      console.log('photo deleted')
    } catch (error) {
      console.error('No se pudo borrar la foto', error)
    }
  }

  return {photos,uploadPhotos,deletePhoto}
}

export default usePhotos