import { Alert } from 'react-native'
import useMedia from '../hooks/useMedia'

import useAuthStorage from '../hooks/useAuthStorage'
import useTag from '../hooks/useTag'
import UploadAvatar from './UploadAvatar'
import UploadEvent from './uploadEvent'
import { postTag, eventTag, appId } from '../../config'
import UploadPost from './uploadPost'
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Loading from './Loading'
import fetchAvatar from '../utils/fetchAvatar'

const UploadMedia = ( { mediaType, navigation } ) => {
  const { user } = useAuthStorage()
  const authStorage = useAuthStorage()
  const { createTag } = useTag()
  const { uploadMedia } = useMedia()
  const [ loading, setLoading ] = useState( false ) // eslint-disable-line

  const onSubmit = async (  // Handles uploading features for multiple cases: Post, Event, Avatar
    data, mediaDescription, imageSelected, image, type ) => {
    setLoading( true )
    const token = await authStorage.getToken()
    mediaDescription = JSON.stringify( mediaDescription ) // API workaround, Helper Object that will be saved in media description filed as json string

    if ( !imageSelected ) { // User did not choose media
      Alert.alert( 'Please, select a file' )
      setLoading( false )
      return
    }

    const formData = new FormData()
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

    const fileResponse = await uploadMedia( formData, token ) // Upload media

    let tag = ''  // Create new tag and associate it with uploaded media
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

    const tagResponse = await createTag(  // Create new tag and associate it with uploaded media
      {
        file_id: fileResponse.file_id,
        tag,
      },
      token,
    )

    if ( !fileResponse || !tagResponse ) {  // Upload failed, alert user
      setLoading( false )
      Alert.alert( 'Sorry',
        `Something went wrong and ${ mediaType } creation failed\n please check media file size!` )
    }

    if ( fileResponse && tagResponse ) { // Upload succeeded, close modal
      console.log( 'new tag', tagResponse )
      console.log( 'new file', fileResponse )

      switch ( mediaType ) {  // Close modal and move user to relevant screen after successful upload
        case 'avatar':
          navigation.goBack()
          user.avatar = await fetchAvatar( user.user_id ).finally( () => { // Update app user state with new avatar url
            setLoading( false )
            navigation.navigate( 'AccountTab', { screen: 'Account' } )
          } )
          break
        case 'event':
          setLoading( false )
          navigation.goBack()
          navigation.navigate( 'SingleEventOnCreate',
            { eventId: fileResponse.file_id } )
          break
        case 'post':
          setLoading( false )
          navigation.goBack()
          navigation.navigate( 'SinglePostOnCreate',
            { postId: fileResponse.file_id } )
          break
      }

    }

  }

  if ( loading ) {  // Display Loading screen specific loading indicator
    switch ( mediaType ) {
      case 'avatar':
        return <Loading text={'Uploading avatar'} />
      case 'event':
        return <Loading text={'Publishing event'} />
      default:
        return  <Loading text={'Publishing post'} />
    }
  }

  switch ( mediaType ) {  // Return relevant view, based on mediaType prop
    case 'avatar':
      return <UploadAvatar onSubmit={ onSubmit } />
    case 'event':
      return <UploadEvent onSubmit={ onSubmit } />
    default:
      return <UploadPost onSubmit={ onSubmit } />
  }
}

UploadMedia.propTypes = {
  navigation: PropTypes.object,
  mediaType: PropTypes.string,
}

export default UploadMedia