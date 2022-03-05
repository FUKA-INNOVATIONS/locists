import { Button, Image, Text, View } from 'react-native'
import { useForm } from 'react-hook-form'
import useDevice from '../hooks/useDevice'
import useMedia from '../hooks/useMedia'
import useAuthStorage from '../hooks/useAuthStorage'

const UploadAvatar = props => {
  const { user } = useAuthStorage()

  const {
    image,
    setImage,
    imageSelected,
    setImageSelected,
    type,
    setType,
    pickImage,
  } = useDevice()
  const { loadingMediaUpload } = useMedia()

  const mediaDescription = {
    mediaType: 'avatar',
    owner: user.user_id,
    fileType: type,
  }

  // eslint-disable-next-line
  const { control, handleSubmit, formState: { errors }, setValue } = useForm( {
    defaultValues: {},
  } )

  const reset = () => {
    setImage( 'https://place-hold.it/300x200&text=Choose' )
    setImageSelected( false )
    setType( 'image' )
  }

  return (
    <>
      <Text>Upload profile image</Text>
      <Image source={ { uri: image } }
             style={ { width: 200, height: 200, borderRadius: 100 } } />
      <View>
        <Button title='Choose image' onPress={ pickImage } />
        <Button
          disabled={ !imageSelected }
          loading={ loadingMediaUpload }
          title='Upload'
          onPress={ handleSubmit(
            data => props.onSubmit( data, mediaDescription, imageSelected,
              image ) ) }
        />
        <Button title='Reset form' onPress={ reset } />
      </View>
    </>
  )
}

export default UploadAvatar