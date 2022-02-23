import { useState } from 'react';
import axios from 'axios';

// TODO: use appId
import { baseUrl, uploadsUrl } from '../../config';
import useAuthStorage from './useAuthStorage';
import useTag from './useTag';

const useUser = () => {
  const authStorage = useAuthStorage();
  const [ loading, setLoading ] = useState( false );
  const [ error, setError ] = useState( null );
  const [ token, setToken ] = useState( null );
  const [ avatar, setAvatar ] = useState();

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
      // body: JSON.stringify( newUser ),
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
  const login = async ( loginCredentials ) => {
    const URL = `${ baseUrl }login`;
    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify( loginCredentials ),
    };
    try {
      const loginResponse = await axios.post( URL, loginCredentials, options );
      const { token, user } = loginResponse.data;

      /*
       * If user login succeeded, store token in device and userData in app state
       * */

      if ( token ) {
        console.log( 'login succeeded' );
        await authStorage.setToken( token );
        authStorage.login( user );
      }

      return loginResponse.data;
    } catch ( error ) {
      console.log( 'login error in hook', error );
      setError( error );
      return error;
    }
  };

  // Get currently logged in user's details
  const getAuthenticatedUser = async () => {
    const token = await authStorage.getToken();
    if ( token ) {
      console.log( 'token found', token );
    } else {
      console.log( 'no token', token );
    }
  };

  const getToken = async () => {
    try {
      const token = await authStorage.getToken();
      setToken( token );
    } catch ( e ) {
      console.log( e );
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
      const user = await axios.get( URL, options );
      return user.data;
    } catch ( e ) {
      console.log( e );
    }
  };

  const fetchAvatar = async ( userId ) => {
    const { getFilesByTag } = useTag();
    try {
      const avatarArray = await getFilesByTag( 'avatar_' + userId );
      const avatar = avatarArray.pop();
      setAvatar(avatar);
      // console.log( 'avatar', avatar );
      return uploadsUrl + avatar.filename;
    } catch ( error ) {
      console.error( error.message );
    }
  };

  // Modify registered user account details
  const modifyUser = async () => {};

  return {
    register,
    login,
    getAuthenticatedUser,
    getToken,
    getUserById,
    modifyUser,
    getUserByToken,
    fetchAvatar,
    loading,
    error,
    token,
    avatar,
  };
};

export default useUser;
