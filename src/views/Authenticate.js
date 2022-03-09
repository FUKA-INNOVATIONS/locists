import React, { useState } from 'react'
import { View } from 'react-native'
import SwitchSelector from 'react-native-switch-selector'

import theme from '../theme'
import Login from '../components/Login'
import Register from '../components/Register'
import PropTypes from 'prop-types'

const Authenticate = ( { navigation } ) => {
  const [ activeView, setActiveView ] = useState( 'signIn' )
  const viewOptions = [
    {
      label: 'Sign In',
      value: { view: 'signIn' },
    },
    {
      label: 'Register',
      value: { view: 'register' },
    },
  ]

  const setView = ( view ) => {
    setActiveView( view )
  }

  return (
    <View style={ { marginHorizontal: 0 } }>
      <SwitchSelector
        backgroundColor={ theme.colors.textPrimary }
        textColor={ theme.colors.white }
        selectedColor={ theme.colors.primary }
        buttonColor={ theme.colors.white }
        borderColor={ theme.colors.primary }
        valuePadding={ 3 }
        hasPadding={ true }
        bold={ true }
        options={ viewOptions }
        initial={ 0 }
        onPress={ ( value ) => setView( value.view ) }
      />

      { activeView === 'signIn' ? (
        <Login navigation={ navigation } />
      ) : (
        <Register navigation={ navigation } />
      ) }
    </View>
  )
}

Authenticate.propTypes = {
  navigation: PropTypes.object,
}

export default Authenticate
