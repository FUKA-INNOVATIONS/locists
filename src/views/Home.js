import { View } from 'react-native';
import HomeList from '../components/HomeList';
import useUser from '../hooks/useUser';
import { useEffect } from 'react';

const Home = ( { navigation } ) => {
  const { getToken, loginWithToken } = useUser();

  useEffect( async () => {
    const tokenInDevice = await getToken();
    await loginWithToken(tokenInDevice);
  } );

  return (
      <View>
        <HomeList navigation={ navigation }/>
      </View>
  );
};

export default Home;
