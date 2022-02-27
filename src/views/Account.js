import { useCallback, useState } from 'react';
import { Button, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import useAuthStorage from '../hooks/useAuthStorage';
import UploadMedia from '../components/UploadMedia';
import { useFocusEffect } from '@react-navigation/native';
import theme from "../theme";

const Account = ( { navigation } ) => {
  const { user } = useAuthStorage();
  const authStorage = useAuthStorage();
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
          user.isLogged && navigation.navigate( 'HomeTab', {Screen: 'Home'} );
          setUpdate( false );
        };
      }, [ update ] ),
  );

  return (
      <ScrollView>
        <View style={theme.profile}>
          <View style={theme.profilePicAndInfo}>
              <Text style={theme.profilePic}>ProPic Placeholder</Text>

              <View style={theme.profileInfoCard}>
                  <Text>User: { user.username }</Text>
                  <Text>UserID: { user.user_id }</Text>
                  <Text>{ user.email }</Text>
                  <Text>{ user.full_name }</Text>
              </View>
          </View>

        <Button title={'Modify your account details'} onPress={() => navigation.navigate('ModifyAccount')} />
        { user.avatar ? <Image source={ { uri: user.avatar } }
                               style={ { width: 100, height: 100 } }/>
            :
            <Text style={theme.profilePic}>
                {
                    // TODO media task: add default optimized image here
                }
                You do not own an avatar
            </Text> // eslint-disable-line
        }
        <Text>User status: { user.isLogged && 'logged in' }</Text>
          <TouchableOpacity style={theme.generalBtn} onPress={ logoutHandler }>
              <Text style={theme.loginButtonText}>Log Out</Text>
          </TouchableOpacity>
        <UploadMedia mediaType={ 'avatar' } ussername={ user.username }/>
        </View>
      </ScrollView>
  );
};

export default Account;
