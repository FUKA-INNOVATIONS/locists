import { useCallback, useState } from 'react';
import { Button, Text, View, Image } from 'react-native';
import useAuthStorage from '../hooks/useAuthStorage';
import UploadMedia from '../components/UploadMedia';
import fetchAvatar from '../utils/fetchAvatar';
import { useFocusEffect } from '@react-navigation/native';

const Account = ( { navigation } ) => {
  const { user } = useAuthStorage();
  const authStorage = useAuthStorage();
  const [ avatar, setAvatar ] = useState( null );

  const logoutHandler = async () => {
    await authStorage.logout();
  };

  return (
      <View>
        <Image source={ { uri: user.avatar } }
               style={ { width: 100, height: 100 } }/>
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
