import { NavigationContainer, useIsFocused } from '@react-navigation/native';
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
import TabBar from "../components/nav/TabBar";

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
        <HomeStack.Screen name={ 'SinglePostHomeStack' }
                          component={ SinglePostScreen }/>
        <HomeStack.Screen name={ 'SingleEvent' }
                          component={ SingleEventScreen }/>
      </HomeStack.Navigator>
  );
};

const ExploreStackScreen = () => {
  return (
      <ExploreStack.Navigator>
        <ExploreStack.Screen name={ 'Explore' } component={ ExploreScreen }/>
        <ExploreStack.Screen name={ 'SingleEvent' }
                             component={ SingleEventScreen }/>
        <ExploreStack.Screen name={ 'SinglePost' }
                             component={ SinglePostScreen }/>
      </ExploreStack.Navigator>
  );
};

const CreateStackScreen = () => {
  return (
      <CreateStack.Navigator>
        <CreateStack.Screen name={ 'CreateEvent' }
                            component={ CreatePostScreen }/>
        <CreateStack.Screen name={ 'CreatePost' }
                            component={ CreateEventScreen }/>
      </CreateStack.Navigator>
  );
};

const AuthenticationStackScreen = () => {
  // TODO: Store isLoggedIn in local storage
  const authStorage = useAuthStorage();
  const isLogged = authStorage.isLogged;
  // TODO: test useFocusEffect
  // eslint-disable-next-line
  const viewIsFocused = useIsFocused();
  /* useEffect( () => {
   console.log( 'Login view focused' );
   }, [ viewIsFocused ] ); */

  return (
      <AuthenticationStack.Navigator>
        { !isLogged ? (
            <>
              <AuthenticationStack.Screen name={ 'Authenticate' }
                                          component={ AuthenticateScreen }/>
            </>
        ) : (
            <AuthenticationStack.Screen name={ 'Account' }
                                        component={ AccountScreen }/>
        )
        }
      </AuthenticationStack.Navigator>
  );
};

const AppNavigator = (props) => {
  return (
      <NavigationContainer>
        <BottomTab.Navigator tabBar={(props) => <TabBar {...props}/>}
            screenOptions={ ( { route } ) => ( {
              headerShown: false,}
                )}
        >
          <BottomTab.Screen
              // TODO Name "Home" conflicts with another screen
              name={ 'Feed' }
              component={ HomeStackScreen }
              initialParams={{ icon: 'home' }}
          />
          <BottomTab.Screen
              name={ 'Explore' }
              component={ ExploreStackScreen }
              initialParams={{ icon: 'earth' }}
          />
          <BottomTab.Screen
              name={ 'Create' }
              component={ CreateStackScreen }
              initialParams={{ icon: 'pluscircleo' }}
          />
          <BottomTab.Screen
              name={ 'Sign In' }
              component={ AuthenticationStackScreen }
              initialParams={{ icon: 'user' }}
          />
            <BottomTab.Screen
                name={ 'Settings' }
                component={ SettingsScreen }
                initialParams={{ icon: 'setting' }}
            />
        </BottomTab.Navigator>
      </NavigationContainer>
  );
};

export default AppNavigator;
