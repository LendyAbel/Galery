const {S3ServiceException}= require('@aws-sdk/client-s3')

const awsErrorHandler = (error, request, response, next) => {
  if (error instanceof S3ServiceException && error.name === 'NoSuchBucket') {
    return response.status(404).json({ error: 'Bucket does not exist' })
  }  
  if (error instanceof S3ServiceException) {
    return response.status(500).json({ error: `S3 error: ${error.name}` })
  } 
  
  console.error(error)
  response.status(500).json({ error: 'Unexpected error occurred' })
}

module.exports = { awsErrorHandler }
