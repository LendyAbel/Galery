import './gallery.css'
import Photo from '../Photo/Photo'
import PropTypes from 'prop-types'

const Gallery = ({ photos, deletePhoto, downloadPhoto }) => {
  if (!photos) return

  return (
    <div className='gallery-container'>
      {photos.map((photo, index) => (
        <Photo
          key={index}
          photo={photo}
          deletePhoto={deletePhoto}
          downloadPhoto={downloadPhoto}
        />
      ))}
    </div>
  )
}

Gallery.prototype = {
  photos: PropTypes.array.isRequired,
  deletePhoto: PropTypes.func.isRequired,
  downloadPhoto: PropTypes.func.isRequired,
}

export default Gallery
