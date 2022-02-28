import { View, Image, Text } from 'react-native';
import fetchAvatar from '../utils/fetchAvatar';
import { useEffect } from 'react';

const UserInfo = ( { username, avatar } ) => {

  return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image source={{uri: avatar}} style={{width: 50, height: 50, borderRadius: 25}} />
        <Text style={{ color: 'white', marginLeft: 10 }}>{username}</Text>
      </View>
  )

};

export default UserInfo;