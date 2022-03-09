import React from 'react'
import {
  View,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  StyleSheet, Button,
} from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import * as Yup from 'yup'

import theme from '../theme'
import useUser from '../hooks/useUser'
import { yupResolver } from '@hookform/resolvers/yup'
import Loading from './Loading'
import PropTypes from 'prop-types'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

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

    <KeyboardAwareScrollView>

      <View  style={styles.container}>
        <Text style={ theme.authTitle }>
          Some text
        </Text>
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
              placeholder='email'
            />
          ) }
          name='email'
        />
        { errors.email && <Text
          style={ styles.inputErrorText }>{ errors.email.message }</Text> }
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
              placeholder='City'
            />
          ) }
          name='city'
        />
        { errors.city && <Text
          style={ styles.inputErrorText }>{ errors.city.message }</Text> }
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

      <View style={ styles.inputContainer }>
        <Controller
          control={ control }
          render={ ( { field: { onChange, onBlur, value } } ) => (
            <TextInput
              style={ styles.input }
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
            style={ styles.inputErrorText }>{ errors.passwordConfirm.message }</Text>
        ) }
      </View>

      <Button title={'Register'} onPress={handleSubmit( onSubmit ) } />

    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: 'center'
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
    // height: 70,
  },
  inputErrorText: {
    color: '#e1e4e8',
    fontSize: 14,
    alignSelf: 'center',
    marginTop: 5
  },
})

Register.propTypes = {
  navigation: PropTypes.object,
}

export default Register
