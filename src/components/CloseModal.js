import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import theme from '../theme'
import PropTypes from 'prop-types'

const CloseModal = ( { navigation } ) => {
  const onModalCloseHandler = () => {
    navigation.goBack()
  }

  return (
    <TouchableOpacity onPress={ onModalCloseHandler }>
      <View style={{width: 30, height: 30, borderWidth: 1, alignItems: 'center', justifyContent: 'center', borderColor: theme.colors.bgYellow, borderRadius: 15}}>
        <Text style={ { color: theme.colors.bgYellow, fontWeight: 'bold', fontSize: 20 } }>X</Text>
      </View>
    </TouchableOpacity>
  )
}

CloseModal.propTypes = {
  navigation: PropTypes.object,
}

export default CloseModal