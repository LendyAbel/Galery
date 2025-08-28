import usePhotos from './hooks/photoController'
import Gallery from './components/Gallery/Gallery'
import Upload from './components/Upload/Upload'
import { motion } from 'framer-motion'

function App() {
  const { photos, uploadPhotos, deletePhoto, downloadPhoto } = usePhotos()

  return (
    <motion.div
      className='app-container'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.header
        className='app-header'
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h1>📸 Mi Galería Personal</h1>
        <p>Sube, organiza y disfruta tus mejores momentos</p>
      </motion.header>

      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Upload uploadPhoto={uploadPhotos} />
      </motion.div>

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <Gallery photos={photos} deletePhoto={deletePhoto} downloadPhoto={downloadPhoto} />
      </motion.div>
    </motion.div>
  )
}

export default App
