import React from 'react'
import { Image, Text, View, TouchableOpacity } from 'react-native'
import { useForm } from 'react-hook-form'
import useDevice from '../hooks/useDevice'
import useMedia from '../hooks/useMedia'
import useAuthStorage from '../hooks/useAuthStorage'
import theme from '../theme'
import PropTypes from 'prop-types'

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
      <TouchableOpacity onPress={ pickImage }>
      <Image source={ { uri: image } } style={ theme.changePicture } />
      </TouchableOpacity>

      <View style={ { padding: 30 } }>
        <TouchableOpacity style={ theme.generalBtn } onPress={ reset }>
          <Text style={ theme.loginButtonText }>Reset</Text>
        </TouchableOpacity>
        <TouchableOpacity style={ {...theme.generalBtn, marginTop: 10} }
                          disabled={ !imageSelected }
                          loading={ loadingMediaUpload }
                          onPress={ handleSubmit(
                            data => props.onSubmit( data, mediaDescription,
                              imageSelected,
                              image, type ) ) }>
          <Text style={ theme.loginButtonText }>Upload</Text>
        </TouchableOpacity>
      </View>
    </>
  )
}

UploadAvatar.propTypes = {
  onSubmit: PropTypes.func
}


export default UploadAvatar