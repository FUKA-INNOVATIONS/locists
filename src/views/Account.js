import { Button, Text, View } from 'react-native'

import useAuthStorage from '../hooks/useAuthStorage'
import UploadMedia from '../components/UploadMedia';

const Account = ({ navigation }) => {
  const {user, isLogged} = useAuthStorage()
  const authStorage = useAuthStorage();

  const logoutHandler = async () => {
    await authStorage.logout().then(navigation.navigate('Explore'))
  }
  return (
    <View>
      <Text>User status: {isLogged && 'logged in'}</Text>
      <Text>Username: {user.username}</Text>
      <Text>Email: {user.email}</Text>
      <Text>User id: {user.user_id}</Text>
      <Text>Full name: {user.full_name}</Text>
      <Button title={'Log out'} onPress={logoutHandler} />
      <UploadMedia mediaType={'profileImage'} ussername={user.username} />
    </View>
  )
}

export default Account
