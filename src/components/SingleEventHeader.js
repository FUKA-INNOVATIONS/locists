import { useState } from 'react'
import { Button, Image, Text, View } from 'react-native'
import { uploadsUrl } from '../../config'
import PostComment from './PostComment'
import Attend from './Attend'
import theme from '../theme'
import Loading from './Loading'

const SingleEventHeader = ( { eventDetails } ) => {
  const [ isWriteComment, setIsWriteComment ] = useState( false )

  const onWriteCommentHandler = () => {
    console.log( 'onWriteCommentHandler' )
    setIsWriteComment( true )
  }

  if ( !eventDetails ) return <Loading />

  return (
    <View>
      <Button title={ 'Write a comment' } onPress={ onWriteCommentHandler } />
      { isWriteComment && <PostComment file_id={ eventDetails.file_id }
                                       display={ setIsWriteComment } /> }
      <Image source={ { uri: uploadsUrl + eventDetails.thumbnails.w320 } }
             style={ { width: '100%', height: 200 } } />
      <View style={ theme.singleEventInfo }>
        <Text
          style={ theme.mediaTitle }>{ eventDetails.description.name }</Text>
        <Text>Description: { eventDetails.description.description }</Text>
        <Text>Location: { eventDetails.description.location }</Text>
        <Text>File_id: { eventDetails.file_id }</Text>
        <Text>Media type: { eventDetails.description.mediaType }</Text>
        <Attend displayIcon file_id={ eventDetails.file_id } />
      </View>

    </View>
  )
}

export default SingleEventHeader