import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import HomeList from '../components/HomeList';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import useAuthStorage from '../hooks/useAuthStorage';
import useUser from '../hooks/useUser';
import { useCallback, useEffect } from 'react';
import theme from '../theme';
import fetchAvatar from '../utils/fetchAvatar';

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
      if ( user.user_id !== null ) {
        authStorage.login( user, token );
      }
    }
  } );

  /* useFocusEffect(
      useCallback( () => {
        return async () => {
          await getToken();
          if ( token ) {
            const user = await getUserByToken( token );
            if ( user.id !== null ) {
              authStorage.login( user, token );
            }
          }
        };
      }, [] ),
  ); */

  return (

          <View style={ { ...theme.mainPadding } }>
            <HomeList navigation={ navigation }/>
          </View>

  );
};

export default Home;
