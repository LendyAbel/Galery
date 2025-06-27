import { useRef, useState } from 'react'
import { MdUploadFile, MdCancel } from 'react-icons/md'
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

  //Hnadle boton cancelar
  const handleCancelClick = () => {
    setPreview(null)
    setFile('')
    if (fileInputRef.current) {
      fileInputRef.current.value = null
    }
  }

  //Handles de los elementos
  const handleFile = file => {
    if (!file || !file.type.startsWith('image/')) return
    setPreview(URL.createObjectURL(file))
    setFile(file)
  }

  const handleInputClick = () => {
    fileInputRef.current.click()
    fileInputRef.current.value = null
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
          <div className='actions-buttons'>
            <button
              className='upload-button'
              type='button'
              onClick={handleUploadClick}
            >
              <MdUploadFile /> Subir
            </button>
            <button
              className='cancel-button'
              type='button'
              onClick={handleCancelClick}
            >
              <MdCancel /> Cancelar
            </button>
          </div>
        </div>
      ) : (
        <div
          className='placeholder'
          onDrop={handleDrop}
          onClick={handleInputClick}
          onDragOver={e => e.preventDefault()}
        >
          <p>Arrastra una imagen aquí o haz clic para seleccionar</p>
          <p className='format'>Formatos aceptados: JPG, PNG, GIF...</p>
        </div>
      )}
    </div>
  )
}

export default Upload
