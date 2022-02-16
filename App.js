import { StatusBar } from 'expo-status-bar';

import UserStorage from './src/utils/userStorage';
import UserStorageContext from './src/context/UserStorageContext';

import AppNavigator from './src/navigator/AppNavigator';

import Main from './src/views/Main';

// Create new instance of the storage
const userDataStorage = new UserStorage();


export default function App() {
  return (
      <>
        <UserStorageContext.Provider value={userDataStorage}>
          {/* <Main /> */}
          { <AppNavigator /> }
        </UserStorageContext.Provider>
        <StatusBar style="auto"/>

      </>
  );
}

