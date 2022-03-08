import { Alert, View, Text } from 'react-native'
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

  const onSubmit = async (
    data, mediaDescription, imageSelected, image, type ) => {

    setLoading( true )
    navigation.goBack()


    const token = await authStorage.getToken()

    mediaDescription = JSON.stringify( mediaDescription )

    if ( !imageSelected ) {
      Alert.alert( 'Please, select a file' )
      setLoading( false )
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

      setLoading( false )
    }

    if ( !fileResponse || !tagResponse ) {
      setLoading( false )
      Alert.alert( 'Sorry',
        `Something went wrong and ${ mediaType } creation failed\n please check media file size!` )
    }

    // Update app user state with new avatar url
    /* if ( mediaType === 'avatar' ) {
     user.avatar = await fetchAvatar( user.user_id )
     } */

    setLoading( false )

    // Move user to relevant view after successful upload

    switch ( mediaType ) {
      case 'avatar':
        user.avatar = await fetchAvatar( user.user_id ) // Update app user state with new avatar url
        navigation.navigate( 'AccountTab', { screen: 'Account' } )
        break
      case 'event':
        navigation.navigate( 'ExploreTab', { screen: 'SingleEvent', params: { eventId: fileResponse.file_id }, } )
        break
      case 'post':
        navigation.navigate( 'ExploreTab', { screen: 'SinglePost', params: { postId: fileResponse.file_id }, } )
        break
    }
  }

  if ( loading ) return <Loading text={ 'Uploading media' } />

  switch ( mediaType ) {
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