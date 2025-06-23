import './photo.css'

const Photo = ({ photo }) => {
  return (
    <div>
      <img className='photo' src={photo}></img>
    </div>
  )
}

export default Photo
