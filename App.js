import React from 'react'
import { StatusBar } from 'expo-status-bar'
import AppNavigator from './src/navigator/AppNavigator'

import AuthStorage from './src/utils/authStorage'
import AuthStorageContext from './src/context/AuthStorageContext'
import theme from './src/theme'
import { SafeAreaView } from 'react-native'

// Create new instance of authentication storage
const authStorage = new AuthStorage()

export default function App() {
  console.log( 'App.js' )
  return (
    <>
      <AuthStorageContext.Provider value={ authStorage }>
        <SafeAreaView style={ theme.AndroidSafeArea }>
          <AppNavigator />
        </SafeAreaView>
      </AuthStorageContext.Provider>
      <StatusBar style='light' />
    </>
  )
}
