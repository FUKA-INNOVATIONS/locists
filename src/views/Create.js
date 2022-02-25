import { Button } from 'react-native';

const Create = ( { navigation } ) => {

  /*
  * Open Create new event modal
  * */
  const createEventHandler = () => {
    navigation.navigate('CreateEvent')
  }

  /*
   * Open Create new post modal
   * */
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