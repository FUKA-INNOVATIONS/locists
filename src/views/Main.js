import { View, Text, StyleSheet } from 'react-native';

import Register from '../components/Register'
import Login from '../components/Login';
import useUserStorage from '../hooks/useUserStorage';
import { useEffect } from 'react';

const Main = () => {
  return (
      <View style={styles.container}>
        <Text>Hello</Text>
        <Register />
        <Login />
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