import { useState } from 'react';
import axios from 'axios';

import { appId, baseUrl } from '../../config';

import useUserStorage from './useUserStorage';

const useUser = () => {
  const userStorage = useUserStorage();
  const [ loading, setLoading ] = useState( false );
  const [ error, setError ] = useState( null );

  // Create new user account
  const register = async ( username, password, email, fullName ) => {
    setLoading( true );

    const newUser = {
      username,
      password,
      email,
      full_name: `${ fullName } and more..`,
    };

    const URL = `${ baseUrl }users`;
    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
      //body: JSON.stringify( newUser ),
    };

    try {
      const registeredUser = await axios.post( URL, newUser, options );
      setLoading( false );
      return registeredUser.data;
    } catch ( error ) {
      setLoading( false );
      console.log( 'register error', error );
      return error;
    }

  };

  // Authenticate and login user
  const login = async (loginCredentials ) => {
    //const loginCredentials= {username: 'Ddddd', password: 'Ggggg'}
    const URL = `${ baseUrl }login`;
    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify( loginCredentials ),
    };
    try {
      const loginResponse = await axios.post( URL, loginCredentials, options );
      const { message, token, user } = loginResponse.data;

      /*
      * If user login succeeded, store user data in local storage
      * */

      if ( token ) {
        console.log('login succeeded')
        await userStorage.setToken(token)
        await userStorage.setId(user.user_id)
        await userStorage.setUsername(user.username)
        await userStorage.setEmail(user.email)
        await userStorage.setFullName(user.full_name)
        await userStorage.setAccountCreated(user.time_created)
      } else {
        // User login failed
        //console.log('login failed')
      }

      return loginResponse.data;


    } catch ( error ) {
      console.log( 'login error in hook', error );
      return error;
    }
  };

  // Get currently logged in user's details
  const getAuthenticatedUser = async () => {

  };

  // Get user details by id
  const getUserById = async () => {

  };

  // Modify registered user account details
  const modifyUser = async () => {

  };

  return {
    register,
    login,
    getAuthenticatedUser,
    getUserById,
    modifyUser,
    loading,
    error,
  };

};

export default useUser;
