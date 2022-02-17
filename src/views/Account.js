import { useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';

import useAuthStorage from '../hooks/useAuthStorage';
import useUserStorage from '../hooks/useUserStorage';

const Account = ( { navigation } ) => {
  const authStorage = useAuthStorage();
  const userStorage = useUserStorage();
  const [ userData, setUserData ] = useState( {} );

  useEffect( async () => {
    const username = await userStorage.getUsername().then();
    setUserData( {...userData, username } );
  } );

  const logoutHandler = async () => {
    await authStorage.logout().then( navigation.navigate( 'Home' ) );
  };
  return (
      <View>
        <Text>User status: { authStorage.isLogged && 'logged in' }</Text>
        <Text>Username: { userData.username }</Text>
        <Button title={ 'Log out' } onPress={ logoutHandler }/>
      </View>
  );
};

export default Account;