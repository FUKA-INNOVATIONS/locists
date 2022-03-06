import { View, Text, Image, Alert, Button } from 'react-native'
import TimeAgo from '@andordavoti/react-native-timeago'
import useAuthStorage from '../hooks/useAuthStorage'
import useComment from '../hooks/useComment'
import theme from '../theme'
import fetchAvatar from '../utils/fetchAvatar'
import { useEffect, useState } from 'react'

const Comment = ( { commentObj, avatar } ) => {
  const { user } = useAuthStorage()
  const { deleteComment } = useComment()
  const isOwner = commentObj.user_id === user.user_id
  const [ a, setA ] = useState()

  useEffect( async () => {
    fetchAvatar( commentObj.user_id ).then( avatar => setA( avatar ) )
  } )

  const onDeleteHandler = ( id ) => {
    deleteComment( id ).then( res => {
      if ( deleteComment ) {
        Alert.alert( res.message )
      }
    } )
  }

  return (
    <View style={ theme.comment }>
      <View style={ theme.commentInfo }>
        <Image source={ { uri: a } }
               style={ theme.commentUser } />
        <Text>{ commentObj.comment }</Text>
      </View>
      <View>
        <TimeAgo dateTo={ new Date( commentObj.time_added ) } />
        { isOwner && <Button title={ 'Delete' } onPress={ () => onDeleteHandler(
          commentObj.comment_id ) }>Delete</Button> }
      </View>

      {/* <Text>comment_id: {commentObj.comment_id}</Text> */ }

    </View>
  )
}

export default Comment