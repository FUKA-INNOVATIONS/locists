import { View, Text, StyleSheet } from 'react-native';

import Register from '../components/Register'

const Main = () => {
  return (
      <View style={styles.container}>
        <Text>Hello</Text>
        <Register />
      </View>
  );
};

export default Main;

const styles = StyleSheet.create( {
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
} );