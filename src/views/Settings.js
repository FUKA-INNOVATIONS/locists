import {View, Button, Text, TouchableOpacity} from 'react-native'
import useAuthStorage from '../hooks/useAuthStorage'
import theme from '../theme'

const Settings = ( { navigation } ) => {
  const { user } = useAuthStorage()
  const authStorage = useAuthStorage()

    const onModalCloseHandler = () => {
        navigation.goBack();
    }

    const modifyProfile = (type) => {
        navigation.navigate( 'ModifyAccount', { type: type } )
    }

    const logoutHandler = async () => {
        await authStorage.logout();
        user.isLogged && navigation.navigate( 'AccountTab', { Screen: 'Account' } );
        // setUpdate( true );
    };

  return (
    <>
      <Button title={ 'Go back' } onPress={ onModalCloseHandler }/>
      <View style={ theme.settingsPage }>
        <TouchableOpacity style={ [theme.generalBtn, theme.settingsBtn] } onPress={ () => modifyProfile( 'details' ) }>
          <Text style={theme.loginButtonText}>Modify Account Details</Text>
        </TouchableOpacity>
        <TouchableOpacity style={ [theme.generalBtn, theme.settingsBtn] } onPress={ () => modifyProfile( 'picture' ) }>
          <Text style={theme.loginButtonText}>Change Profile Picture</Text>
        </TouchableOpacity>
        <TouchableOpacity style={ [theme.generalBtn, theme.settingsBtn, theme.logoutBtn] } onPress={ logoutHandler }>
          <Text style={theme.loginButtonText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </>
  )

}

export default Settings