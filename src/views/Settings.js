import { View, Text, Button } from 'react-native';

const Settings = ( { navigation } ) => {

  const onModalCloseHandler = () => {
    navigation.goBack();
  }

    return (
        <View style={ { marginTop: 50, marginHorizontal: 10 } }>
          <Button title={'Go back'} onPress={onModalCloseHandler} />
          <Text>Settings Page</Text>
        </View>
    );

};

export default Settings;