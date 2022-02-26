import HomeList from '../components/HomeList';
import useUser from '../hooks/useUser';
import { useEffect, useMemo } from 'react';
// import useAuthStorage from '../hooks/useAuthStorage';

const Home = ( { navigation } ) => {
  // const {user} = useAuthStorage();
  const { getToken, loginWithToken } = useUser();
  // const token = useMemo(async() => await getToken(), [])
  // const login = useMemo(async() => await loginWithToken(token), [])

  /* const loginw = useMemo(async() => {
    const token = await getToken();
    await loginWithToken(token);
  }, []) */

  // console.log('user, Home.js', user)

  useEffect( async () => {
    const tokenInDevice = await getToken();
    await loginWithToken(tokenInDevice);
    // await token;
    // await login;
    // await loginw;
  });

  return <HomeList navigation={ navigation }/>
};

export default Home;
