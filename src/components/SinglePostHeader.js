import { Button, Image, Text, View } from 'react-native'
import { uploadsUrl } from '../../config'
import { useState } from 'react'
import theme from '../theme'
import PostComment from './PostComment'
import Like from './Like'
import AddComment from '../../assets/icons/AddComment.svg'
import Loading from './Loading'

const SinglePostHeader = ( { postDetails } ) => {
  if ( postDetails === undefined ) return <View><Text>Loading..</Text></View>
  const [ isWriteComment, setIsWriteComment ] = useState( false )

  if ( !postDetails ) return <Loading />

  const onWriteCommentHandler = () => {
    console.log( 'onWriteCommentHandler' )
    setIsWriteComment( true )
  }

  return (
    <View style={ theme.singlePost }>
      <Button title={ 'Write a comment' } onPress={ onWriteCommentHandler } />
      { isWriteComment && <PostComment file_id={ postDetails.file_id }
                                       display={ setIsWriteComment } /> }
      <Text
        style={ theme.singlePostOwner }>{ postDetails.description.owner }</Text>
      <View style={ theme.imageAndLikes }>
        <Image source={ { uri: uploadsUrl + postDetails.thumbnails.w320 } }
               style={ theme.singlePostImage } />
        <View style={ { alignItems: 'flex-end' } }>
          <Like displayIcon file_id={ postDetails.file_id } single={ true } />
          <AddComment width={ 32 } height={ 32 } />
        </View>
      </View>
      <View style={ theme.singlePostText }>
        <Text>{ postDetails.description.description }</Text>
      </View>
    </View>
  )
}

export default SinglePostHeader
