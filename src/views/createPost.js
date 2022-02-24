import UploadMedia from '../components/UploadMedia';
import { Button } from 'react-native';

const CreatePost = ( { navigation } ) => {
  const onModalCloseHandler = () => {
    navigation.goBack();
  };

  return (
      <>
        <Button title={'Close'} onPress={onModalCloseHandler} />
        <UploadMedia mediaType={ 'post' }/>
      </>
  );
};

export default CreatePost;