import HomeList from '../components/HomeList'
import useUser from '../hooks/useUser'
import { useEffect, useMemo } from 'react'
import useAuthStorage from '../hooks/useAuthStorage'

const Home = ( { navigation } ) => {
  console.log( 'Home.js' )
  const authStorage = useAuthStorage()
  const { loginWithToken } = useUser()

  const login = useMemo( async () => {
    const token = await authStorage.getToken()
    await loginWithToken( token )
  }, [] )

  useEffect( async () => {
    await login
    return navigation.addListener( 'focus', async () => {
      console.log( 'Home.js focus' )
      await login
    } )
  }, [] )

  return <HomeList navigation={ navigation } />
}

export default Home
