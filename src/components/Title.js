import theme from '../theme'
import { Text, StyleSheet,  TouchableOpacity } from 'react-native'
import React from 'react'
import PropTypes from 'prop-types'

const Title = ( { text, style } ) => {
  return (
    <TouchableOpacity style={ { ...styles.text, fontFamily: 'Nunito', width: '90%', ...style }  }>
      <Text style={ theme.authTitle }>{text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  text: {
    color: '#E9D6DB',
    fontSize: 10,
  }
})

Title.propTypes = {
  text: PropTypes.string,
  onPress: PropTypes.func,
  style: PropTypes.object
}

export default Title