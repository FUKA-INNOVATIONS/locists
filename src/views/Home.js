import HomeList from '../components/HomeList';
import useUser from '../hooks/useUser';
import { useEffect } from 'react';
// import useAuthStorage from '../hooks/useAuthStorage';

const Home = ( { navigation } ) => {
  // const {user} = useAuthStorage();
  const { getToken, loginWithToken } = useUser();

  // console.log('user, Home.js', user)

  useEffect( async () => {
    const tokenInDevice = await getToken();
    await loginWithToken(tokenInDevice);
  });

  return <HomeList navigation={ navigation }/>
};

export default Home;
