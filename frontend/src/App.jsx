import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import usePhotos from './hooks/photoController'
import Nav from './components/Nav/Nav'
import Gallery from './components/Gallery/Gallery'
import Profile from './components/Profile/Profile'
import Login from './components/Login/Login'

function App() {
  const { photos, isLoading, downloadCount, uploadPhotos, deletePhoto, downloadPhoto } = usePhotos()

  const [screen, setScreen] = useState('login')
  const [email, setEmail] = useState('tu@correo.com')
  const [density, setDensity] = useState('rejilla')
  const [sort, setSort] = useState('desc')
  const [query, setQuery] = useState('')
  const [album, setAlbum] = useState('Todos')

  const uploadOpenRef = useRef(null)

  const handleEnter = enteredEmail => {
    if (enteredEmail) setEmail(enteredEmail)
    setScreen('gallery')
  }

  const handleLogout = () => {
    setScreen('login')
    setQuery('')
    setAlbum('Todos')
  }

  const handleRequestUpload = () => {
    setScreen('gallery')
    uploadOpenRef.current?.()
  }

  const handleSelectAlbum = albumName => {
    setAlbum(albumName)
    setScreen('gallery')
  }

  if (screen === 'login') {
    return <Login onEnter={handleEnter} />
  }

  return (
    <div className='app-container'>
      <Nav
        screen={screen}
        setScreen={setScreen}
        query={query}
        setQuery={setQuery}
        onRequestUpload={handleRequestUpload}
      />

      <AnimatePresence mode='wait'>
        {screen === 'profile' ? (
          <motion.div
            key='profile'
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <Profile
              photos={photos}
              downloadCount={downloadCount}
              email={email}
              onLogout={handleLogout}
              onSelectAlbum={handleSelectAlbum}
            />
          </motion.div>
        ) : (
          <motion.div
            key='gallery'
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <Gallery
              photos={photos}
              isLoading={isLoading}
              uploadPhotos={uploadPhotos}
              deletePhoto={deletePhoto}
              downloadPhoto={downloadPhoto}
              density={density}
              setDensity={setDensity}
              sort={sort}
              setSort={setSort}
              query={query}
              album={album}
              setAlbum={setAlbum}
              uploadOpenRef={uploadOpenRef}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
