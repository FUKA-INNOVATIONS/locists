import React from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';

import theme from '../theme';
import useUser from '../hooks/useUser';
import { yupResolver } from '@hookform/resolvers/yup';

const LoginSchema = Yup.object().shape( {
  username: Yup.string().
      required( 'Username is required' ),
  password: Yup.string().
      required( 'Password is resuired' ),
} );

const Login = props => {
  const { login } = useUser();
  const { control, handleSubmit, formState: { errors }, reset } = useForm( {
    defaultValues: {
      username: '',
      password: '',
    },
    resolver: yupResolver( LoginSchema ),
    mode: 'onBlur',
  } );
  const onSubmit = async ( data ) => {
    const loginResponse = await login( data );

    if ( loginResponse.token ) {
      // User login succeeded
      console.log('login succeeded')
      Alert.alert('Login Succeeded', 'Do you want to login?')
    } else {
      // User login failed
      console.log('login failed')
      Alert.alert('Login failed', 'Please check your credentials and try again')
    }
  };

  return (
      <View>
        <Text>
          Login
        </Text>

        <View style={ theme.inputContainer }>
          <Controller
              control={ control }
              render={ ( { field: { onChange, onBlur, value } } ) => (
                  <TextInput
                      style={ theme.input }
                      onBlur={ onBlur }
                      onChangeText={ onChange }
                      value={ value }
                      placeholder="Username"
                  />
              ) }
              name="username"
          />
          { errors.username && <Text>{ errors.username.message }</Text> }
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
                      placeholder="Password"
                  />
              ) }
              name="password"
          />
          { errors.password && <Text>{ errors.password.message }</Text> }
        </View>
        <Button title="Login" onPress={ handleSubmit( onSubmit ) }/>
      </View>
  );
};

export default Login;