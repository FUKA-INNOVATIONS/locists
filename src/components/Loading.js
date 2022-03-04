import { Text, View } from 'react-native'

const Loading = () => {
  // TODO: Add a spinner icon
  return (
    <View style={{justifyContent: 'center', alignItems: 'center', marginVertical: 300}}>
      <Text style={{color: 'white', fontSize: 30}}>
        Loading..
      </Text>
    </View>
  )
}

export default Loading