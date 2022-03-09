import React from 'react'
import {
  View,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import * as Yup from 'yup'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import theme from '../theme'
import useUser from '../hooks/useUser'
import { yupResolver } from '@hookform/resolvers/yup'
import PropTypes from 'prop-types'
import Button from './Button'

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
      <View style={ styles.container }>
        <View><Text style={ theme.authTitle }>Text and animation</Text></View>
        <View style={ styles.inputContainer }>
          <Controller
            control={ control }
            render={ ( { field: { onChange, onBlur, value } } ) => (
              <TextInput
                style={ styles.input }
                onBlur={ onBlur }
                onChangeText={ onChange }
                value={ value }
                placeholder='Username'
              />
            ) }
            name='username'
          />
          { errors.username && <Text
            style={ styles.inputErrorText }>{ errors.username.message }</Text> }
        </View>

        <View style={ styles.inputContainer }>
          <Controller
            control={ control }
            render={ ( { field: { onChange, onBlur, value } } ) => (
              <TextInput
                style={ styles.input }
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
            style={ styles.inputErrorText }>{ errors.password.message }</Text> }
        </View>
        <Button onPress={ handleSubmit( onSubmit ) } title={ 'Login' } />
      </View>
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create( {
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  input: {
    // width: width * 0.8,
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
  },
  inputContainer: {
    borderRadius: 10,
    marginVertical: 10,
    // borderColor: 'eee',
    height: 70,
    // width: '90%'
  },
  inputErrorText: {
    color: '#e1e4e8',
    fontSize: 14,
    alignSelf: 'center',
    marginTop: 5,
  },
} )

Login.propTypes = {
  navigation: PropTypes.object,
}

export default Login
