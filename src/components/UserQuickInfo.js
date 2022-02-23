import { View, Image, Text } from 'react-native';
import useAuthStorage from '../hooks/useAuthStorage';
import { useEffect } from 'react';
import theme from '../theme';
import useUser from '../hooks/useUser';

const UserQuickInfo = () => {
  // const { user } = useAuthStorage();
  const { avatar, fetchAvatar } = useUser();

  /* useEffect(() => {
    fetchAvatar(user.user_id)
      }
  ), [user.user_id]; */

  return (
      <View styles={ { ...theme.userQuickInfo } }>
        <Image source={ { uri: avatar } } style={ { width: 50, height: 50 } }/>
        <Text>{ /* user.username */ }</Text>
      </View>
  );
};

export default UserQuickInfo;