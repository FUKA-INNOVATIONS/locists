import React, { useEffect } from 'react'
import {
  View,
  Text,
  TextInput,
  Alert,
} from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import * as Yup from 'yup'

import theme from '../theme'
import useUser from '../hooks/useUser'
import { yupResolver } from '@hookform/resolvers/yup'
import PropTypes from 'prop-types'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Button from './Button'
import LottieView from 'lottie-react-native'

const LoginSchema = Yup.object().shape( {
  username: Yup.string().required( 'Username is required' ),
  password: Yup.string().required( 'Password is required' ),
} )

const Login = ( { navigation } ) => {
  const { login } = useUser()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm( {
    defaultValues: {
      username: '',
      password: '',
    },
    resolver: yupResolver( LoginSchema ),
    mode: 'onBlur',
  } )

  const animation = React.createRef()
  useEffect( () => {
    animation.current?.play()
  }, [] )


  const onSubmit = async ( data ) => {
    const loginResponse = await login( data )
    if ( loginResponse.token ) {
      console.log( 'login succeeded' )  // User login succeeded
      navigation.navigate( 'AccountTab', { Screen: 'Account' } )     // Redirect to home screen
    } else {  // User login failed
      console.log( 'login failed' )
      Alert.alert( 'Login failed',
        'Please check your credentials and try again' )
    }
  }

  return (
    <KeyboardAwareScrollView enableAutomaticScroll={ false }
                             enableOnAndroid={ true }
                             viewIsInsideTabBar={ true }>


      <View style={ { marginVertical: 30, alignSelf: 'center' } }>
        <LottieView
          ref={ animation }
          source={ require( '../../assets/animations/account.json' ) }
          style={ { width: 200, height: 200 } }
          loop={ false }
        />
      </View>

      <View style={ theme.formContainer }>
      <View style={ theme.inputContainer }>
        <Controller
          control={ control }
          render={ ( { field: { onChange, onBlur, value } } ) => (
            <TextInput
              style={ theme.input }
              onBlur={ onBlur }
              onChangeText={ onChange }
              value={ value }
              placeholder='Username'
            />
          ) }
          name='username'
        />
        { errors.username && <Text
          style={ theme.inputErrorText }>{ errors.username.message }</Text> }
      </View>

      <View style={ theme.inputContainer }>
        <Controller
          control={ control }
          render={ ( { field: { onChange, onBlur, value } } ) => (
            <TextInput
              style={ theme.input }
              onBlur={ onBlur }
              onChangeText={ onChange }
              value={ value }
              placeholder='Password'
              secureTextEntry={ true }
            />
          ) }
          name='password'
        />
        { errors.password && <Text
          style={ theme.inputErrorText }>{ errors.password.message }</Text> }
      </View>
      <Button onPress={ handleSubmit( onSubmit ) } title={ 'Sign in' }
              style={ { width: 200 } } />
      </View>
    </KeyboardAwareScrollView>
  )
}

Login.propTypes = {
  navigation: PropTypes.object,
}

export default Login