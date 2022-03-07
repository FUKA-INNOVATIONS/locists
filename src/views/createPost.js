import UploadMedia from '../components/UploadMedia'

const CreatePost = ( { navigation } ) => {

  return (
    <>
      <UploadMedia mediaType={ 'post' } navigation={ navigation } />
    </>
  )
}

export default CreatePost