import React, { useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import LottieView from 'lottie-react-native'

const Loading = () => {
  const animation = React.createRef();
  useEffect(() => {
    animation.current?.play();
  }, []);

  return (
    <View style={ {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    } }>
      <LottieView
        ref={animation}
        source={require('../../assets/loadSpinner.json')}
        style={styles.spinner}
        loop={false}
      />
    </View>
  )
}

export default Loading

const styles = StyleSheet.create( {
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinner: {
    width: 100,
    height: 100
  }
} );
