import {DefaultTheme, NavigationContainer, useIsFocused} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../views/Home';
import AccountScreen from '../views/Account';
import AuthenticateScreen from '../views/Authenticate';
import SingleEventScreen from '../views/SingleEvent';
import SinglePostScreen from '../views/SinglePost';
import ExploreScreen from '../views/Explore';
import CreateEventScreen from '../views/CreateEvent';
import CreatePostScreen from '../views/createPost';
import SettingsScreen from '../views/Settings';

import useAuthStorage from '../hooks/useAuthStorage';
import TabBar from '../components/nav/TabBar';

const HomeStack = createNativeStackNavigator();
const ExploreStack = createNativeStackNavigator();
const CreateStack = createNativeStackNavigator();
const AuthenticationStack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

const HomeStackScreen = () => {
  return (
      <HomeStack.Navigator>
        <HomeStack.Screen name={ 'Home' }
                          component={ HomeScreen }/>
        <HomeStack.Group screenOptions={ { presentation: 'modal' } }>
          <HomeStack.Screen name={ 'SinglePostHomeStack' }
                            component={ SinglePostScreen }/>
          <HomeStack.Screen name={ 'SingleEvent' }
                            component={ SingleEventScreen }/>
        </HomeStack.Group>
      </HomeStack.Navigator>

  );
};

const ExploreStackScreen = () => {
  return (
      <ExploreStack.Navigator>
        <ExploreStack.Screen name={ 'Explore' } component={ ExploreScreen }/>
        <ExploreStack.Group screenOptions={ { presentation: 'modal' } }>
          <ExploreStack.Screen name={ 'SingleEvent' }
                               component={ SingleEventScreen }/>
          <ExploreStack.Screen name={ 'SinglePost' }
                               component={ SinglePostScreen }/>
        </ExploreStack.Group>
      </ExploreStack.Navigator>
  );
};

const CreateStackScreen = () => {
  return (
      <CreateStack.Navigator>
        <CreateStack.Group screenOptions={ { presentation: 'modal' } }>
          <CreateStack.Screen name={ 'CreatePost' }
                              component={ CreateEventScreen }/>
          <CreateStack.Screen name={ 'CreateEvent' }
                              component={ CreatePostScreen }/>
        </CreateStack.Group>
      </CreateStack.Navigator>
  );
};

const AuthenticationStackScreen = () => {
  const { user } = useAuthStorage();
  // TODO: test useFocusEffect
  // eslint-disable-next-line
  const viewIsFocused = useIsFocused();
  /* useEffect( () => {
   console.log( 'Login view focused' );
   }, [ viewIsFocused ] ); */

  return (
      <AuthenticationStack.Navigator>
        { !user.isLogged ? (
            <>
              <AuthenticationStack.Screen name={ 'Authenticate' }
                                          component={ AuthenticateScreen }/>
            </>
        ) : (
            <>
              <AuthenticationStack.Screen name={ 'Account' } component={ AccountScreen }/>
              <AuthenticationStack.Group screenOptions={ { presentation: 'modal' } }>
                <AuthenticationStack.Screen name={ 'ModifyAccount' } component={ SettingsScreen }/>
              </AuthenticationStack.Group>
            </>
        )
        }
      </AuthenticationStack.Navigator>
  );
};

const AppNavigator = ( props ) => {

    const navTheme = DefaultTheme;
    navTheme.colors.background = '#24292e';
    navTheme.colors.card = '#24292e';
    navTheme.colors.text = 'white';

  return (
      <NavigationContainer theme={DefaultTheme}>
        <BottomTab.Navigator tabBar={ ( props ) => <TabBar { ...props }/> }
                             screenOptions={ ( { route } ) => ( {
                                   headerShown: false,
                                 }
                             ) }
        >
          <BottomTab.Screen
              // TODO Name "Home" conflicts with another screen
              name={ 'HomeTab' }
              component={ HomeStackScreen }
              initialParams={ { icon: 'home' } }
          />
          <BottomTab.Screen
              name={ 'ExploreTab' }
              component={ ExploreStackScreen }
              initialParams={ { icon: 'earth' } }
          />
          <BottomTab.Screen
              name={ 'CreateTab' }
              component={ CreateStackScreen }
              initialParams={ { icon: 'pluscircleo' } }
          />
          <BottomTab.Screen
              name={ 'SignTab' }
              component={ AuthenticationStackScreen }
              initialParams={ { icon: 'user' } }
          />
          <BottomTab.Screen
              name={ 'SettingsTab' }
              component={ SettingsScreen }
              initialParams={ { icon: 'setting' } }
          />
        </BottomTab.Navigator>
      </NavigationContainer>
  );
};

export default AppNavigator;
