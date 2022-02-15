import { useState } from 'react';
import { View } from 'react-native';
import SwitchSelector from 'react-native-switch-selector';

import theme from '../theme';
import Login from '../components/Login';
import Register from '../components/Register';
// import useUserStorage from '../hooks/useUserStorage';

const Authenticate = props => {
  // const [ isLoggedIn, setIsLoggedIn ] = useState( false );
  // const [ token, setToken ] = useState( null );
  const [ activeView, setActiveView ] = useState( 'signIn' );
  // const userStorage = useUserStorage();

  /*
   * Check if user is already logged in
   * I user is logged in, Redirect user to profile page
   * */
  /* useEffect( () => {
    console.log( isLoggedIn );
    const checkIsLoggedIn = async () => {
      console.log( await userStorage.getToken() );
      return await userStorage.getToken();
    };

    const token = checkIsLoggedIn();

    if ( token !== null ) {
      console.log( 'User is logged in' );
      //Alert.alert( 'You are logged in' );
      setToken(token)
    } else {
      console.log( 'User is not logged in' );
      //Alert.alert( 'You are not logged in' );
    }

  } ); */

  const viewOptions = [
    {
      label: 'Sign in',
      value: { view: 'signIn' },
      // imageIcon: images.feminino //images.feminino = require('./path_to/assets/img/feminino.png')
    },
    {
      label: 'Register',
      value: { view: 'register' },
    },
  ];
  const setView = view => {
    setActiveView( view );
  };

  return (
      <View>
        <SwitchSelector
            textColor={ theme.colors.textPrimary }
            buttonColor={ theme.colors.primary }
            options={ viewOptions }
            initial={ 0 }
            onPress={ value => setView( value.view ) }
        />

        { activeView === 'signIn' ? <Login/> : <Register/> }
      </View>

  )
      ;
};

export default Authenticate;