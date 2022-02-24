import {
  View,
  Text,
  TextInput,
  Button,
  KeyboardAvoidingView, Alert,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';

import theme from '../theme';
import useUser from '../hooks/useUser';
import { yupResolver } from '@hookform/resolvers/yup';

const RegisterSchema = Yup.object().shape( {
  username: Yup.string().
      min( 5, 'Too Short!' ).
      max( 10, 'Too Long!' ).
      required( 'Username is required' ),
  password: Yup.string().required( 'Required' ),
  passwordConfirm: Yup.string().
      min( 5, 'Too short' ).
      max( 16, 'Too long' ).
      required( 'Password confirmation is required' ).
      oneOf( [ Yup.ref( 'password' ), null ], 'Passwords must match' ),
  email: Yup.string().email( 'Invalid email' ).required( 'Required' ),
  fullName: Yup.string().required( 'Required' ),
} );

const Register = ( { navigation } ) => {
  // eslint-disable-next-line
  const { isUsernameAvailable, register, login } = useUser();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm( {
    defaultValues: {
      username: '',
      password: '',
      email: '',
      fullName: '',
    },
    resolver: yupResolver( RegisterSchema ),
    mode: 'onBlur',
  } );

  // Submit registration form with given data
  const onSubmit = async ( data ) => {
    // Check, is username available ?
    const { available } = await isUsernameAvailable( data.username );
    !available && Alert.alert( 'Username is not available',
        'Please choose another cool username and try again' );

    // Username is available, Register user

    const registeredUser = await register(
        data.username,
        data.password,
        data.email,
        data.fullName,
    );

    /*
     * Registration failed, alert user
     * */

    if ( !registeredUser.user_id ) {
      Alert.alert( 'Registration failed' );
    }

    /*
     * Registration succeeded, login user
     * */

    if ( registeredUser.user_id ) {

      /* const loginCredentials = {
        username: data.username,
        password: data.password,
      }; */

      const loginResponse = await login(data)
      if (loginResponse.token) {
        console.log('login succeeded')  // User login succeeded
        navigation.navigate('HomeTab')     // Redirect to home screen
      } else {  // User login failed
        console.log('login failed')
        Alert.alert('Login failed', 'Please check your credentials and try again')
      }

    }

    console.log( 'registeredUser Register.js: ', registeredUser );
  };

  return (
      <KeyboardAvoidingView>
        <View>
          <Text>Register</Text>

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
                        placeholder="email"
                    />
                ) }
                name="email"
            />
            { errors.email && <Text>{ errors.email.message }</Text> }
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
                        secureTextEntry={true}
                    />
                ) }
                name="password"
            />
            { errors.password && <Text>{ errors.password.message }</Text> }
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
                        placeholder="Password confirmation"
                        secureTextEntry={true}
                    />
                ) }
                name="passwordConfirm"
            />
            { errors.passwordConfirm && (
                <Text>{ errors.passwordConfirm.message }</Text>
            ) }
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
                        placeholder="Full name"
                    />
                ) }
                name="fullName"
            />
            { errors.fullName && <Text>{ errors.fullName.message }</Text> }
          </View>

          <Button title="Register" onPress={ handleSubmit( onSubmit ) }/>
        </View>
      </KeyboardAvoidingView>
  );
};

export default Register;
