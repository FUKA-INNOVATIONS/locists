import React from 'react'
import { View, Image, Text } from 'react-native'
import PropTypes from 'prop-types'
import TimeAgo from '@andordavoti/react-native-timeago'

const UserInfo = ( { username, avatar, timeAdded } ) => { // Display details about user, Post/event/comment owner
  const avatarUri = {
    uri: avatar,
  }

  const noAvatar = require( '../../assets/defaultPic.jpg' )

  return (
    <View
      style={ { flexDirection: 'row', alignItems: 'center', marginBottom: 8, marginTop: 20 } }>
      <Image source={ !avatar ? noAvatar : avatarUri } style={ {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#fff',
      } } />
      <Text style={ { color: '#E9D6DB', marginLeft: 10 } }>{ username }</Text>
      { timeAdded && <TimeAgo style={ { color: '#e9d6db', left: 30 } }
                              dateTo={ new Date( timeAdded ) } /> }
    </View>
  )
}

UserInfo.propTypes = {
  username: PropTypes.oneOfType( [
    PropTypes.string,
    PropTypes.number,
  ] ),
  avatar: PropTypes.string,
  timeAdded: PropTypes.string,
}

export default UserInfo