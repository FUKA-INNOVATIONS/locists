import React from 'react'
import { View, Image, Text } from 'react-native'
import PropTypes from 'prop-types'

const UserInfo = ( { username, avatar } ) => {
  const avatarUri = {
    uri: avatar
  }

  const noAvatar = require('../../assets/defaultPic.jpg')

  return (
    <View
      style={ { flexDirection: 'row', alignItems: 'center', marginBottom: 5 } }>
      <Image source={ !avatar ? noAvatar : avatarUri  } style={ {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#fff',
      } } />
      <Text style={ { color: '#E9D6DB', marginLeft: 10 } }>{ username }</Text>
    </View>
  )
}

UserInfo.propTypes = {
  username: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  avatar: PropTypes.string,
}

export default UserInfo