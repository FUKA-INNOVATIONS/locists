import React from 'react'
import {
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet,
  ScrollView,
} from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import * as Yup from 'yup'

import theme from '../theme'
import useUser from '../hooks/useUser'
import { yupResolver } from '@hookform/resolvers/yup'
import Loading from './Loading'
import PropTypes from 'prop-types'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Button from './Button'
import Title from './Title'

const RegisterSchema = Yup.object().shape( {
  username: Yup.string().
    min( 4, 'Too Short!' ).
    max( 10, 'Too Long!' ).
    required( 'Username is required, 4-10 characters' ),
  password: Yup.string().required( 'Required' ),
  passwordConfirm: Yup.string().
    min( 5, 'Too short, min 5 characters' ).
    max( 16, 'Too long, max 16 characters' ).
    required( 'Password confirmation is required' ).
    oneOf( [ Yup.ref( 'password' ), null ], 'Passwords must match' ),
  email: Yup.string().email( 'Invalid email' ).required( 'Required' ),
  city: Yup.string().required( 'Required' ),
} )

const Register = ( { navigation } ) => {
  // eslint-disable-next-line
  const { isUsernameAvailable, register, login, loading } = useUser()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm( {
    defaultValues: {
      username: '',
      password: '',
      email: '',
      city: '',
    },
    resolver: yupResolver( RegisterSchema ),
    mode: 'onBlur',
  } )

  // Submit registration form with given data
  const onSubmit = async ( data ) => {
    // Check, is username available ?
    const { available } = await isUsernameAvailable( data.username )
    !available && Alert.alert( 'Username is not available',
      'Please choose another cool username and try again' )

    // Username is available, Register user

    const registeredUser = await register(
      data.username,
      data.password,
      data.email,
      data.city,
    )

    /*
     * Registration failed, alert user
     * */

    if ( !registeredUser.user_id ) {
      Alert.alert( 'Registration failed' )
    }

    /*
     * Registration succeeded, login user
     * */

    if ( registeredUser.user_id ) {

      /* const loginCredentials = {
       username: data.username,
       password: data.password,
       }; */

      const loginResponse = await login( data )
      if ( loginResponse.token ) {
        console.log( 'login succeeded' )  // User login succeeded
        navigation.navigate( 'AccountTab', { Screen: 'Account' } ) // Redirect to account screen
      } else {  // User login failed
        console.log( 'login failed' )
        Alert.alert( 'Login failed',
          'Please check your credentials and try again' )
      }

    }

    console.log( 'registeredUser Register.js: ', registeredUser )
  }

  if ( loading ) return <Loading />

  return (
    <KeyboardAwareScrollView enableAutomaticScroll={ false }
                             enableOnAndroid={ true }
                             viewIsInsideTabBar={ true }>


      <View style={ theme.formContainer }>
        <Title text={ 'Words and animation' } />

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
                placeholder='email'
              />
            ) }
            name='email'
          />
          { errors.email && <Text
            style={ theme.inputErrorText }>{ errors.email.message }</Text> }
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
                placeholder='City'
              />
            ) }
            name='city'
          />
          { errors.city && <Text
            style={ theme.inputErrorText }>{ errors.city.message }</Text> }
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

        <View style={ theme.inputContainer }>
          <Controller
            control={ control }
            render={ ( { field: { onChange, onBlur, value } } ) => (
              <TextInput
                style={ theme.input }
                onBlur={ onBlur }
                onChangeText={ onChange }
                value={ value }
                placeholder='Password confirmation'
                secureTextEntry={ true }
              />
            ) }
            name='passwordConfirm'
          />
          { errors.passwordConfirm && (
            <Text
              style={ theme.inputErrorText }>{ errors.passwordConfirm.message }</Text>
          ) }
        </View>
        <Button onPress={ handleSubmit( onSubmit ) } title={ 'Register' }
                style={ { width: 200 } } />
      </View>
    </KeyboardAwareScrollView>
  )
}

Register.propTypes = {
  navigation: PropTypes.object,
}

export default Register
