import { View, Text, Pressable } from 'react-native'
import useAuthStorage from '../hooks/useAuthStorage'
import useComment from '../hooks/useComment'
import theme from '../theme'
import fetchAvatar from '../utils/fetchAvatar'
import React, { useEffect, useState } from 'react'
import UserInfo from './UserInfo'
import PropTypes from 'prop-types'

const Comment = ( {
  commentObj,
  updateComments,
} ) => {
  const { user } = useAuthStorage()
  const { deleteComment } = useComment()
  const isOwner = commentObj.user_id === user.user_id // Check if authenticated user is owner of current comment
  const [ avatar, setAvatar ] = useState()

  useEffect( async () => {  // Fetch comment owner's avatar
    fetchAvatar( commentObj.user_id ).then( avatar => setAvatar( avatar ) )
  } )

  const onDeleteHandler = ( id ) => { // Handle delete button
    deleteComment( id ).then( res => {
      if ( deleteComment ) {
        updateComments()  // Update UI
      }
    } )
  }

  return (
    <View style={ { margin: 10 } }>
      <View style={ {
        flexDirection: 'row',
        alignItems: 'center',
        justifyItems: 'center',
      } }>
        <UserInfo avatar={ avatar } username={ 'Username' } // API requires token, un-authorized user are allowed to explore the app, use fake username
                  timeAdded={ commentObj.time_added } />
        <View style={ { position: 'absolute', right: 0, marginRight: 5 } }>
          { isOwner &&
          <Pressable onPress={ () => onDeleteHandler(
            commentObj.comment_id ) }><Text style={ { color: '#c53e3e' } }>
            Delete</Text></Pressable> }
        </View>
      </View>
      <View style={ { ...theme.comment } }>
        <View style={ theme.commentInfo }>
          <Text
            style={ { color: 'rgb(233,214,219)' } }>{ commentObj.comment }</Text>
        </View>
      </View>
    </View>
  )
}

Comment.propTypes = {
  commentObj: PropTypes.object,
  updateComments: PropTypes.func,
}

export default Comment