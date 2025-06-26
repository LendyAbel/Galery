import { useState } from 'react'
import Modal from 'react-modal'
import { FaTrash, FaDownload, FaTimes } from 'react-icons/fa'
import './photo.css'

Modal.setAppElement('#root')

const Photo = ({ photo, deletePhoto }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const clickToOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleDeleteClick = () => {
    deletePhoto(photo)
    setIsModalOpen(false)
  }

  const handleDownload = () => {}

  return (
    <>
      <div className='photo-card' onClick={clickToOpenModal}>
        <img className='photo-image' src={photo.url} alt='gallery-photo'></img>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className='modal'
        overlayClassName='overlay'
      >
        <img className='modal-image' src={photo.url} alt='modal-photo' />
        <div className='modal-actions'>
          <button onClick={handleDeleteClick} title='Eliminar'>
            <FaTrash />
          </button>
          <button onClick={handleDownload} title='Descargar'>
            <FaDownload />
          </button>
          <button onClick={() => setIsModalOpen(false)} title='Cerrar'>
            <FaTimes />
          </button>
        </div>
      </Modal>
    </>
  )
}

export default Photo
