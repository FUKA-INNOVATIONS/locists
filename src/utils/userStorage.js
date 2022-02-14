import AsyncStorage from '@react-native-async-storage/async-storage';

/*
 * Handling user data on user device
 * */

class UserStorage {

  // Get the access token from the storage
  async getToken() {
    try {
      const token = await AsyncStorage.getItem( 'token' );
      if ( token !== null ) {
        // value previously stored
        return token;
      }
    } catch ( e ) {
      // error reading value
    }
  }

  // Store token
  async setToken(token) {
    try {
      await AsyncStorage.setItem( 'token', token );
    } catch ( e ) {
      // saving error
    }
  }

  // Store access token
  async setUsername(username) {
    try {
      await AsyncStorage.setItem( 'username', username );
    } catch ( e ) {
      // saving error
    }
  }

  async getUsername() {
    try {
      const username = await AsyncStorage.getItem( 'username' );
      if ( username !== null ) {
        // value previously stored
        return username;
      }
    } catch ( e ) {
      // error reading value
    }
  }

}

export default UserStorage;

