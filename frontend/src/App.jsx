import { useEffect, useState } from 'react'
import photoServices from './services/photos'
import Gallery from './components/Gallery/Gallery'
import Upload from './components/Upload/Upload'

function App() {
  const [photos, setPhotos] = useState([])
  console.log(photos)

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
      const response = await photoServices.uploadPhoto(file)
      console.log(response)

      const newPhotoUrl = response.url
      setPhotos(prevPhotos => [newPhotoUrl, ...prevPhotos])
      console.log('photo uploaded')
    } catch (error) {
      alert('Error al subir la imagen')
      console.error(error)
    }
  }

  const deletePhoto = async file => {
    try {
      const photoDelete = await photoServices.deletePhoto(file)

      const photosAfter = photos.filter(photo => photo !== photoDelete)
      setPhotos(photosAfter)
    } catch (error) {
      console.error('No se pudo borrar la foto', error)
    }
  }

  return (
    <div>
      <Gallery photos={photos} deletePhoto={deletePhoto} />
      <Upload uploadPhoto={uploadPhotos} />
    </div>
  )
}

export default App
