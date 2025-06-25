import './photo.css'

const Photo = ({ photo }) => {
  return (
    <div className='photo-card'>
      <img className='photo-image' src={photo} alt='uploaded'></img>
    </div>
  )
}

export default Photo
