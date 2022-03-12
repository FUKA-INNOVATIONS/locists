import React from 'react'
import { View, Text } from 'react-native'
import theme from '../theme'
import PropTypes from 'prop-types'

const NoComments = ( { openCommentBox, isWriteComment } ) => {
  // console.log( isWriteComment )
  return (
    <View style={ { alignItems: 'center', padding: 25, marginTop: 20 } }>
      <Text style={ {
        color: theme.colors.mainBackground,
        fontWeight: 'bold',
        marginBottom: 5,
      } }>No one has yet commented</Text>
      <Text style={ { color: theme.colors.mainBackground } }>Be the first one to
        leave an interesting comment</Text>
      <View style={ { marginTop: 20 } }>

      </View>
    </View>
  )
}

NoComments.propTypes = {
  openCommentBox: PropTypes.func,
  isWriteComment: PropTypes.bool,
}

export default NoComments