import { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, Button, TextInput, Alert } from 'react-native';
import useUser from '../hooks/useUser';
import useAuthStorage from '../hooks/useAuthStorage';
import theme from '../theme';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import UploadMedia from '../components/UploadMedia';

const Settings = ( { navigation } ) => {
  const { user } = useAuthStorage();
  const authStorage = useAuthStorage();
  const { getUserByToken, modifyUser, isUsernameAvailable } = useUser();

  const onModalCloseHandler = () => {
    navigation.goBack();
  };

  const ModifySchema = Yup.object().shape( {
    username: Yup.string().
        min( 5, 'Too Short!' ).
        max( 10, 'Too Long!' ),
    email: Yup.string().email( 'Invalid email' ),
  } );

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm( {
    defaultValues: {
      username: user.username,
      email: user.email,
    },
    resolver: yupResolver( ModifySchema ),
    mode: 'onBlur',
  } );

  const onSubmit = async ( data ) => {
    const token = user.token;

    console.log( 'formData', data );
    // Check, is username available ?
    const { available, username } = await isUsernameAvailable( data.username );

    if ( !available && username !== user.username ) {
      Alert.alert( 'Username is not available',
          'Please choose another cool username and try again' );
    }

    // Check if user exists and fetch user data
    if ( available ) {
      const userFound = await getUserByToken( token );
      if ( userFound.user_id === user.user_id ) {
        const updatedUser = await modifyUser( token, data );
        console.log( 'uuu', updatedUser );

        // update app state
        /* const updatedState = {
          ...user,
          ...updatedUser
        } */
        authStorage.updateState(data);


        if ( updatedUser ) {
          Alert.alert( 'Success', updatedUser.message );
        }
      } else {
        console.log( 'Authenticated user and fetched user id dont match' );
      }
    }
  };

  return (
      <View style={ { marginTop: 50, marginHorizontal: 10 } }>
        <Button title={ 'Go back' } onPress={ onModalCloseHandler }/>
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
        <Button title="Update details" onPress={ handleSubmit( onSubmit ) }/>

        <UploadMedia mediaType={ 'avatar' } ussername={ user.username }/>
      </View>
  );

};

export default Settings;