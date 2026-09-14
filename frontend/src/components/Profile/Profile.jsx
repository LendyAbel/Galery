import { useMemo } from 'react'
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'
import { decoratePhoto, formatSize } from '../../utils/photoMeta'

const QUOTA_BYTES = 5 * 1024 * 1024 * 1024 // 5 GB, espacio asignado a la demo

const Profile = ({ photos, downloadCount, email, onLogout, onSelectAlbum }) => {
  const decorated = useMemo(() => photos.map(decoratePhoto), [photos])

  const albums = useMemo(() => {
    const map = new Map()
    decorated.forEach(photo => {
      if (!map.has(photo.album)) map.set(photo.album, { cover: photo.url, count: 0 })
      map.get(photo.album).count += 1
    })
    return Array.from(map.entries())
  }, [decorated])

  const usedBytes = useMemo(() => photos.reduce((sum, p) => sum + (p.size || 0), 0), [photos])
  const usedRatio = Math.min(1, usedBytes / QUOTA_BYTES)
  const initial = (email || '?').trim().charAt(0).toUpperCase()

  return (
    <motion.div
      className='mx-auto'
      style={{ maxWidth: 900, padding: '38px 22px' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className='flex items-center flex-wrap gap-4' style={{ marginBottom: 28 }}>
        <span
          className='flex items-center justify-center rounded-full'
          style={{ width: 96, height: 96, background: 'var(--color-accent-300)', color: 'var(--color-accent-900)', fontFamily: 'var(--font-heading)', fontSize: 36 }}
        >
          {initial}
        </span>
        <div>
          <h1 style={{ fontSize: 38, margin: 0 }}>Tu perfil</h1>
          <p style={{ color: 'var(--color-neutral-700)', margin: 0 }}>
            {email} · miembro desde {new Date().getFullYear()}
          </p>
        </div>
        <button
          type='button'
          className='btn btn-secondary'
          style={{ marginLeft: 'auto', whiteSpace: 'nowrap' }}
          onClick={onLogout}
        >
          Cerrar sesión
        </button>
      </div>

      <div className='grid' style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 16 }}>
        <div className='card'>
          <span className='card-kicker'>Fotos</span>
          <span style={{ fontFamily: 'var(--font-heading)', fontSize: 34 }}>{photos.length}</span>
        </div>
        <div className='card'>
          <span className='card-kicker'>Álbumes</span>
          <span style={{ fontFamily: 'var(--font-heading)', fontSize: 34 }}>{albums.length}</span>
        </div>
        <div className='card'>
          <span className='card-kicker'>Descargas</span>
          <span style={{ fontFamily: 'var(--font-heading)', fontSize: 34 }}>{downloadCount}</span>
        </div>
      </div>

      <div className='card' style={{ marginBottom: 28 }}>
        <span className='card-kicker'>Espacio usado</span>
        <p style={{ margin: 0 }}>
          {formatSize(usedBytes) || '0 B'} de {formatSize(QUOTA_BYTES)}
        </p>
        <div style={{ height: 12, borderRadius: 999, background: 'var(--color-neutral-200)', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${usedRatio * 100}%`, background: 'var(--color-accent-2-500)' }} />
        </div>
      </div>

      <h2 style={{ fontSize: 26, marginBottom: 16 }}>Tus álbumes</h2>
      <div className='grid' style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
        {albums.map(([name, { cover, count }]) => (
          <motion.button
            key={name}
            type='button'
            className='text-left cursor-pointer border-0'
            style={{ background: 'var(--color-neutral-100)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}
            whileHover={{ boxShadow: 'var(--shadow-md)' }}
            onClick={() => onSelectAlbum(name)}
          >
            <img src={cover} alt={name} className='washed' style={{ width: '100%', height: 120, objectFit: 'cover' }} />
            <div style={{ padding: '10px 12px' }}>
              <p style={{ fontFamily: 'var(--font-heading)', fontSize: 16, margin: 0 }}>{name}</p>
              <p style={{ fontSize: 12.5, color: 'var(--color-neutral-700)', margin: 0 }}>
                {count} foto{count === 1 ? '' : 's'}
              </p>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}

Profile.propTypes = {
  photos: PropTypes.array.isRequired,
  downloadCount: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
  onLogout: PropTypes.func.isRequired,
  onSelectAlbum: PropTypes.func.isRequired,
}

export default Profile
