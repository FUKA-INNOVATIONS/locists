import UploadMedia from '../components/UploadMedia'

const CreateEvent = ( { navigation } ) => {
  return (
    <>
      <UploadMedia mediaType={ 'event' } navigation={ navigation } />
    </>
  )
}

export default CreateEvent