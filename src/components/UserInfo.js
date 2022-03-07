import { View, Image, Text } from 'react-native'

const UserInfo = ( { username, avatar } ) => {

  return (
    <View style={ { flexDirection: 'row', alignItems: 'center', marginBottom: 5 } }>
      <Image source={ { uri: avatar } } style={ {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#fff',
      } } />
      <Text style={ { color: '#E9D6DB', marginLeft: 10 } }>{ username }</Text>
    </View>
  )

}

export default UserInfo