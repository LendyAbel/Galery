import { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { UploadCloud, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const Upload = ({ uploadPhoto, openRef }) => {
  const [preview, setPreview] = useState(null)
  const [file, setFile] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef(null)

  const handleInputClick = () => {
    fileInputRef.current.click()
    fileInputRef.current.value = null
  }

  useEffect(() => {
    if (openRef) openRef.current = handleInputClick
  }, [openRef])

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

  const handleCancelClick = () => {
    setPreview(null)
    setFile('')
    if (fileInputRef.current) {
      fileInputRef.current.value = null
    }
  }

  const handleFile = file => {
    if (!file || !file.type.startsWith('image/')) return
    setPreview(URL.createObjectURL(file))
    setFile(file)
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
    <div>
      <input type='file' accept='image/*' ref={fileInputRef} onChange={handleInputChange} style={{ display: 'none' }} />

      <AnimatePresence mode='wait'>
        {preview ? (
          <motion.div
            className='flex items-center flex-wrap'
            style={{
              gap: 14,
              padding: '18px 22px',
              borderRadius: 'var(--radius-lg)',
              background: 'var(--color-accent-2-100)',
              border: '2px dashed var(--color-accent-2-400)',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <motion.img
              src={preview}
              alt='Vista previa'
              className='washed'
              style={{ width: 64, height: 64, borderRadius: 'var(--radius-md)', objectFit: 'cover' }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
            />
            <p style={{ flex: 1, minWidth: 120, fontSize: 14, fontWeight: 600, margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {file.name}
            </p>
            <div className='flex items-center gap-2'>
              <motion.button
                type='button'
                className='btn btn-primary'
                onClick={handleUploadClick}
                disabled={isUploading}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {isUploading ? (
                  <>
                    <motion.span
                      style={{ display: 'inline-flex' }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: 'linear' }}
                    >
                      <UploadCloud size={16} strokeWidth={2.75} />
                    </motion.span>
                    Subiendo…
                  </>
                ) : (
                  <>
                    <UploadCloud size={16} strokeWidth={2.75} />
                    Subir
                  </>
                )}
              </motion.button>
              <motion.button
                type='button'
                className='btn btn-secondary'
                onClick={handleCancelClick}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <X size={16} strokeWidth={2.75} />
                Cancelar
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            className='flex items-center cursor-pointer'
            style={{
              gap: 14,
              padding: '18px 22px',
              borderRadius: 'var(--radius-lg)',
              background: 'var(--color-accent-2-100)',
              border: '2px dashed var(--color-accent-2-400)',
              transition: 'background .2s ease',
            }}
            onDrop={handleDrop}
            onClick={handleInputClick}
            onDragOver={e => e.preventDefault()}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'var(--color-accent-2-200)'
              e.currentTarget.style.borderColor = 'var(--color-accent-2-600)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'var(--color-accent-2-100)'
              e.currentTarget.style.borderColor = 'var(--color-accent-2-400)'
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <span
              className='flex items-center justify-center rounded-full shrink-0'
              style={{ width: 44, height: 44, background: 'var(--color-accent-2-600)' }}
            >
              <UploadCloud size={20} strokeWidth={2.75} color='var(--color-bg)' />
            </span>
            <div>
              <p style={{ fontFamily: 'var(--font-heading)', fontSize: 16, margin: 0 }}>Arrastra tus fotos aquí</p>
              <p style={{ fontSize: 13, color: 'var(--color-accent-2-800)', margin: 0 }}>
                JPG, PNG, GIF o WebP · hasta 25 MB por archivo
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

Upload.propTypes = {
  uploadPhoto: PropTypes.func.isRequired,
  openRef: PropTypes.object,
}

export default Upload
