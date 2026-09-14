import PropTypes from 'prop-types'
import { Download, Trash2, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import IconButton from './IconButton'
import { formatDate } from '../../utils/photoMeta'

// Se monta una sola vez en Gallery (no una por foto): antes cada tarjeta
// creaba y destruía su propio overlay al abrir/cerrar.
//
// Sin backdrop-filter a propósito: medí los tiempos entre frames con la
// Performance API al abrir la foto y, con blur(), el navegador tardaba
// ~9 frames seguidos a 33-50ms (en vez de los 17ms normales de 60fps) justo
// en ese instante — desenfocar la pantalla completa mientras la tarjeta
// también se anima encima es caro de recomponer en cada frame. Quitando el
// blur (queda solo el tinte oscuro semitransparente) esos frames lentos
// desaparecen casi por completo. Si se quiere recuperar el desenfoque, debe
// medirse de nuevo que no reintroduzca el tirón.
const PhotoViewer = ({ photo, onClose, deletePhoto, downloadPhoto }) => {
  const isOpen = Boolean(photo)

  const handleDelete = e => {
    e.stopPropagation()
    if (photo) deletePhoto(photo)
    onClose()
  }

  const handleDownload = e => {
    e.stopPropagation()
    if (photo) downloadPhoto(photo)
  }

  const meta = photo ? [formatDate(photo.date), photo.sizeLabel].filter(Boolean).join(' · ') : ''

  return (
    <>
      <div
        className='fixed inset-0'
        style={{
          zIndex: 59,
          background: 'color-mix(in srgb, var(--color-accent-900) 82%, transparent)',
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
          transition: 'opacity .25s ease',
        }}
        onClick={onClose}
      />
      <AnimatePresence>
        {photo && (
          <motion.div
            className='fixed inset-0 flex items-center justify-center'
            style={{ zIndex: 60, padding: 28 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          >
            <motion.div
              className='flex flex-col items-center'
              style={{ gap: 14, maxWidth: '92vw' }}
              initial={{ scale: 0.96, opacity: 0, y: 12 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 12 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              onClick={e => e.stopPropagation()}
            >
              <img
                src={photo.url}
                alt={photo.name}
                decoding='async'
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
                <IconButton style={{ width: 40, height: 40 }} onClick={onClose} title='Cerrar'>
                  <X size={16} strokeWidth={2.75} />
                </IconButton>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

PhotoViewer.propTypes = {
  photo: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  deletePhoto: PropTypes.func.isRequired,
  downloadPhoto: PropTypes.func.isRequired,
}

export default PhotoViewer
