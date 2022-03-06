import { View, Text } from 'react-native'
import theme from '../theme'

const NoComments = () => {
  return (
    <View style={{ alignItems: 'center', padding: 25 }}>
      <Text style={{color: theme.colors.mainBackground, fontWeight: 'bold', marginBottom: 5}}>No one has yet commented</Text>
      <Text style={{color: theme.colors.mainBackground}}>Be the first one to leave an interesting comment</Text>
    </View>
  )
}

export default NoComments