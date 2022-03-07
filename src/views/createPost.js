import UploadMedia from '../components/UploadMedia'
import PropTypes from 'prop-types';

const CreatePost = ( { navigation } ) => {

  return (
    <>
      <UploadMedia mediaType={ 'post' } navigation={ navigation } />
    </>
  )
}

CreatePost.propTypes = {
  navigation: PropTypes.object,
};
export default CreatePost
