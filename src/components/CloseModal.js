import { Text, TouchableOpacity } from 'react-native'
import theme from '../theme'

const CloseModal = ( { navigation } ) => {
  const onModalCloseHandler = () => {
    navigation.goBack()
  }

  return (
    <TouchableOpacity onPress={onModalCloseHandler}>
      <Text style={{color: theme.colors.bgYellow}}>X</Text>
    </TouchableOpacity>
  )
}

export default CloseModal