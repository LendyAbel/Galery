import './gallery.css'
import Photo from '../Photo/Photo'
import PropTypes from 'prop-types'
import { motion, AnimatePresence } from 'framer-motion'

const Gallery = ({ photos, deletePhoto, downloadPhoto }) => {
  if (!photos || photos.length === 0) {
    return (
      <motion.div
        className='gallery-empty'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h3>🖼️ Tu galería está vacía</h3>
        <p>¡Sube tu primera foto para comenzar!</p>
      </motion.div>
    )
  }

  return (
    <motion.div
      className='gallery-container'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <AnimatePresence>
        {photos.map((photo, index) => (
          <motion.div
            key={photo.id || index}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            transition={{
              duration: 0.4,
              delay: index * 0.1,
              type: 'spring',
              stiffness: 100,
            }}
            layout
          >
            <Photo photo={photo} deletePhoto={deletePhoto} downloadPhoto={downloadPhoto} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  )
}

Gallery.prototype = {
  photos: PropTypes.array.isRequired,
  deletePhoto: PropTypes.func.isRequired,
  downloadPhoto: PropTypes.func.isRequired,
}

export default Gallery
