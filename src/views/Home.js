import { View, Text } from 'react-native'
import HomeList from '../components/HomeList'

import AuthStorageContext from '../context/AuthStorageContext'

const Home = ( {navigation} ) => {
  return (
      <AuthStorageContext.Consumer>
        { value => {
          return (
              <View style={ { marginTop: 50, marginHorizontal: 10 } }>
                <Text>You are: { value.isLogged
                    ? 'logged in'
                    : 'logged out' }</Text>
                <HomeList navigation={navigation}/>
              </View>
          );
        } }
      </AuthStorageContext.Consumer>
  );
};

export default Home
