import { View, Text } from 'react-native';
import HomeList from '../components/HomeList';
import { useIsFocused } from '@react-navigation/native';
import useAuthStorage from '../hooks/useAuthStorage';
import useUser from '../hooks/useUser';
import { useEffect, useState } from 'react';

const Home = ( { navigation } ) => {
  const { getToken, loginWithToken } = useUser();
  const {user} = useAuthStorage();
  // eslint-disable-next-line
  const viewFocused = useIsFocused(); // workaround to force re-render this component
  console.log( 'user in app state', useAuthStorage() );

  useEffect( async () => {
    const tokenInDevice = await getToken();
    await loginWithToken(tokenInDevice);
  } );

  return (
      <View style={ { marginTop: 50, marginHorizontal: 10 } }>
        <Text>You are logged { user.isLogged ? 'in' : 'out' }</Text>
        <HomeList navigation={ navigation }/>
      </View>
  );
};

export default Home;
