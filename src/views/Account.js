import { Button, Text, View } from 'react-native'

import useAuthStorage from '../hooks/useAuthStorage'

const Account = ({ navigation }) => {
  const authStorage = useAuthStorage()

  const logoutHandler = async () => {
    await authStorage.logout().then(navigation.navigate('Explore'))
  }
  return (
    <View>
      <Text>User status: {authStorage.isLogged && 'logged in'}</Text>
      <Text>Username: {authStorage.user.username}</Text>
      <Text>Email: {authStorage.user.email}</Text>
      <Text>User id: {authStorage.user.user_id}</Text>
      <Text>Full name: {authStorage.user.full_name}</Text>
      <Button title={'Log out'} onPress={logoutHandler} />
    </View>
  )
}

export default Account
