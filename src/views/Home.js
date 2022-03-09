import HomeList from '../components/HomeList'
import useUser from '../hooks/useUser'
import React, { useEffect, useMemo } from 'react'
import useAuthStorage from '../hooks/useAuthStorage'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import AppName from '../../assets/AppName.svg'
import theme from '../theme'

const Home = ( { navigation } ) => {
  // console.log( 'Home.js', Platform.OS, Dimensions.get('screen').width )
  const authStorage = useAuthStorage()
  const { loginWithToken } = useUser()
  // const [ loading, setLoading ] = useState()

  const login = useMemo( async () => {
    // setLoading(true)
    const token = await authStorage.getToken()
    await loginWithToken( token )
    // setLoading(false)
  }, [] )

  // if ( loading ) return <Loading text={ 'Authenticating' } />

  useEffect( async () => {
    await login
    return navigation.addListener( 'focus', async () => {
      console.log( 'Home.js focus' )
      await login
    } )
  }, [] )

  // const smallScreen = Dimensions.get( 'screen' ).width <= 390
  // const bigScreenStyle = { maxWidth: 600, alignSelf: 'center' }
  // const smallScreenStyle = { maxWidth: 400 }

  return (
    <>
      <View style={ theme.appName }>
        <AppName width={ 100 } height={ 50 } />
      </View>
      <HomeList navigation={ navigation } />
    </>

  )
}

Home.propTypes = {
  navigation: PropTypes.object,
}

export default Home
