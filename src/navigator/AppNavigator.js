import { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';

import HomeScreen from '../views/Home';
import AuthenticateScreen from '../views/Authenticate';
import useUserStorage from '../hooks/useUserStorage';

// Dummy screens, will be replaced with real ones
const SinglePostScreen = ( { navigation } ) => <View><Text>Single post
  view</Text></View>;
const SingleEventScreen = () => <View><Text>Single event view</Text></View>;
const EventListScreen = () => <View><Text>Event list view</Text></View>;
const CreateEventScreen = () => <View><Text>Create event view</Text></View>;
const CreatePostScreen = () => <View><Text>Create post view</Text></View>;
const AccountScreen = () => {
  const storage= useUserStorage();
  const logoutHandler = async () => {
    await storage.logout();
  }
  return (
      <View>
        <Text>Account view: logged in</Text>
        <Button title={'Log out'} onPress={logoutHandler} />
      </View>
  )
};

const HomeStack = createNativeStackNavigator();
const EventStack = createNativeStackNavigator();
const CreateStack = createNativeStackNavigator();
const AuthenticationStack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

const HomeStackScreen = () => {
  return (
      <HomeStack.Navigator>
        <HomeStack.Screen name={ 'Home' } component={ HomeScreen }/>
        <HomeStack.Screen name={ 'SinglePostHomeStack' }
                          component={ SinglePostScreen }/>
        <HomeStack.Screen name={ 'SingleEvenHomeStack' }
                          component={ SingleEventScreen }/>
      </HomeStack.Navigator>
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
  const [ isLogged, setIsLogged ] = useState( false );
  const userStorage = useUserStorage();
  userStorage.getToken().then( token => token && setIsLogged(true));

  return (
      <AuthenticationStack.Navigator initialRouteName={ isLogged ? 'Account' : 'Authenticate' }>
        {!isLogged && <AuthenticationStack.Screen name={ 'Authenticate' }
                                                  component={ AuthenticateScreen }/>}
        <AuthenticationStack.Screen name={ 'Account' }
                                    component={ AccountScreen }/>
      </AuthenticationStack.Navigator>
  );
};

const AppNavigator = () => {
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
          <BottomTab.Screen name={'CreateTab'} component={CreateStackScreen} />
          <BottomTab.Screen name={ 'AuthenticationTab' }
                            component={ AuthenticationStackScreen }/>
        </BottomTab.Navigator>
      </NavigationContainer>
  );
};

export default AppNavigator;