import { useState } from 'react';
import axios from 'axios';

// TODO: use appId
import { baseUrl, uploadsUrl } from '../../config';
import useAuthStorage from './useAuthStorage';
import useTag from './useTag';
import doFetch from '../utils/doFetch';

const useUser = () => {
  const authStorage = useAuthStorage();
  const [ loading, setLoading ] = useState( false );
  const [ token, setToken ] = useState( null );

  // Create new user account
  const register = async ( username, password, email, fullName ) => {
    const newUser = {
      username,
      password,
      email,
      full_name: fullName,
    };

    const URL = `${ baseUrl }users`;
    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
      // body: JSON.stringify( newUser ),
    };

    try {
      setLoading( true );
      const registeredUser = await axios.post( URL, newUser, options );
      setLoading( false );
      return registeredUser.data;
    } catch ( error ) {
      // setLoading( false );
      console.log( 'register error', error );
      setLoading( false );
      return error;
    }
  };

  const isUsernameAvailable = async ( username ) => {
    const URL = `${ baseUrl }users/username/${ username }`;
    try {
      console.log('check')
      // setLoading( true );
      const available = await axios.get( URL );
      // setLoading( false );
      return available.data;
    } catch ( e ) {
      console.log( 'error in isUsernameAvailable', e );
    }
  };

  // Authenticate and login user
  const login = async ( loginCredentials ) => {
    const URL = `${ baseUrl }login`;
    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify( loginCredentials ),
    };
    try {
      // setLoading( true );
      const loginResponse = await axios.post( URL, loginCredentials, options );
      const { token, user } = loginResponse.data;
      console.log('lres', loginResponse)

      /*
       * If user login succeeded,
       * store token in device
       * userData and avatar link in app state -> user obj
       * */

      if ( token ) {
        console.log( 'login succeeded' );
        await authStorage.setToken( token );
        user.avatar = await fetchAvatar( user.user_id );
        user.isLogged = true;
        authStorage.login( user );
        // setLoading( false );
      }
      // setLoading( false );
      return loginResponse.data;
    } catch ( error ) {
      console.log( 'login error in hook', error );
      // setError( error );
      return error;
    }
  };

  /*
   * Fetch and return user avatar link
   * */
  const fetchAvatar = async ( userId ) => {
    const { getFilesByTag } = useTag();
    try {
      // setLoading( true );
      const avatarArray = await getFilesByTag( 'avatar_' + userId );
      const avatar = avatarArray.pop();
      if ( avatar !== undefined ) {
        authStorage.user.avatar = uploadsUrl + avatar.filename;
        // setLoading( false );
        return uploadsUrl + avatar.filename;
      }
    } catch ( error ) {
      // setLoading( false );
      console.error( error.message );
    }
  };

  const loginWithToken = async ( token ) => {
    if ( token ) {
      try {
        // setLoading( true );
        const user = await getUserByToken( token );
        if ( user ) {
          // setLoading( true );
          const avatar = await fetchAvatar( user.user_id );
          user.isLogged = true;
          user.avatar = avatar;
          user.token = token;
          authStorage.login( user );
          // setLoading( false );
        }
        // setLoading( false );
      } catch ( e ) {
        console.log( 'error in loginWithToken hook', e );
        // setLoading( false );
      }
    }
    return null;
  };

  // Get currently logged in user's details
  const getAuthenticatedUser = async () => {
    // setLoading( true );
    const token = await authStorage.getToken();
    if ( token ) {
      console.log( 'token found', token );
      // setLoading( false );
    } else {
      console.log( 'no token', token );
      // setLoading( false );
    }
  };

  const getToken = async () => {
    try {
      // setLoading( true );
      const token = await authStorage.getToken();
      setToken( token );
      // setLoading( false );
      return token;
    } catch ( e ) {
      console.log( e );
      // setLoading( false );
    }
  };

  // Get user details by id
  const getUserById = async () => {};

  const getUserByToken = async ( token ) => {
    const URL = `${ baseUrl }users/user`;
    const options = {
      method: 'GET',
      headers: { 'x-access-token': token },
    };
    try {
      // setLoading( true );
      const user = await axios.get( URL, options );
      // setLoading( false );
      return user.data;
    } catch ( e ) {
      console.log( e );
      // setLoading( false );
    }
  };

  // Modify registered user account details
  const modifyUser = async ( token, updateDetails ) => {
    console.log( 'details', updateDetails );
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
      body: JSON.stringify( updateDetails ),
    };
    try {
      // setLoading( true );
      const response = await doFetch( baseUrl + 'users', options );
      // setLoading( false );
      return response;
    } catch ( e ) {
      console.log( 'error in modifyUser', e );
      // setLoading( false );
    }
  };

  return {
    register,
    login,
    getAuthenticatedUser,
    getToken,
    getUserById,
    modifyUser,
    getUserByToken,
    fetchAvatar,
    loginWithToken,
    isUsernameAvailable,
    loading,
    token,
  };
};

export default useUser;
