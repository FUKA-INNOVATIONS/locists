import HomeList from '../components/HomeList'
import useUser from '../hooks/useUser'
import { useEffect, useMemo } from 'react'
import useAuthStorage from '../hooks/useAuthStorage'

const Home = ( { navigation } ) => {
  const authStorage = useAuthStorage()
  const { loginWithToken } = useUser()

  const login = useMemo( async () => {
    const token = await authStorage.getToken()
    await loginWithToken( token )
  }, [] )

  console.log( 'Home.js' )

  useEffect( async () => {
    await login
    return navigation.addListener( 'focus', async () => {
      console.log( 'HomeList focus' )
      await login
    } )
  }, [] )

  return <HomeList navigation={ navigation } />
}

export default Home
