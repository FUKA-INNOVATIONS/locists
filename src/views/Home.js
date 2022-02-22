import { View, Text } from 'react-native';
import HomeList from '../components/HomeList';
import { useIsFocused } from '@react-navigation/native';
import useAuthStorage from '../hooks/useAuthStorage';
import useUser from '../hooks/useUser';
import { useEffect } from 'react';

const Home = ( { navigation } ) => {
  const { token, getToken, getUserByToken } = useUser();
  const authStorage = useAuthStorage();
  // eslint-disable-next-line
  const viewFocused = useIsFocused(); // workaround to force re-render this component
  console.log( 'user in app state', useAuthStorage() );

  useEffect( async () => {
    await getToken();
    if ( token ) {
      const user = await getUserByToken( token );
      if ( user.id !== null ) {
        authStorage.login( user, token );
      }
    }
  } );

  return (
      <View style={ { marginTop: 50, marginHorizontal: 10 } }>
        <Text>You are logged { authStorage.isLogged ? 'in' : 'out' }</Text>
        <HomeList navigation={ navigation }/>
      </View>
  );
};

export default Home;
