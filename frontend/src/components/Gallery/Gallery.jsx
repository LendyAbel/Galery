import './gallery.css'
import Photo from '../Photo/Photo'

const Gallery = ({ photos }) => {
  return (
    <div className='gallery-container'>
      {photos.map((photo, index) => (
        <Photo key={index} photo={photo} />
      ))}
    </div>
  )
}

export default Gallery
