import { useState } from 'react';
import { View } from 'react-native';
import SwitchSelector from 'react-native-switch-selector';

import theme from '../theme';
import Login from '../components/Login';
import Register from '../components/Register';

const Authenticate = ( { navigation } ) => {
  const [ activeView, setActiveView ] = useState( 'signIn' );
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

  const setView = ( view ) => {
    setActiveView( view );
  };

  return (
      <View>
        <SwitchSelector
            textColor={ theme.colors.textPrimary }
            buttonColor={ theme.colors.primary }
            options={ viewOptions }
            initial={ 0 }
            onPress={ ( value ) => setView( value.view ) }
        />

        { activeView === 'signIn' ? (
            <Login navigation={ navigation }/>
        ) : (
            <Register navigation={ navigation }/>
        ) }
      </View>
  );
};

export default Authenticate;
