import { Alert, View, Text } from 'react-native'
import useMedia from '../hooks/useMedia'

import useAuthStorage from '../hooks/useAuthStorage'
import useTag from '../hooks/useTag'
import UploadAvatar from './UploadAvatar'
import UploadEvent from './uploadEvent'
import { postTag, eventTag, appId } from '../../config'
import UploadPost from './uploadPost'
import { useState } from 'react'

const UploadMedia = ( { mediaType, navigation } ) => {
  const { user } = useAuthStorage()
  const authStorage = useAuthStorage()
  const { createTag } = useTag()
  const { uploadMedia } = useMedia()
  const [ loading, setLoading ] = useState( false ) // eslint-disable-line

  /* useFocusEffect(
   useCallback( () => {
   return () => reset();
   }, [] ),
   ); */

  const onSubmit = async (
    data, mediaDescription, imageSelected, image, type ) => {
    console.log( 'TYPE', type )
    const token = await authStorage.getToken()

    mediaDescription = JSON.stringify( mediaDescription )

    if ( !imageSelected ) {
      Alert.alert( 'Please, select a file' )
      return
    }
    // TODO: Handle too big image case

    const formData = new FormData()  // eslint-disable-line
    data.location &&
    formData.append( 'title', `${ appId } ${ data.location }` )
    formData.append( 'description', mediaDescription )
    const filename = image.split( '/' ).pop()
    let fileExtension = filename.split( '.' ).pop()
    fileExtension = fileExtension === 'jpg' ? 'jpeg' : fileExtension
    formData.append( 'file', {
      uri: image,
      name: filename,
      type: type + '/' + fileExtension,
    } )

    // Upload media
    const fileResponse = await uploadMedia( formData, token )

    // Create new tag and associate it with uploaded media

    let tag = ''
    switch ( mediaType ) {
      case 'avatar':
        tag = `avatar_${ user.user_id }`
        break
      case 'event':
        tag = eventTag
        break
      case 'post':
        tag = postTag
    }

    const tagResponse = await createTag(
      {
        file_id: fileResponse.file_id,
        tag,
      },
      token,
    )
    console.log( 'new tag res in onSubmit', tagResponse )
    console.log( 'upload res in onSubmit', fileResponse )

    /*
     * Upload succeeded, close modal
     * */

    if ( fileResponse && tagResponse ) {
      // TODO: close modal:
      // Alert.alert(`${mediaType.toUpperCase()} uploaded!`)
      navigation.goBack()
    }

    if ( !fileResponse || !tagResponse ) {
      Alert.alert( 'Sorry',
        `Something went wrong and ${ mediaType } creation failed\n please check media file size!` )
    }

  }

  if ( loading ) {
    return (
      <View><Text>Loading..</Text></View>
    )
  }

  switch ( mediaType ) {
    case 'avatar':
      return <UploadAvatar onSubmit={ onSubmit } />

    case 'event':
      return <UploadEvent onSubmit={ onSubmit } />
    default:
      return <UploadPost onSubmit={ onSubmit } />
  }
}

export default UploadMedia