import { Text, View } from 'react-native'

const Loading = () => {
  // TODO: Add a spinner icon
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{color: 'white', fontSize: 30}}>
        Loading..
      </Text>
    </View>
  )
}

export default Loading