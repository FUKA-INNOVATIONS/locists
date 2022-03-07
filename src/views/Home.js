import HomeList from '../components/HomeList'
import useUser from '../hooks/useUser'
import { useEffect, useMemo } from 'react'
import useAuthStorage from '../hooks/useAuthStorage'
import { View } from 'react-native'
import AppName from '../../assets/AppName.svg'
import theme from "../theme";

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

  return (
      <>
        <View style={ theme.appName }>
          <AppName width={100} height={50}/>
        </View>
        <HomeList navigation={ navigation } />
      </>

  )
}

export default Home
