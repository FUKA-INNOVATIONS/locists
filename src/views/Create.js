import { Button } from 'react-native';

const Create = ( { navigation } ) => {

  const createEventHandler = () => {
    navigation.navigate('CreateEvent')
  }

  const createPostHandler = () => {
    navigation.navigate('CreatePost')
  }

  return (
      <>
        <Button title={'Create new event'} onPress={createEventHandler}/>
        <Button title={'Create new post'} onPress={createPostHandler}/>
      </>
  )
};

export default Create;