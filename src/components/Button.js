import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import PropTypes from 'prop-types'

import { useFonts, Nunito_400Regular as Nunito } from '@expo-google-fonts/nunito'

const Button = ( { title, onPress, style } ) => {
  const [ fontsLoaded ] = useFonts( { Nunito } )
  if (!fontsLoaded) {return null}

  return (
    <TouchableOpacity style={ { ...styles.buttonContainer, ...style } } onPress={ () => onPress() }>
      <Text style={ styles.buttonText }>{ title }</Text>
    </TouchableOpacity>
  )
}

export default Button

const styles = StyleSheet.create( {
  buttonContainer: {
    alignItems: 'center',
    borderColor: '#7b08a3',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    elevation: 5,
    backgroundColor: '#fff',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'purple',
  },
} )

Button.propTypes = {
  title: PropTypes.string,
  onPress: PropTypes.func,
  style: PropTypes.object
}