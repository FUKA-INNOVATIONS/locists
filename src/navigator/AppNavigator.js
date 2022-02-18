import { View, Text } from 'react-native';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';

import HomeScreen from '../views/Home';
import AccountScreen from '../views/Account';
import AuthenticateScreen from '../views/Authenticate';


import useAuthStorage from '../hooks/useAuthStorage';
import AuthStorageContext from '../context/AuthStorageContext';


// Dummy screens, will be replaced with real ones
const SinglePostScreen = ( { navigation } ) => <View><Text>Single post
  view</Text></View>;
const EventListScreen = () => <View><Text>Event list view</Text></View>;
const CreateEventScreen = () => <View><Text>Create event view</Text></View>;
const CreatePostScreen = () => <View><Text>Create post view</Text></View>;

const HomeStack = createNativeStackNavigator();
const EventStack = createNativeStackNavigator();
const CreateStack = createNativeStackNavigator();
const AuthenticationStack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

const HomeStackScreen = () => {
  return (
      <AuthStorageContext.Consumer>
        {value => {
          console.log('status in homestackscreen: ',value)
          return (
              <HomeStack.Navigator>
                <HomeStack.Screen userStatus={value.isLogged} name={ 'Home' } component={ HomeScreen }/>
                <HomeStack.Screen name={ 'SinglePostHomeStack' }
                                  component={ SinglePostScreen }/>
                <HomeStack.Screen name={ 'SingleEvent' }
                                  component={ SingleEventScreen }/>
              </HomeStack.Navigator>
          )
        }}
      </AuthStorageContext.Consumer>
  );
};

const EventStackScreen = () => {
  return (
      <EventStack.Navigator>
        <EventStack.Screen name={ 'EventList' } component={ EventListScreen }/>
        <EventStack.Screen name={ 'SingleEvent' }
                           component={ SingleEventScreen }/>
      </EventStack.Navigator>
  );
};

const CreateStackScreen = () => {
  return (
      <CreateStack.Navigator>
        <CreateStack.Screen name={ 'CreateEvent' }
                            component={ CreateEventScreen }/>
        <CreateStack.Screen name={ 'CreatePost' }
                            component={ CreatePostScreen }/>
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
              <AuthenticationStack.Screen name={ 'Authenticate' } component={ AuthenticateScreen }/>
            </>
        ) : (
            <AuthenticationStack.Screen name={ 'Account' } component={ AccountScreen }/>
        )
        }
      </AuthenticationStack.Navigator>
  );
};

const AppNavigator = ( { userStatus } ) => {
  return (
      <NavigationContainer>
        <BottomTab.Navigator
            screenOptions={ ( { route } ) => ( {
              headerShown: false,
              tabBarIcon: ( { focused, color, size } ) => {
                let iconName;

                switch ( route.name ) {
                  case 'HomeTab':
                    iconName = focused
                        ? 'ios-information-circle'
                        : 'ios-information-circle-outline';
                    break;
                  case 'AccountTab':
                    iconName = focused ? 'ios-list' : 'ios-list';
                    break;
                }

                // You can return any component that you like here!
                return <Ionicons name={ iconName } size={ size }
                                 color={ color }/>;
              },
              tabBarActiveTintColor: 'tomato',
              tabBarInactiveTintColor: 'gray',
            } ) }
        >
          <BottomTab.Screen name={ 'HomeTab' } component={ HomeStackScreen }/>
          <BottomTab.Screen name={ 'EventTab' } component={ EventStackScreen }/>
          <BottomTab.Screen name={ 'CreateTab' }
                            component={ CreateStackScreen }/>
          <BottomTab.Screen name={ 'AuthenticationTab' }
                            component={ AuthenticationStackScreen }/>
        </BottomTab.Navigator>
      </NavigationContainer>
  );
};

export default AppNavigator;