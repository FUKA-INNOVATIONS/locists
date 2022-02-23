import { StatusBar } from 'expo-status-bar';
import AppNavigator from './src/navigator/AppNavigator';

import AuthStorage from './src/utils/authStorage';
import AuthStorageContext from './src/context/AuthStorageContext';
import { useEffect } from 'react';
import useUser from './src/hooks/useUser';
import useAuthStorage from './src/hooks/useAuthStorage';

// Create new instance of authentication storage
const authStorage = new AuthStorage();

export default function App() {
  const authStorage = useAuthStorage()
  const { avatar, fetchAvatar } = useUser();

  useEffect( async () => {
    const token = await authStorage.getToken();
    console.log('APP.js token', token)
    /*if ( token ) {
      const user = await getUserByToken( token );
      if ( user.user_id !== null ) {
        user.avatar = avatar;
        authStorage.login( user, token );
      }
    } */
  } );

  return (
      <>
        <AuthStorageContext.Provider value={ authStorage }>
            <AppNavigator/>
        </AuthStorageContext.Provider>
        <StatusBar style="auto"/>
      </>
  );
}
