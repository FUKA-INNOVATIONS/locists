import { View, Text, Pressable } from 'react-native'
import TimeAgo from '@andordavoti/react-native-timeago'
import useAuthStorage from '../hooks/useAuthStorage'
import useComment from '../hooks/useComment'
import theme from '../theme'
import fetchAvatar from '../utils/fetchAvatar'
import { useEffect, useState } from 'react'
import UserInfo from './UserInfo'

const Comment = ( {
  commentObj,
  updateComments
} ) => {
  const { user } = useAuthStorage()
  const { deleteComment } = useComment()
  const isOwner = commentObj.user_id === user.user_id
  const [ avatar, setAvatar ] = useState()

  useEffect( async () => {
    fetchAvatar( commentObj.user_id ).then( avatar => setAvatar( avatar ) )
  } )

  const onDeleteHandler = ( id ) => {
    deleteComment( id ).then( res => {
      if ( deleteComment ) {
        updateComments()
      }
    } )
  }

  return (
    <View style={ { margin: 10 } }>
      <View style={ { flexDirection: 'row', alignItems: 'center' } }>
        <UserInfo avatar={ avatar } username={ 'Username' } />
        <TimeAgo style={ { color: '#E9D6DB', left: 30 } }
                 dateTo={ new Date( commentObj.time_added ) } />
        <View style={{marginLeft: 50}}>
          { isOwner &&
          <Pressable onPress={ () => onDeleteHandler(
            commentObj.comment_id ) }><Text style={{color: '#c53e3e'}}>X Delete</Text></Pressable> }
        </View>
      </View>
      <View style={ theme.comment }>
        <View style={ theme.commentInfo }>
          <Text>{ commentObj.comment }</Text>
        </View>
      </View>
    </View>
  )
}

export default Comment