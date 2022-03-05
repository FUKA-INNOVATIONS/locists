import UploadMedia from '../components/UploadMedia'
import { Button } from 'react-native'

const CreateEvent = ( { navigation } ) => {
  const onModalCloseHandler = () => {
    navigation.goBack()
  }
  return (
    <>
      <Button title={ 'Close' } onPress={ onModalCloseHandler } />
      <UploadMedia mediaType={ 'event' } navigation={ navigation } />
    </>
  )
}

export default CreateEvent