import React from 'react'
import {
  View,
  Alert,
  TextInput,
} from 'react-native'
import useAuthStorage from '../hooks/useAuthStorage'
import useUser from '../hooks/useUser'
import { Controller, useForm } from 'react-hook-form'
import theme from '../theme'
import UploadMedia from '../components/UploadMedia'
import PropTypes from 'prop-types'
import Title from '../components/Title'
import Button from '../components/Button'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const ModifyAccount = ( { navigation, route } ) => {

  const { type } = route.params
  const { user } = useAuthStorage()
  const authStorage = useAuthStorage()
  const { modifyUser, isUsernameAvailable } = useUser()

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm( {
    defaultValues: {
      username: user.username,
      password: '',
      confirmPassword: '',
      email: user.email,
      full_name: user.full_name,
    },
    mode: 'onBlur',
  } )

  const onSubmit = async ( data ) => {
    // Check, is username available ?
    const { available, username } = await isUsernameAvailable( data.username )

    if ( !available && username !== user.username ) {
      Alert.alert( 'Username is not available',
        'Please choose another cool username and try again' )
    }

    try {
      delete data.confirmPassword
      if ( data.password === '' ) {
        delete data.password
      }

      // TODO: token not always available after login, needs app reload
      const userData = await modifyUser( data )

      const newUserState = {
        ...user,
        ...data,
      }

      if ( userData ) {
        Alert.alert( 'Success', userData.message )
        delete data.password
        authStorage.updateState( newUserState )
        navigation.goBack()
      }
    } catch ( error ) {
      console.error( error )
    }

  }

  return (

    type === 'picture' ?
      <UploadMedia mediaType={ 'avatar' } navigation={ navigation } />
      :
      <KeyboardAwareScrollView enableAutomaticScroll={ false }
                               enableOnAndroid={ true }
                               viewIsInsideTabBar={ true }>

        <View style={ { alignItems: 'center', marginTop: 10 } }>
          <Title text={ 'Keep account details up to date' } style={{fontSize: 15}} />
          <View style={ theme.inputContainer }>
            <Title text={'Username'} />
            <Controller
              control={ control }
              rules={ {
                required: { value: true, message: 'This is required.' },
                minLength: {
                  value: 3,
                  message: 'Username has to be at least 3 characters.',
                },
                validate: async ( value ) => {
                  try {
                    const available = await isUsernameAvailable( value )
                    if ( available || user.username === value ) {
                      return true
                    } else {
                      return 'Username is already taken.'
                    }
                  } catch ( error ) {
                    throw new Error( error.message )
                  }
                },
              } }
              render={ ( { field: { onChange, onBlur, value } } ) => (
                <TextInput
                  style={ theme.input }
                  onBlur={ onBlur }
                  onChangeText={ onChange }
                  value={ value }
                  autoCapitalize='none'
                  placeholder='Username'
                  errorMessage={ errors.username && errors.username.message }
                />
              ) }
              name='username'
            />
          </View>

          <View style={ theme.inputContainer }>
            <Title text={'City'} />
            <Controller
              style={ theme.input }
              control={ control }
              rules={ {
                minLength: {
                  value: 3,
                  message: 'Full name has to be at least 3 characters.',
                },
              } }
              render={ ( { field: { onChange, onBlur, value } } ) => (
                <TextInput
                  style={ theme.input }
                  onBlur={ onBlur }
                  onChangeText={ onChange }
                  value={ value }
                  autoCapitalize='words'
                  placeholder='City'
                  errorMessage={ errors.full_name && errors.full_name.message }
                />
              ) }
              name='full_name'
            />
          </View>

          <View style={ theme.inputContainer }>
            <Title text={'Password (optional)'} />
            <Controller
              control={ control }
              rules={ {
                minLength: {
                  value: 8,
                  message: 'Password has to be at least 8 characters.',
                },
                /*
                 pattern: {
                 value: /(?=.*[\p{Lu}])(?=.*[0-9]).{8,}/u,
                 message: 'Min 8, Uppercase, Number',
                 },
                 */
              } }
              render={ ( { field: { onChange, onBlur, value } } ) => (
                <TextInput
                  style={ theme.input }
                  onBlur={ onBlur }
                  onChangeText={ onChange }
                  value={ value }
                  autoCapitalize='none'
                  secureTextEntry={ true }
                  placeholder='Password'
                  errorMessage={ errors.password && errors.password.message }
                />
              ) }
              name='password'
            />
          </View>
          <View style={ theme.inputContainer }>
            <Title text={'Confirm password'} />
            <Controller
              control={ control }
              rules={ {
                validate: ( value ) => {
                  const { password } = getValues()
                  if ( value === password ) {
                    return true
                  } else {
                    return 'Passwords do not match.'
                  }
                },
              } }
              render={ ( { field: { onChange, onBlur, value } } ) => (
                <TextInput
                  style={ theme.input }
                  onBlur={ onBlur }
                  onChangeText={ onChange }
                  value={ value }
                  autoCapitalize='none'
                  secureTextEntry={ true }
                  placeholder='Confirm Password'
                  errorMessage={
                    errors.confirmPassword && errors.confirmPassword.message
                  }
                />
              ) }
              name='confirmPassword'
            />
          </View>

          <View style={ theme.inputContainer }>
            <Title text={'Email'} />
            <Controller
              control={ control }
              rules={ {
                required: { value: true, message: 'This is required.' },
                pattern: {
                  value: /\S+@\S+\.\S+$/,
                  message: 'Has to be valid email.',
                },
              } }
              render={ ( { field: { onChange, onBlur, value } } ) => (
                <TextInput
                  style={ theme.input }
                  onBlur={ onBlur }
                  onChangeText={ onChange }
                  value={ value }
                  autoCapitalize='none'
                  placeholder='Email'
                  errorMessage={ errors.email && errors.email.message }
                />
              ) }
              name='email'
            />
          </View>
          <Button onPress={ handleSubmit( onSubmit ) } title={ 'Update Details' }
                  style={ { width: 200 } } />

        </View>
      </KeyboardAwareScrollView>
  )
}

ModifyAccount.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
}

export default ModifyAccount