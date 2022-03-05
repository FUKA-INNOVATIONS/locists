import AsyncStorage from '@react-native-async-storage/async-storage'

/*
 * Handling authentication
 * */

class AuthStorage {
  constructor() {
    this.user = { isLogged: false }
  }

  // Get the access token from the storage
  async getToken() {
    try {
      const token = await AsyncStorage.getItem( 'token' )
      if ( token !== null ) {
        return token
      } else {
        return null
      }
    } catch ( e ) {
      console.log( e )
    }
  }

  // Store token and login user
  async setToken( token ) {
    try {
      await AsyncStorage.setItem( 'token', token )
      this.user.token = token
    } catch ( e ) {
      console.log( e )
    }
  }

  login( user ) {
    this.user = user
    console.log( 'User obj (authStorage.login())', user )
  }

  updateState( newState ) {
    this.user = newState
  }

  // Log out
  async logout() {
    try {
      await AsyncStorage.removeItem( 'token' )
      this.user = { isLogged: false }
    } catch ( error ) {
      console.log( error )
    }
  }
}

export default AuthStorage
