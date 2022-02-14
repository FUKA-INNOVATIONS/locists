import { View, Text, StyleSheet } from 'react-native';

const Main = () => {
  return (
      <View style={styles.container}>
        <Text>Hello</Text>
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