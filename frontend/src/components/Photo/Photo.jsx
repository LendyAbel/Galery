import './photo.css'

const Photo = ({ photo, deletePhoto }) => {
  const handleDeleteClick = ()=>{
    deletePhoto(photo)
  }
  return (
    <div className='photo-card'>
      <img className='photo-image' src={photo.url} alt='uploaded'></img>
      <div className='delete-button' onClick={handleDeleteClick}>
        <img
          src='/images/icons8-eliminar-50.png'
          alt='delete'
          className='delete-icon'
        />
      </div>
    </div>
  )
}

export default Photo
