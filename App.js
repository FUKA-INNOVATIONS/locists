import { StatusBar } from 'expo-status-bar'
import AppNavigator from './src/navigator/AppNavigator'

import AuthStorage from './src/utils/authStorage'
import UserStorage from './src/utils/userStorage'

import AuthStorageContext from './src/context/AuthStorageContext'
import UserStorageContext from './src/context/UserStorageContext'

// Create new instance of authentication storage
const authStorage = new AuthStorage()

// Create new instance of the user data storage
const userDataStorage = new UserStorage()

export default function App() {
  return (
    <>
      <AuthStorageContext.Provider value={authStorage}>
        <UserStorageContext.Provider value={userDataStorage}>
          <AuthStorageContext.Consumer>
            {({ isLogged }) => {
              return <AppNavigator userStatus={isLogged} />
            }}
          </AuthStorageContext.Consumer>
        </UserStorageContext.Provider>
      </AuthStorageContext.Provider>
      <StatusBar style="auto" />
    </>
  )
}
