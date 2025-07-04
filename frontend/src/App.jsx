import usePhotos from './hooks/photoController'
import Gallery from './components/Gallery/Gallery'
import Upload from './components/Upload/Upload'

function App() {
  const { photos, uploadPhotos, deletePhoto, downloadPhoto } = usePhotos()

  return (
    <div>
      <Upload uploadPhoto={uploadPhotos} />
      <Gallery photos={photos} deletePhoto={deletePhoto} downloadPhoto={downloadPhoto} />
    </div>
  )
}

export default App
