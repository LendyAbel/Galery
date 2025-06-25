import './photo.css'

const Photo = ({ photoUrl }) => {
  return (
    <div className='photo-card'>
      <img className='photo-image' src={photoUrl} alt='uploaded'></img>
    </div>
  )
}

export default Photo
