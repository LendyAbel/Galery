import './gallery.css'
import Photo from '../Photo/Photo'
import photoServices from '../../services/photos'
import { useEffect, useState } from 'react'

const Gallery = () => {
  const [photos, setPhotos] = useState([])

  useEffect(() => {
    getPhotos()
  }, [])

  const getPhotos = async () => {
    const photos = await photoServices.getAll()
    setPhotos(photos)
  }

  return (
    <div className='gallery-container'>
      {photos.map((photo, index) => (
        <Photo key={index} photo={photo} />
      ))}
    </div>
  )
}

export default Gallery
