import PropTypes from 'prop-types'
import { ArrowDown, LayoutGrid, List, Grip } from 'lucide-react'
import { ALBUM_NAMES } from '../../utils/photoMeta'

const DENSITIES = [
  { id: 'mosaico', label: 'Mosaico', icon: Grip },
  { id: 'rejilla', label: 'Rejilla', icon: LayoutGrid },
  { id: 'lista', label: 'Lista', icon: List },
]

const Toolbar = ({ sort, setSort, density, setDensity, album, setAlbum }) => {
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex items-center gap-3 flex-wrap justify-end'>
        <button
          type='button'
          className='btn btn-secondary'
          onClick={() => setSort(sort === 'desc' ? 'asc' : 'desc')}
        >
          <ArrowDown
            size={16}
            strokeWidth={2.75}
            style={{ transform: sort === 'asc' ? 'rotate(180deg)' : 'none', transition: 'transform .25s ease' }}
          />
          {sort === 'desc' ? 'Más recientes' : 'Más antiguas'}
        </button>

        <span style={{ width: 1, height: 22, background: 'var(--color-divider)' }} />

        <div className='flex items-center gap-1'>
          {DENSITIES.map(item => (
            <button
              key={item.id}
              type='button'
              className={`btn ${density === item.id ? 'btn-primary' : 'btn-ghost'}`}
              style={{ padding: '8px 16px' }}
              onClick={() => setDensity(item.id)}
            >
              <item.icon size={16} strokeWidth={2.75} />
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className='flex items-center gap-2 flex-wrap'>
        {['Todos', ...ALBUM_NAMES].map(name => (
          <button
            key={name}
            type='button'
            className={`tag ${album === name ? 'tag-accent' : 'tag-outline'} cursor-pointer border-0`}
            style={{ padding: '7px 16px', fontSize: 13, fontFamily: 'var(--font-body)', border: album === name ? 'none' : '1px solid var(--color-divider)' }}
            onClick={() => setAlbum(name)}
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  )
}

Toolbar.propTypes = {
  sort: PropTypes.string.isRequired,
  setSort: PropTypes.func.isRequired,
  density: PropTypes.string.isRequired,
  setDensity: PropTypes.func.isRequired,
  album: PropTypes.string.isRequired,
  setAlbum: PropTypes.func.isRequired,
}

export default Toolbar
