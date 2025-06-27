import './gallery.css'
import Photo from '../Photo/Photo'

const Gallery = ({ photos, deletePhoto, downloadPhoto }) => {

  if (!photos) return
  
  return (
    <div className='gallery-container'>
      {photos.map((photo, index) => (
        <Photo key={index} photo={photo} deletePhoto={deletePhoto} downloadPhoto={downloadPhoto} />
      ))}
    </div>
  )
}

export default Gallery
