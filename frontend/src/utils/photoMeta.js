const ALBUMS = ['Familia', 'Viajes', 'Casa', 'Ciudad']

// El backend aún no asocia fotos a álbumes reales; se deriva uno estable
// a partir del nombre para que los filtros/etiquetas del diseño funcionen.
export const albumFor = name => {
  let hash = 0
  for (let i = 0; i < (name || '').length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) >>> 0
  }
  return ALBUMS[hash % ALBUMS.length]
}

export const ALBUM_NAMES = ALBUMS

export const parseUploadDate = photo => {
  if (photo.date) {
    const d = new Date(photo.date)
    if (!Number.isNaN(d.getTime())) return d
  }
  const match = /^(\d{10,})_/.exec(photo.name || '')
  if (match) return new Date(Number(match[1]))
  return null
}

export const formatDate = date =>
  date
    ? date.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })
    : 'Sin fecha'

export const formatSize = bytes => {
  if (bytes === null || bytes === undefined || Number.isNaN(bytes)) return null
  if (bytes < 1024) return `${bytes} B`
  const units = ['KB', 'MB', 'GB']
  let value = bytes
  let unit = -1
  do {
    value /= 1024
    unit++
  } while (value >= 1024 && unit < units.length - 1)
  return `${value.toFixed(value < 10 ? 1 : 0)} ${units[unit]}`
}

export const decoratePhoto = photo => {
  const date = parseUploadDate(photo)
  return {
    ...photo,
    date,
    year: date ? date.getFullYear() : null,
    sizeLabel: formatSize(photo.size),
    album: photo.album || albumFor(photo.name),
  }
}
