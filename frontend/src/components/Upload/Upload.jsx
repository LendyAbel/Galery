import { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { MdUploadFile, MdCancel, MdCloudUpload } from "react-icons/md"
import { motion, AnimatePresence } from 'framer-motion'
import './upload.css'

const Upload = ({ uploadPhoto }) => {
  const [preview, setPreview] = useState(null)
  const [file, setFile] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef(null)

  //Handle del boton subir
  const handleUploadClick = async () => {
    setIsUploading(true)
    try {
      await uploadPhoto(file)
      setPreview(null)
      setFile('')
    } finally {
      setIsUploading(false)
    }
  }

  //Hnadle boton cancelar
  const handleCancelClick = () => {
    setPreview(null)
    setFile('')
    if (fileInputRef.current) {
      fileInputRef.current.value = null
    }
  }

  //Handles de los elementos
  const handleFile = file => {
    if (!file || !file.type.startsWith('image/')) return
    setPreview(URL.createObjectURL(file))
    setFile(file)
  }

  const handleInputClick = () => {
    fileInputRef.current.click()
    fileInputRef.current.value = null
  }

  const handleDrop = e => {
    e.preventDefault()
    e.stopPropagation()
    const droppedFile = e.dataTransfer.files[0]
    handleFile(droppedFile)
  }

  const handleInputChange = e => {
    const selectedtFile = e.target.files[0]
    handleFile(selectedtFile)
  }

  return (
    <motion.div className='uploader' whileHover={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 300 }}>
      <input type='file' accept='image/*' ref={fileInputRef} onChange={handleInputChange} style={{ display: 'none' }} />

      <AnimatePresence mode='wait'>
        {preview ? (
          <motion.div
            className='preview'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <motion.img
              src={preview}
              alt='Preview'
              className='preview-image'
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
            />
            <motion.p
              className='file-name'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {file.name}
            </motion.p>
            <motion.div
              className='actions-buttons'
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <motion.button
                className='upload-button'
                type='button'
                onClick={handleUploadClick}
                disabled={isUploading}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isUploading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: 'linear' }}
                    >
                      <MdCloudUpload />
                    </motion.div>
                    Subiendo...
                  </>
                ) : (
                  <>
                    <MdUploadFile /> Subir
                  </>
                )}
              </motion.button>
              <motion.button
                className='cancel-button'
                type='button'
                onClick={handleCancelClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <MdCancel /> Cancelar
              </motion.button>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            className='placeholder'
            onDrop={handleDrop}
            onClick={handleInputClick}
            onDragOver={e => e.preventDefault()}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            whileHover={{ y: -5 }}
          >
            <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ delay: 0.1, type: 'spring' }}>
              <MdCloudUpload style={{ fontSize: '3rem', color: '#667eea', marginBottom: '1rem' }} />
            </motion.div>
            <p>Arrastra una imagen aquí o haz clic para seleccionar</p>
            <p className='format'>Formatos aceptados: JPG, PNG, GIF, WebP</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

Upload.propTypes = {
  uploadPhoto: PropTypes.func.isRequired,
}

export default Upload
