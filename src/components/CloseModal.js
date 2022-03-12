import React from 'react'
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native'
import theme from '../theme'
import PropTypes from 'prop-types'

const CloseModal = ( { navigation } ) => {  // Close button added to modal screens in navigator
  const onModalCloseHandler = () => {
    navigation.goBack()
  }

  return (
    <TouchableOpacity onPress={ onModalCloseHandler }>
      <View style={ styles.container }>
        <Text style={ styles.textBtn }>X</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create( {
  container: {
    width: 30,
    height: 30,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: theme.colors.bgYellow,
    borderRadius: 15,
  },
  textBtn: {
    color: theme.colors.bgYellow, fontWeight: 'bold', fontSize: 20,
  },
} )

CloseModal.propTypes = {
  navigation: PropTypes.object,
}

export default CloseModal