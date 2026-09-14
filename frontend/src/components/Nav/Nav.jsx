import PropTypes from 'prop-types'
import { Images, Search, Upload, UserRound } from 'lucide-react'
import { motion } from 'framer-motion'

const Nav = ({ screen, setScreen, query, setQuery, onRequestUpload }) => {
  return (
    <motion.nav
      className='nav sticky top-0 z-20 flex-wrap'
      style={{
        background: 'color-mix(in srgb, var(--color-bg) 88%, transparent)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid var(--color-divider)',
      }}
      initial={{ y: -20 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <button
        type='button'
        className='nav-brand flex items-center gap-2 cursor-pointer bg-transparent border-0'
        onClick={() => setScreen('gallery')}
      >
        <span
          className='flex items-center justify-center rounded-full'
          style={{ width: 30, height: 30, background: 'var(--color-accent)' }}
        >
          <Images size={16} strokeWidth={2.75} color='var(--color-bg)' />
        </span>
        Galería
      </button>

      <div className='relative flex-1' style={{ minWidth: 160, maxWidth: 380 }}>
        <Search
          size={16}
          strokeWidth={2.75}
          className='absolute top-1/2 -translate-y-1/2'
          style={{ left: 14, color: 'var(--color-neutral-600)' }}
        />
        <input
          type='text'
          className='input w-full'
          style={{ paddingLeft: 38 }}
          placeholder='Buscar por nombre o álbum'
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
      </div>

      <div className='flex items-center gap-2'>
        <button
          type='button'
          className='btn btn-ghost'
          style={screen === 'gallery' ? { color: 'var(--color-accent)' } : undefined}
          onClick={() => setScreen('gallery')}
        >
          Fotos
        </button>
        <button
          type='button'
          className='btn btn-ghost'
          style={screen === 'profile' ? { color: 'var(--color-accent)' } : undefined}
          onClick={() => setScreen('profile')}
        >
          <UserRound size={16} strokeWidth={2.75} />
          Perfil
        </button>
        <button
          type='button'
          className='btn btn-primary'
          style={{ padding: '9px 18px' }}
          onClick={onRequestUpload}
        >
          <Upload size={16} strokeWidth={2.75} />
          Subir
        </button>
      </div>
    </motion.nav>
  )
}

Nav.propTypes = {
  screen: PropTypes.string.isRequired,
  setScreen: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
  setQuery: PropTypes.func.isRequired,
  onRequestUpload: PropTypes.func.isRequired,
}

export default Nav
