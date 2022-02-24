import { useCallback, useState } from 'react';
import { Button, Text, View, Image } from 'react-native';
import useAuthStorage from '../hooks/useAuthStorage';
import { useFocusEffect } from '@react-navigation/native';

const Account = ( { navigation } ) => {
  const { user } = useAuthStorage();
  const authStorage = useAuthStorage();
  const [ update, setUpdate ] = useState( false );

  const logoutHandler = async () => {
    await authStorage.logout();
    user.isLogged && navigation.navigate( 'AccountTab', {Screen: 'Account'} );
    // setUpdate( true );
  };

  /*  If user is logged in
   *   Hide Authentication view and move to Account view
   * */

  useFocusEffect(
      useCallback( () => {
        return () => {
          // user.isLogged && navigation.navigate( 'AccountTab', {Screen: 'Account'} );
          // setUpdate( false );
        };
      }, [ update ] ),
  );

  return (
      <View>
        <Button title={'Modify your account details'} onPress={() => navigation.navigate('ModifyAccount')} />
        { user.avatar ? <Image source={ { uri: user.avatar } }
                               style={ { width: 100, height: 100 } }/>
            : <Text>You don't own an avatar</Text> // eslint-disable-line
        }
        <Text>User status: { user.isLogged && 'logged in' }</Text>
        <Text>Username: { user.username }</Text>
        <Text>Email: { user.email }</Text>
        <Text>User id: { user.user_id }</Text>
        <Text>Full name: { user.full_name }</Text>
        <Button title={ 'Log out' } onPress={ logoutHandler }/>
      </View>
  );
};

export default Account;
