import { useState } from 'react'
import axios from 'axios'

// TODO: use appId
import { baseUrl, uploadsUrl } from '../../config'
import useAuthStorage from './useAuthStorage'
import useTag from './useTag'
import doFetch from '../utils/doFetch'

const useUser = () => {
  const authStorage = useAuthStorage()
  const [ loading, setLoading ] = useState( false )

  // Create new user account
  const register = async ( username, password, email, fullName ) => {
    const newUser = {
      username,
      password,
      email,
      full_name: fullName,
    }

    const URL = `${ baseUrl }users`
    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
      // body: JSON.stringify( newUser ),
    }

    try {
      setLoading( true )
      const registeredUser = await axios.post( URL, newUser, options )
      setLoading( false )
      return registeredUser.data
    } catch ( error ) {
      console.log( 'register error', error )
      setLoading( false )
      return error
    }
  }

  const isUsernameAvailable = async ( username ) => {
    const URL = `${ baseUrl }users/username/${ username }`
    try {
      console.log( 'check' )
      const available = await axios.get( URL )
      return available.data
    } catch ( e ) {
      console.log( 'error in isUsernameAvailable', e )
    }
  }

  // Authenticate and login user
  const login = async ( loginCredentials ) => {
    const URL = `${ baseUrl }login`
    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify( loginCredentials ),
    }
    try {
      const loginResponse = await axios.post( URL, loginCredentials, options )
      const { token, user } = loginResponse.data

      /*
       * If user login succeeded,
       * store token in device
       * userData and avatar link in app state -> user obj
       * */

      if ( token ) {
        console.log( 'login succeeded' )
        await authStorage.setToken( token )
        user.avatar = await fetchAvatar( user.user_id )
        user.isLogged = true
        authStorage.login( user )
      }
      return loginResponse.data
    } catch ( error ) {
      console.log( 'login error in hook', error )
      return error
    }
  }

  /*
   * Fetch and return user avatar link
   * */
  const fetchAvatar = async ( userId ) => {
    const { getFilesByTag } = useTag()
    try {
      const avatarArray = await getFilesByTag( 'avatar_' + userId )
      const avatar = avatarArray.pop()
      if ( avatar !== undefined ) {
        authStorage.user.avatar = uploadsUrl + avatar.filename
        return uploadsUrl + avatar.filename
      }
    } catch ( error ) {
      console.error( error.message )
    }
  }

  const loginWithToken = async ( token ) => {
    if ( token ) {
      try {
        const user = await getUserByToken( token )
        if ( user ) {
          const avatar = await fetchAvatar( user.user_id )
          user.isLogged = true
          user.avatar = avatar
          user.token = token
          authStorage.login( user )
        }
      } catch ( e ) {
        console.log( 'error in loginWithToken hook', e )
      }
    }
    return null
  }

  // Get currently logged in user's details
  const getAuthenticatedUser = async () => {
    const token = await authStorage.getToken()
    if ( token ) {
      console.log( 'token found', token )
    } else {
      console.log( 'no token', token )
    }
  }

  // Get user details by id
  const getUserById = async () => {}

  const getUserByToken = async ( token ) => {
    const URL = `${ baseUrl }users/user`
    const options = {
      method: 'GET',
      headers: { 'x-access-token': token },
    }
    try {
      const user = await axios.get( URL, options )
      return user.data
    } catch ( e ) {
      console.log( e )
    }
  }

  // Modify registered user account details
  const modifyUser = async ( updateDetails ) => {
    const token = await authStorage.getToken()
    console.log( 'details', updateDetails )
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
      body: JSON.stringify( updateDetails ),
    }
    try {
      return await doFetch( baseUrl + 'users', options )
    } catch ( e ) {
      console.log( 'error in modifyUser', e )
    }
  }

  return {
    register,
    login,
    getAuthenticatedUser,
    getUserById,
    modifyUser,
    getUserByToken,
    fetchAvatar,
    loginWithToken,
    isUsernameAvailable,
    loading,
  }
}

export default useUser
