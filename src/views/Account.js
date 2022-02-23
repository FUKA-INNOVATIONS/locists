import { useCallback, useEffect, useState } from 'react';
import { Button, Text, View, Image } from 'react-native';
import useAuthStorage from '../hooks/useAuthStorage';
import UploadMedia from '../components/UploadMedia';
import fetchAvatar from '../utils/fetchAvatar';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';

const Account = ( { navigation } ) => {
  const { user } = useAuthStorage();
  const authStorage = useAuthStorage();
  const viewIsFocused = useIsFocused();
  const [ update, setUpdate ] = useState( false );

  const logoutHandler = async () => {
    await authStorage.logout();
    setUpdate( true );
  };

  /*  If user is logged in
   *   Hide Authentication view and move to Account view
   * */

  useFocusEffect(
      useCallback( () => {
        return () => {
          user.isLogged && navigation.navigate( 'HomeTab', {Scree: 'Home'} );
          setUpdate( false );
        };
      }, [ update ] ),
  );

  return (
      <View>
        { user.avatar ? <Image source={ { uri: user.avatar } }
                               style={ { width: 100, height: 100 } }/>
            : <Text>You don't own an avatar</Text>
        }
        <Text>User status: { user.isLogged && 'logged in' }</Text>
        <Text>Username: { user.username }</Text>
        <Text>Email: { user.email }</Text>
        <Text>User id: { user.user_id }</Text>
        <Text>Full name: { user.full_name }</Text>
        <Button title={ 'Log out' } onPress={ logoutHandler }/>
        <UploadMedia mediaType={ 'avatar' } ussername={ user.username }/>
      </View>
  );
};

export default Account;
