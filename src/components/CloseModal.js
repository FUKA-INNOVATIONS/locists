import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import theme from '../theme'
import PropTypes from 'prop-types'

const CloseModal = ( { navigation } ) => {
  const onModalCloseHandler = () => {
    navigation.goBack()
  }

  return (
    <TouchableOpacity onPress={ onModalCloseHandler }>
      <Text style={ { color: theme.colors.bgYellow } }>X</Text>
    </TouchableOpacity>
  )
}

CloseModal.propTypes = {
  navigation: PropTypes.object,
}

export default CloseModal