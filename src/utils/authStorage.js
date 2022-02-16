import AsyncStorage from '@react-native-async-storage/async-storage';

/*
 * Handling authentication
 * */

class AuthStorage {

  constructor() {
    this.isLogged = false;
  }

  /* getStatus() {
    return this.isLogged
  }

  setStatusAsLogged()  {
    this.isLogged = true
  }

  setStatusAsLoggedOut()  {
    this.isLogged = false
  } */

  // Get the access token from the storage
  async getToken() {
    try {
      const token = await AsyncStorage.getItem( 'token' );
      if ( token !== null ) {
        // value previously stored
        return token;
      } else {
        return null
      }
    } catch ( e ) {
      console.log(e)
    }
  }

  // Store token and login user
  async setToken(token) {
    try {
      await AsyncStorage.setItem( 'token', token );
      this.isLogged = true
    } catch ( e ) {
      console.log(e)
    }
  }

  // Log out
  async logout() {
    try {
      await AsyncStorage.removeItem('token');
      this.isLogged = false
    } catch(error) {
      console.log(error)
    }
  }

}

export default AuthStorage;

