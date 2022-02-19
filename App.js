import { StatusBar } from 'expo-status-bar';
import AppNavigator from './src/navigator/AppNavigator';

import AuthStorage from './src/utils/authStorage';
import AuthStorageContext from './src/context/AuthStorageContext';

// Create new instance of authentication storage
const authStorage = new AuthStorage();

export default function App() {
  return (
      <>
        <AuthStorageContext.Provider value={ authStorage }>
            <AppNavigator/>
        </AuthStorageContext.Provider>
        <StatusBar style="auto"/>
      </>
  );
}
