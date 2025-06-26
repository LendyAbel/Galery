import usePhotos from './hooks/photoController'
import Gallery from './components/Gallery/Gallery'
import Upload from './components/Upload/Upload'

function App() {
  const { photos, uploadPhotos, deletePhoto } = usePhotos()

  return (
    <div>
      <Gallery photos={photos} deletePhoto={deletePhoto} />
      <Upload uploadPhoto={uploadPhotos} />
    </div>
  )
}

export default App
