import './gallery.css'
import Photo from '../Photo/Photo'

const Gallery = ({ photos }) => {
  return (
    <div className='gallery-container'>
      {photos.map((photo, index) => (
        <Photo key={index} photoUrl={photo.url} />
      ))}
    </div>
  )
}

export default Gallery
