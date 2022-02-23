import AsyncStorage from '@react-native-async-storage/async-storage';

/*
 * Handling authentication
 * */

class AuthStorage {
  constructor() {
    // this.isLogged = false;
    this.user = {};
    // this.token = null;
    // this.avatar = null;
  }

  // Get the access token from the storage
  async getToken() {
    try {
      const token = await AsyncStorage.getItem( 'token' );
      if ( token !== null ) {
        return token;
      } else {
        return null;
      }
    } catch ( e ) {
      console.log( e );
    }
  }

  // Store token and login user
  async setToken( token ) {
    try {
      await AsyncStorage.setItem( 'token', token );
      this.user.token = token;
    } catch ( e ) {
      console.log( e );
    }
  }

  login(user) {
    // this.user.isLogged = true;
    // this.user = {...user, user};
    // this.token = token;
    this.user = user
    console.log('USER', user)
  }

  // Log out
  async logout() {
    try {
      await AsyncStorage.removeItem( 'token' );
      // this.isLogged = false;
      this.user = {};
      // this.token = null;
    } catch ( error ) {
      console.log( error );
    }
  }
}

export default AuthStorage;
