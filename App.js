import { StatusBar } from 'expo-status-bar'
import AppNavigator from './src/navigator/AppNavigator'

import AuthStorage from './src/utils/authStorage'
import AuthStorageContext from './src/context/AuthStorageContext'
import theme from './src/theme'
import { SafeAreaView, View, Dimensions, StyleSheet } from 'react-native'
import * as SplashScreen from 'expo-splash-screen';
import React, {useCallback, useEffect, useState} from 'react'
import { SplashScreenLogo, SplashBack } from './src/utils'

// Create new instance of authentication storage
const authStorage = new AuthStorage()
const dimensions = Dimensions.get( 'screen' )
console.log(dimensions);
export default function App() {

    const [appIsReady, setAppIsReady] = useState(false);

    useEffect( () => {
        async function prepare() {
            try {
                await new Promise(resolve => setTimeout(resolve, 4000));
            } catch (e) {
                console.warn(e);
            } finally {
                setAppIsReady(true);
            }
        }
        prepare();
    }, [] );

    const onLayoutRootView = useCallback(async () => {
        if (appIsReady) {
            // This tells the splash screen to hide immediately! If we call this after
            // `setAppIsReady`, then we may see a blank screen while the app is
            // loading its initial state and rendering its first pixels. So instead,
            // we hide the splash screen once we know the root view has already
            // performed layout.
            await SplashScreen.hideAsync();
        }
    }, [appIsReady]);

    if (!appIsReady) {
        return (
          <View style={ styles.splashScreen }>
              <SplashBack width={'130%'} height={'120%'} position={'absolute'} />
              <SplashScreenLogo width={dimensions.width * 0.7} height={dimensions.height * 0.8} />
          </View>
        )

    }

  console.log( 'App.js' )
  return (
    <>
      <AuthStorageContext.Provider value={ authStorage }>
        <SafeAreaView style={ theme.AndroidSafeArea }
                      onLayout={onLayoutRootView}>
          <AppNavigator />
        </SafeAreaView>
      </AuthStorageContext.Provider>
      <StatusBar style='light' />
    </>
  )
}

const styles = StyleSheet.create({
    splashScreen: {
        width: dimensions.width,
        height: dimensions.height,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    },
    splashBack: {
        width: dimensions.width,
        height: dimensions.height,
        position: 'absolute',
    }
})
