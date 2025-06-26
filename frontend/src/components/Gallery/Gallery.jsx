import './gallery.css'
import Photo from '../Photo/Photo'

const Gallery = ({ photos, deletePhoto }) => {

  if (!photos) return
  
  return (
    <div className='gallery-container'>
      {photos.map((photo, index) => (
        <Photo key={index} photo={photo} deletePhoto={deletePhoto} />
      ))}
    </div>
  )
}

export default Gallery
