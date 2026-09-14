import { useState } from 'react'
import PropTypes from 'prop-types'
import { Download, Trash2 } from 'lucide-react'
import { motion } from 'framer-motion'
import IconButton from './IconButton'
import { formatDate } from '../../utils/photoMeta'

const MOSAIC_SPAN_PATTERN = [2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2]

const Photo = ({ photo, density, index, onOpen, deletePhoto, downloadPhoto }) => {
  const [imageLoaded, setImageLoaded] = useState(false)

  const handleOpen = () => onOpen(photo)

  const handleDelete = e => {
    e.stopPropagation()
    deletePhoto(photo)
  }

  const handleDownload = e => {
    e.stopPropagation()
    downloadPhoto(photo)
  }

  const meta = [formatDate(photo.date), photo.sizeLabel].filter(Boolean).join(' · ')

  if (density === 'lista') {
    return (
      <motion.div
        className='flex items-center cursor-pointer'
        style={{
          gap: 12,
          borderRadius: 999,
          background: 'var(--color-neutral-100)',
          padding: '9px 14px 9px 9px',
          boxShadow: 'var(--shadow-sm)',
          transition: 'background .2s ease',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = 'var(--color-accent-100)' }}
        onMouseLeave={e => { e.currentTarget.style.background = 'var(--color-neutral-100)' }}
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
    )
  }

  if (density === 'rejilla') {
    return (
      <div
        className='relative'
        style={{
          background: 'var(--color-neutral-100)',
          borderRadius: 'var(--radius-lg)',
          padding: 10,
          boxShadow: 'var(--shadow-sm)',
          transition: 'box-shadow .22s ease, transform .22s ease',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.boxShadow = 'var(--shadow-md)'
          e.currentTarget.style.transform = 'translateY(-3px)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.boxShadow = 'var(--shadow-sm)'
          e.currentTarget.style.transform = 'none'
        }}
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
      </div>
    )
  }

  // mosaico
  const span = MOSAIC_SPAN_PATTERN[index % MOSAIC_SPAN_PATTERN.length]
  return (
    <div
      className='relative overflow-hidden cursor-zoom-in'
      style={{
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-sm)',
        background: 'var(--color-neutral-200)',
        gridRow: `span ${span}`,
        transition: 'box-shadow .22s ease, transform .22s ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = 'var(--shadow-lg)'
        e.currentTarget.style.transform = 'translateY(-3px)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = 'var(--shadow-sm)'
        e.currentTarget.style.transform = 'none'
      }}
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
    </div>
  )
}

Photo.propTypes = {
  photo: PropTypes.object.isRequired,
  density: PropTypes.oneOf(['mosaico', 'rejilla', 'lista']).isRequired,
  index: PropTypes.number.isRequired,
  onOpen: PropTypes.func.isRequired,
  deletePhoto: PropTypes.func.isRequired,
  downloadPhoto: PropTypes.func.isRequired,
}

export default Photo
