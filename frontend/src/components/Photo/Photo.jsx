import { useState } from 'react'
import PropTypes from 'prop-types'
import { FaTrash, FaDownload, FaTimes } from 'react-icons/fa'
import { AnimatePresence, motion } from 'framer-motion'
import './photo.css'

const Photo = ({ photo, deletePhoto, downloadPhoto }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  const clickToOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleDeleteClick = e => {
    e.stopPropagation()
    deletePhoto(photo)
    setIsModalOpen(false)
  }

  const handleDownload = e => {
    e.stopPropagation()
    downloadPhoto(photo)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const modalOverlayVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  }

  const modalContentVariants = {
    initial: { scale: 0.8, opacity: 0, y: 50 },
    animate: { scale: 1, opacity: 1, y: 0 },
    exit: { scale: 0.8, opacity: 0, y: 50 },
  }

  const modalActionsVariants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 50 },
  }

  return (
    <div className='relative'>
      <motion.div
        className='photo-card'
        onClick={clickToOpenModal}
        whileHover={{ y: -5 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <motion.img
          className='photo-image'
          src={photo.url}
          alt='gallery-photo'
          initial={{ opacity: 0 }}
          animate={{ opacity: imageLoaded ? 1 : 0 }}
          onLoad={() => setImageLoaded(true)}
          transition={{ duration: 0.3 }}
        />
      </motion.div>

      <AnimatePresence mode='wait'>
        {isModalOpen && (
          <motion.div
            className='overlay'
            variants={modalOverlayVariants}
            initial='initial'
            animate='animate'
            exit='exit'
            transition={{ duration: 0.3 }}
            onClick={handleCloseModal}
          >
            <motion.div
              className='modal-actions'
              variants={modalActionsVariants}
              initial='initial'
              animate='animate'
              exit='exit'
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <motion.button
                onClick={handleDeleteClick}
                title='Eliminar'
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaTrash />
              </motion.button>
              <motion.button
                onClick={handleDownload}
                title='Descargar'
                whileHover={{ scale: 1.1, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaDownload />
              </motion.button>
              <motion.button
                onClick={handleCloseModal}
                title='Cerrar'
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaTimes />
              </motion.button>
            </motion.div>

            <motion.div
              className='modal'
              variants={modalContentVariants}
              initial='initial'
              animate='animate'
              exit='exit'
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30,
                delay: 0.1,
              }}
              onClick={e => e.stopPropagation()}
            >
              <motion.img
                className='modal-image'
                src={photo.url}
                alt='modal-photo'
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

Photo.propTypes = {
  photo: PropTypes.object.isRequired,
  deletePhoto: PropTypes.func.isRequired,
  downloadPhoto: PropTypes.func.isRequired,
}

export default Photo
