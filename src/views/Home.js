import { View, Text } from 'react-native';
import HomeList from '../components/HomeList';
import { useIsFocused } from '@react-navigation/native';
import useAuthStorage from '../hooks/useAuthStorage';

const Home = ( { navigation } ) => {
  const { isLogged } = useAuthStorage();
  // workaround to force re-render this component
  const viewFocused = useIsFocused();

  console.log( 'user in app state', useAuthStorage() );

  return (
      <View style={ { marginTop: 50, marginHorizontal: 10 } }>
        <Text>You are logged { isLogged ? 'in' : 'out' }</Text>
        <HomeList navigation={ navigation }/>
      </View>
  );
};

export default Home;
