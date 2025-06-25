import './photo.css'

const Photo = ({ photo }) => {
  return (
    <div className='photo-card'>
      <img className='photo-image' src={photo} alt='uploaded'></img>
      <div className='delete-button'>
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
