import { View, Text, Pressable } from 'react-native'
import theme from '../theme'

const NoComments = ( { openCommentBox, isWriteComment } ) => {
  console.log(isWriteComment)
  return (
    <View style={ { alignItems: 'center', padding: 25 } }>
      <Text style={ {
        color: theme.colors.mainBackground,
        fontWeight: 'bold',
        marginBottom: 5,
      } }>No one has yet commented</Text>
      <Text style={ { color: theme.colors.mainBackground } }>Be the first one to
        leave an interesting comment</Text>
      <View style={{marginTop: 20}}>
        <Pressable onPress={ openCommentBox }>
          <Text style={ { color:theme.colors.mainBackground, fontSize: 20 } }>Write a comment</Text>
        </Pressable>

      </View>
    </View>
  )
}

export default NoComments