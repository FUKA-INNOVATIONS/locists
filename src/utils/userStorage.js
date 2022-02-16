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

  // Store username
  async setUsername(username) {
    try {
      await AsyncStorage.setItem( 'username', username );
    } catch ( e ) {
      // saving error
    }
  }

  // Get username
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

  // Store user id
  async setId(userId) {
    try {
      await AsyncStorage.setItem( 'userId', userId.toString() );
    } catch ( e ) {
      // saving error
    }
  }

  // Get user id
  async getId() {
    try {
      const userId = await AsyncStorage.getItem( 'userId' );
      if ( userId !== null ) {
        // value previously stored
        return parseInt(userId);
      }
    } catch ( e ) {
      // error reading value
    }
  }


  // Store user email
  async setEmail(email) {
    try {
      await AsyncStorage.setItem( 'email', email );
    } catch ( e ) {
      // saving error
    }
  }

  // Get user email
  async getEmail() {
    try {
      const email = await AsyncStorage.getItem( 'email' );
      if ( email !== null ) {
        // value previously stored
        return email;
      }
    } catch ( e ) {
      // error reading value
    }
  }

  // Store user full name
  async setFullName(fullName) {
    try {
      await AsyncStorage.setItem( 'fullName', fullName );
    } catch ( e ) {
      // saving error
    }
  }

  // Get user full name
  async getFullName() {
    try {
      const fullName = await AsyncStorage.getItem( 'fullName' );
      if ( fullName !== null ) {
        // value previously stored
        return fullName;
      }
    } catch ( e ) {
      // error reading value
    }
  }

  // Store user registration time
  async setAccountCreated(accountCreated) {
    try {
      await AsyncStorage.setItem( 'accountCreated', accountCreated );
    } catch ( e ) {
      // saving error
    }
  }

  // Get user registration time
  async getAccountCreated() {
    try {
      const accountCreated = await AsyncStorage.getItem( 'accountCreated' );
      if ( accountCreated !== null ) {
        // value previously stored
        return accountCreated;
      }
    } catch ( e ) {
      // error reading value
    }
  }

  // Log out
  async logout() {
    try {
      await AsyncStorage.clear();
    } catch(error) {
      console.log(error)
    }
  }

}

export default UserStorage;

