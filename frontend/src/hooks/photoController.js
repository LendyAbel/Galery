import { useEffect, useState } from 'react'
import photoServices from '../services/photos-server'

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

  const downloadPhoto = async file => {
    try {
      const response = await photoServices.downloadPhoto(file.name)
      if (!response) return

      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', file.name) // nombre con el que se descargará
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('No se puedo descargar la foto', error)
    }
  }

  return { photos, uploadPhotos, deletePhoto, downloadPhoto }
}

export default usePhotos
