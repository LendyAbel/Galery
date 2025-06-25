import { useRef, useState } from 'react'
import './upload.css'

const Upload = ({ uploadPhoto }) => {
  const [preview, setPreview] = useState(null)
  const [file, setFile] = useState('')
  const fileInputRef = useRef(null)

  //Handle del boton subir
  const handleUploadClick = async () => {
    await uploadPhoto(file)
    setPreview(null)
    setFile('')
  }

  //Handles de los elementos
  const handleFile = file => {
    if (!file || !file.type.startsWith('image/')) return
    setPreview(URL.createObjectURL(file))
    setFile(file)
  }

  const handleInputClick = () => {
    fileInputRef.current.click()
  }

  const handleDrop = e => {
    e.preventDefault()
    e.stopPropagation()
    const droppedFile = e.dataTransfer.files[0]
    handleFile(droppedFile)
  }

  const handleInputChange = e => {
    const selectedtFile = e.target.files[0]
    handleFile(selectedtFile)
  }

  return (
    <div className='uploader'>
      <input
        type='file'
        accept='image/*'
        ref={fileInputRef}
        onChange={handleInputChange}
        style={{ display: 'none' }}
      />
      {preview ? (
        <div className='preview'>
          <img src={preview} alt='Preview' className='preview-image' />
          <p className='file-name'>{file.name}</p>
          <button type='button' onClick={handleUploadClick}>
            Subir
          </button>
        </div>
      ) : (
        <div
          className='placeholder'
          onDrop={handleDrop}
          onClick={handleInputClick}
          onDragOver={e => e.preventDefault()}
        >
          <p>Arrastra una imagen aquí o haz clic para seleccionar</p>
          <p className='formatos'>Formatos aceptados: JPG, PNG, GIF...</p>
        </div>
      )}
    </div>
  )
}

export default Upload
