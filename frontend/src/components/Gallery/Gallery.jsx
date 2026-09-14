import { useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'
import Photo from '../Photo/Photo'
import PhotoViewer from '../Photo/PhotoViewer'
import Toolbar from '../Toolbar/Toolbar'
import Upload from '../Upload/Upload'
import YearSection from '../YearSection/YearSection'
import EmptyState from '../EmptyState/EmptyState'
import GallerySkeleton from '../Skeleton/GallerySkeleton'
import { decoratePhoto } from '../../utils/photoMeta'

const DENSITY_GRID = {
  mosaico: { gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))', gridAutoRows: 150, gap: 16 },
  rejilla: { gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: 18 },
}

const Gallery = ({
  photos,
  isLoading,
  uploadPhotos,
  deletePhoto,
  downloadPhoto,
  density,
  setDensity,
  sort,
  setSort,
  query,
  album,
  setAlbum,
  uploadOpenRef,
}) => {
  const [openPhoto, setOpenPhoto] = useState(null)

  const decorated = useMemo(() => photos.map(decoratePhoto), [photos])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return decorated.filter(photo => {
      const matchesQuery = !q || photo.name.toLowerCase().includes(q) || photo.album.toLowerCase().includes(q)
      const matchesAlbum = album === 'Todos' || photo.album === album
      return matchesQuery && matchesAlbum
    })
  }, [decorated, query, album])

  const sorted = useMemo(() => {
    const list = [...filtered]
    list.sort((a, b) => {
      const ta = a.date ? a.date.getTime() : 0
      const tb = b.date ? b.date.getTime() : 0
      return sort === 'desc' ? tb - ta : ta - tb
    })
    return list
  }, [filtered, sort])

  const groups = useMemo(() => {
    const map = new Map()
    sorted.forEach(photo => {
      const key = photo.year ?? 'Sin fecha'
      if (!map.has(key)) map.set(key, [])
      map.get(key).push(photo)
    })
    return Array.from(map.entries())
  }, [sorted])

  const handleResetFilters = () => {
    setAlbum('Todos')
  }

  const handleDelete = photo => {
    deletePhoto(photo)
    setOpenPhoto(current => (current && current.name === photo.name ? null : current))
  }

  return (
    <div className='mx-auto' style={{ maxWidth: 1180, padding: '30px 22px' }}>
      <div className='flex items-start justify-between flex-wrap gap-4' style={{ marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 'clamp(30px, 4.5vw, 44px)', margin: 0 }}>Mis recuerdos</h1>
          <p style={{ fontSize: 15, color: 'var(--color-neutral-700)', margin: 0 }}>
            {filtered.length} foto{filtered.length === 1 ? '' : 's'}
            {album === 'Todos' ? ' en total' : ` en ${album}`}
          </p>
        </div>
        <Toolbar sort={sort} setSort={setSort} density={density} setDensity={setDensity} album={album} setAlbum={setAlbum} />
      </div>

      <div style={{ marginBottom: 28 }}>
        <Upload uploadPhoto={uploadPhotos} openRef={uploadOpenRef} />
      </div>

      {isLoading ? (
        <GallerySkeleton />
      ) : filtered.length === 0 ? (
        <EmptyState onReset={handleResetFilters} />
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
          {groups.map(([year, groupPhotos]) => (
            <YearSection key={year} year={year} count={groupPhotos.length}>
              {density === 'lista' ? (
                <div className='flex flex-col' style={{ gap: 8 }}>
                  {groupPhotos.map((photo, index) => (
                    <Photo
                      key={photo.name}
                      photo={photo}
                      density={density}
                      index={index}
                      onOpen={setOpenPhoto}
                      deletePhoto={handleDelete}
                      downloadPhoto={downloadPhoto}
                    />
                  ))}
                </div>
              ) : (
                <div className='grid' style={DENSITY_GRID[density]}>
                  {groupPhotos.map((photo, index) => (
                    <Photo
                      key={photo.name}
                      photo={photo}
                      density={density}
                      index={index}
                      onOpen={setOpenPhoto}
                      deletePhoto={handleDelete}
                      downloadPhoto={downloadPhoto}
                    />
                  ))}
                </div>
              )}
            </YearSection>
          ))}
        </motion.div>
      )}

      <PhotoViewer
        photo={openPhoto}
        onClose={() => setOpenPhoto(null)}
        deletePhoto={handleDelete}
        downloadPhoto={downloadPhoto}
      />
    </div>
  )
}

Gallery.propTypes = {
  photos: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  uploadPhotos: PropTypes.func.isRequired,
  deletePhoto: PropTypes.func.isRequired,
  downloadPhoto: PropTypes.func.isRequired,
  density: PropTypes.string.isRequired,
  setDensity: PropTypes.func.isRequired,
  sort: PropTypes.string.isRequired,
  setSort: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
  album: PropTypes.string.isRequired,
  setAlbum: PropTypes.func.isRequired,
  uploadOpenRef: PropTypes.object.isRequired,
}

export default Gallery
