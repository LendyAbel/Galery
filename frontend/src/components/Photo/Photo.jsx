import { useState } from 'react'
import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'
import { Download, Trash2, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { formatDate } from '../../utils/photoMeta'

const MOSAIC_SPAN_PATTERN = [2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2]

const IconButton = ({ children, danger, ...props }) => (
  <motion.button
    type='button'
    className='btn btn-icon'
    style={{ background: 'color-mix(in srgb, var(--color-bg) 88%, transparent)' }}
    onMouseEnter={e => {
      e.currentTarget.style.color = danger ? '#9c2f22' : 'var(--color-accent-700)'
    }}
    onMouseLeave={e => {
      e.currentTarget.style.color = ''
    }}
    whileHover={{ scale: 1.08 }}
    whileTap={{ scale: 0.92 }}
    {...props}
  >
    {children}
  </motion.button>
)

const Photo = ({ photo, density, index, deletePhoto, downloadPhoto }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  const handleOpen = () => setIsModalOpen(true)
  const handleClose = () => setIsModalOpen(false)

  const handleDelete = e => {
    e.stopPropagation()
    deletePhoto(photo)
    setIsModalOpen(false)
  }

  const handleDownload = e => {
    e.stopPropagation()
    downloadPhoto(photo)
  }

  const meta = [formatDate(photo.date), photo.sizeLabel].filter(Boolean).join(' · ')

  const ModalContent = () => (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          className='fixed inset-0 flex items-center justify-center'
          style={{
            zIndex: 60,
            padding: 28,
            background: 'color-mix(in srgb, var(--color-accent-900) 82%, transparent)',
            backdropFilter: 'blur(6px)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={handleClose}
        >
          <motion.div
            className='flex flex-col items-center'
            style={{ gap: 14, maxWidth: '92vw' }}
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 260, damping: 26 }}
            onClick={e => e.stopPropagation()}
          >
            <img
              src={photo.url}
              alt={photo.name}
              style={{
                maxHeight: '62vh',
                maxWidth: '100%',
                borderRadius: 'var(--radius-lg)',
                objectFit: 'contain',
                boxShadow: 'var(--shadow-lg)',
              }}
            />

            <div
              className='flex items-center flex-wrap'
              style={{
                gap: 12,
                background: 'var(--color-neutral-100)',
                borderRadius: 999,
                padding: '10px 12px 10px 22px',
                boxShadow: 'var(--shadow-lg)',
              }}
            >
              <div>
                <p style={{ fontFamily: 'var(--font-heading)', fontSize: 16, margin: 0 }}>{photo.name}</p>
                <p style={{ fontSize: 12.5, color: 'var(--color-neutral-700)', margin: 0 }}>
                  {[meta, photo.album].filter(Boolean).join(' · ')}
                </p>
              </div>
              <button type='button' className='btn btn-primary' style={{ padding: '10px 20px' }} onClick={handleDownload}>
                <Download size={16} strokeWidth={2.75} />
                Descargar
              </button>
              <IconButton style={{ width: 40, height: 40 }} danger onClick={handleDelete} title='Eliminar'>
                <Trash2 size={16} strokeWidth={2.75} />
              </IconButton>
              <IconButton style={{ width: 40, height: 40 }} onClick={handleClose} title='Cerrar'>
                <X size={16} strokeWidth={2.75} />
              </IconButton>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  if (density === 'lista') {
    return (
      <>
        <motion.div
          className='flex items-center cursor-pointer'
          style={{
            gap: 12,
            borderRadius: 999,
            background: 'var(--color-neutral-100)',
            padding: '9px 14px 9px 9px',
            boxShadow: 'var(--shadow-sm)',
          }}
          whileHover={{ backgroundColor: 'var(--color-accent-100)' }}
          onClick={handleOpen}
        >
          <img
            src={photo.url}
            alt={photo.name}
            className='washed'
            style={{ width: 54, height: 54, borderRadius: '50%', objectFit: 'cover', cursor: 'zoom-in' }}
          />
          <div className='flex-1' style={{ minWidth: 0 }}>
            <p style={{ fontSize: 14.5, fontWeight: 600, margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {photo.name}
            </p>
            <p style={{ fontSize: 12, color: 'var(--color-neutral-700)', margin: 0 }}>{meta}</p>
          </div>
          <span className='tag tag-accent-2'>{photo.album}</span>
          <div className='flex items-center gap-2'>
            <IconButton style={{ width: 34, height: 34 }} onClick={handleDownload} title='Descargar'>
              <Download size={15} strokeWidth={2.75} />
            </IconButton>
            <IconButton style={{ width: 34, height: 34 }} danger onClick={handleDelete} title='Eliminar'>
              <Trash2 size={15} strokeWidth={2.75} />
            </IconButton>
          </div>
        </motion.div>
        {typeof document !== 'undefined' && createPortal(<ModalContent />, document.body)}
      </>
    )
  }

  if (density === 'rejilla') {
    return (
      <>
        <motion.div
          className='relative'
          style={{
            background: 'var(--color-neutral-100)',
            borderRadius: 'var(--radius-lg)',
            padding: 10,
            boxShadow: 'var(--shadow-sm)',
          }}
          whileHover={{ y: -3, boxShadow: 'var(--shadow-md)' }}
        >
          <div
            className='relative cursor-zoom-in'
            style={{ aspectRatio: 1, borderRadius: 'calc(var(--radius-lg) - 8px)', overflow: 'hidden' }}
            onClick={handleOpen}
          >
            <motion.img
              src={photo.url}
              alt={photo.name}
              className='washed'
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: imageLoaded ? 1 : 0 }}
              onLoad={() => setImageLoaded(true)}
              transition={{ duration: 0.3 }}
            />
            <span
              className='tag tag-accent absolute'
              style={{ left: 10, top: 10, background: 'color-mix(in srgb, var(--color-bg) 90%, transparent)', color: 'var(--color-accent-800)' }}
            >
              {photo.album}
            </span>
          </div>
          <div className='flex items-center' style={{ marginTop: 8, gap: 8 }}>
            <div className='flex-1' style={{ minWidth: 0 }}>
              <p style={{ fontSize: 13.5, fontWeight: 600, margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {photo.name}
              </p>
              <p style={{ fontSize: 11.5, color: 'var(--color-neutral-700)', margin: 0 }}>{meta}</p>
            </div>
            <IconButton style={{ width: 32, height: 32 }} onClick={handleDownload} title='Descargar'>
              <Download size={14} strokeWidth={2.75} />
            </IconButton>
            <IconButton style={{ width: 32, height: 32 }} danger onClick={handleDelete} title='Eliminar'>
              <Trash2 size={14} strokeWidth={2.75} />
            </IconButton>
          </div>
        </motion.div>
        {typeof document !== 'undefined' && createPortal(<ModalContent />, document.body)}
      </>
    )
  }

  // mosaico
  const span = MOSAIC_SPAN_PATTERN[index % MOSAIC_SPAN_PATTERN.length]
  return (
    <>
      <motion.div
        className='relative overflow-hidden cursor-zoom-in'
        style={{
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-sm)',
          background: 'var(--color-neutral-200)',
          gridRow: `span ${span}`,
        }}
        whileHover={{ y: -3, boxShadow: 'var(--shadow-lg)' }}
        onClick={handleOpen}
      >
        <motion.img
          src={photo.url}
          alt={photo.name}
          className='washed'
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: imageLoaded ? 1 : 0 }}
          onLoad={() => setImageLoaded(true)}
          transition={{ duration: 0.3 }}
        />
        <div
          className='absolute inset-x-0 bottom-0'
          style={{
            background: 'linear-gradient(transparent, color-mix(in srgb, var(--color-accent-900) 72%, transparent))',
            padding: '26px 14px 12px',
            pointerEvents: 'none',
          }}
        >
          <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-neutral-100)', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {photo.name}
          </p>
          <p style={{ fontSize: 11, color: 'var(--color-accent-200)', margin: 0 }}>{formatDate(photo.date)}</p>
        </div>
        <div className='absolute flex gap-2' style={{ top: 10, right: 10 }}>
          <IconButton style={{ width: 34, height: 34 }} onClick={handleDownload} title='Descargar'>
            <Download size={15} strokeWidth={2.75} />
          </IconButton>
          <IconButton style={{ width: 34, height: 34 }} danger onClick={handleDelete} title='Eliminar'>
            <Trash2 size={15} strokeWidth={2.75} />
          </IconButton>
        </div>
      </motion.div>
      {typeof document !== 'undefined' && createPortal(<ModalContent />, document.body)}
    </>
  )
}

Photo.propTypes = {
  photo: PropTypes.object.isRequired,
  density: PropTypes.oneOf(['mosaico', 'rejilla', 'lista']).isRequired,
  index: PropTypes.number.isRequired,
  deletePhoto: PropTypes.func.isRequired,
  downloadPhoto: PropTypes.func.isRequired,
}

export default Photo
