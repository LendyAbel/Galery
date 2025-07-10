import { useState } from 'react'
import PropTypes from 'prop-types'

import { FaTrash, FaDownload, FaTimes } from 'react-icons/fa'

import { AnimatePresence, motion } from 'framer-motion'

import './photo.css'

const Photo = ({ photo, deletePhoto, downloadPhoto }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const clickToOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleDeleteClick = () => {
    deletePhoto(photo)
    setIsModalOpen(false)
  }

  const handleDownload = () => {
    downloadPhoto(photo)
  }

  const modalOverlayVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.3 },
  }

  const modalContentVariants = {
    initial: { scale: 0.95, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.95, opacity: 0 },
    transition: { duration: 0.3 },
  }

  return (
    <div className='relative'>
      <div className='photo-card' onClick={clickToOpenModal}>
        <img className='photo-image' src={photo.url} alt='gallery-photo'></img>
      </div>
      <AnimatePresence mode='wait'>
        {isModalOpen && (
          <motion.div
            className='overlay'
            {...modalOverlayVariants}
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div className='modal-actions' {...modalContentVariants}>
              <button onClick={handleDeleteClick} title='Eliminar'>
                <FaTrash />
              </button>
              <button onClick={handleDownload} title='Descargar'>
                <FaDownload />
              </button>
              <button onClick={() => setIsModalOpen(false)} title='Cerrar'>
                <FaTimes />
              </button>
            </motion.div>
            <motion.div
              className='modal'
              {...modalContentVariants}
              onClick={e => e.stopPropagation()}
            >
              <img className='modal-image' src={photo.url} alt='modal-photo' />
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
