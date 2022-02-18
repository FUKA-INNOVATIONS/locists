import { View, Text, StyleSheet } from 'react-native'

import Authenticate from './Authenticate'

const Main = () => {
  return (
    <View style={styles.container}>
      <Text style={{ marginBottom: 50 }}>Hello from Main view</Text>
      <Authenticate />
    </View>
  )
}

export default Main

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
