import React from 'react'
import {
  DefaultTheme,
  NavigationContainer,
  useIsFocused,
} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import HomeScreen from '../views/Home'
import AccountScreen from '../views/Account'
import AuthenticateScreen from '../views/Authenticate'
import SingleEventScreen from '../views/SingleEvent'
import SinglePostScreen from '../views/SinglePost'
import ExploreScreen from '../views/Explore'
import CreateEventScreen from '../views/CreateEvent'
import CreatePostScreen from '../views/createPost'
import SettingsScreen from '../views/Settings'
import CreateScreen from '../views/Create'
import ModifyAccount from '../views/ModifyAccount'
import EventsListScreen from '../components/EventsList'
import PostsListScreen from '../components/PostsList'

import useAuthStorage from '../hooks/useAuthStorage'
import TabBar from '../components/nav/TabBar'
import CloseModal from '../components/CloseModal'

const HomeStack = createNativeStackNavigator()
const ExploreStack = createNativeStackNavigator()
const CreateStack = createNativeStackNavigator()
const AuthenticationStack = createNativeStackNavigator()
const SettingsStack = createNativeStackNavigator()

const BottomTab = createBottomTabNavigator()
// const AppStack = createNativeStackNavigator();

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name={ 'Home' } component={ HomeScreen } options={{title: 'Events & posts'}} />
      <HomeStack.Group screenOptions={ { presentation: 'modal' } }>
        <HomeStack.Screen name={ 'SinglePostHomeStack' }
                          options={ ( {
                            route,
                            navigation,
                          } ) => ( {
                            title: 'Post',
                            headerRight: () => (
                              <CloseModal navigation={ navigation } /> ),
                          } ) }
                          component={ SinglePostScreen } />
        <HomeStack.Screen name={ 'SingleEventHomeStack' }
                          options={ ( {
                            route,
                            navigation,
                          } ) => ( {
                            title: 'Event',
                            headerRight: () => (
                              <CloseModal navigation={ navigation } /> ),
                          } ) }
                          component={ SingleEventScreen } />
      </HomeStack.Group>
    </HomeStack.Navigator>
  )
}

const ExploreStackScreen = () => {
  return (
    <ExploreStack.Navigator>
      <ExploreStack.Screen name={ 'Explore' } component={ ExploreScreen } />
      <ExploreStack.Screen name={ 'EventList' }
                           component={ EventsListScreen } />
      <ExploreStack.Screen name={ 'PostList' } component={ PostsListScreen } />
      <ExploreStack.Group screenOptions={ { presentation: 'modal' } }>
        <ExploreStack.Screen name={ 'SingleEvent' }
                             options={ ( {
                               route,
                               navigation,
                             } ) => ( {
                               title: 'Event',
                               headerRight: () => (
                                 <CloseModal navigation={ navigation } /> ),
                             } ) }
                             component={ SingleEventScreen } />
        <ExploreStack.Screen name={ 'SinglePost' }
                             options={ ( {
                               route,
                               navigation,
                             } ) => ( {
                               title: 'Post',
                               headerRight: () => (
                                 <CloseModal navigation={ navigation } /> ),
                             } ) }
                             component={ SinglePostScreen } />
      </ExploreStack.Group>
    </ExploreStack.Navigator>
  )
}

const CreateStackScreen = () => {
  return (
    <CreateStack.Navigator>
      <CreateStack.Screen name={ 'Create' }
                          options={{title: 'Create and publish'}}
                          component={ CreateScreen } />
      <CreateStack.Group screenOptions={ { presentation: 'modal' } }>
        <CreateStack.Screen name={ 'CreatePost' }
                            options={ ( {
                              route,
                              navigation,
                            } ) => ( {
                              title: 'Create new post',
                              headerRight: () => (
                                <CloseModal navigation={ navigation } /> ),
                            } ) }
                            component={ CreatePostScreen } />
        <CreateStack.Screen name={ 'CreateEvent' }
                            options={ ( {
                              route,
                              navigation,
                            } ) => ( {
                              title: 'Create new event',
                              headerRight: () => (
                                <CloseModal navigation={ navigation } /> ),
                            } ) }
                            component={ CreateEventScreen } />
      </CreateStack.Group>
    </CreateStack.Navigator>
  )
}

const AuthenticationStackScreen = () => {
  const { user } = useAuthStorage()
  // TODO: test useFocusEffect
  // eslint-disable-next-line
  const viewIsFocused = useIsFocused()
  /* useEffect( () => {
   console.log( 'Login view focused' );
   }, [ viewIsFocused ] ); */

  return (
    <AuthenticationStack.Navigator>
      { !user.isLogged ? (
        <>
          <AuthenticationStack.Screen name={ 'Authenticate' }
                                      component={ AuthenticateScreen } />
        </>
      ) : (
        <>
          <AuthenticationStack.Screen name={ 'Account' }
                                      component={ AccountScreen } />
          <AuthenticationStack.Group
            screenOptions={ { presentation: 'modal' } }>
            <AuthenticationStack.Screen name={ 'ModifyAccount' }
                                        options={ ( {
                                          route,
                                          navigation,
                                        } ) => ( {
                                          title: 'Update account details',
                                          headerRight: () => (
                                            <CloseModal
                                              navigation={ navigation } /> ),
                                        } ) }
                                        component={ SettingsScreen } />
          </AuthenticationStack.Group>
          <ExploreStack.Group screenOptions={ { presentation: 'modal' } }>
            <ExploreStack.Screen name={ 'SingleEventOwn' }
                                 options={ ( {
                                   route,
                                   navigation,
                                 } ) => ( {
                                   title: 'Event',
                                   headerRight: () => (
                                     <CloseModal navigation={ navigation } /> ),
                                 } ) }
                                 component={ SingleEventScreen } />
            <ExploreStack.Screen name={ 'SinglePostOwn' }
                                 options={ ( {
                                   route,
                                   navigation,
                                 } ) => ( {
                                   title: 'Post',
                                   headerRight: () => (
                                     <CloseModal navigation={ navigation } /> ),
                                 } ) }
                                 component={ SinglePostScreen } />
          </ExploreStack.Group>
        </>
      )
      }
    </AuthenticationStack.Navigator>
  )
}

const SettingsStackScreen = () => {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name={ 'Settings' }
                            component={ SettingsScreen } />
      <SettingsStack.Group screenOptions={ { presentation: 'modal' } }>
        <SettingsStack.Screen name={ 'ModifyAccount' }
                              options={ ( {
                                route,
                                navigation,
                              } ) => ( {
                                title: 'Update account details',
                                headerRight: () => (
                                  <CloseModal navigation={ navigation } /> ),
                              } ) }
                              component={ ModifyAccount } />
      </SettingsStack.Group>
    </SettingsStack.Navigator>
  )
}

/* const AppStackScreen = () => {
 const { user } = useAuthStorage();
 const viewIsFocused = useIsFocused(); //eslint-disable-line

 return (
 <AppStack.Navigator>
 <AppStack.Screen name={ 'Home' } component={ HomeScreen }/>
 <AppStack.Screen name={ 'Explore' } component={ ExploreScreen }/>
 <AppStack.Group name={'Account'} screenOptions={ { presentation: 'modal' } }>
 {!user.isLogged && <AppStack.Screen name={ 'Authenticate' } component={ AuthenticateScreen }/>}
 <AppStack.Screen name={ 'AccountDetails' } component={ AccountScreen }/>
 <AppStack.Screen name={ 'ModifyAccount' } component={ SettingsScreen }/>
 </AppStack.Group>

 <AppStack.Group name={'Explore'} screenOptions={ { presentation: 'modal' } }>
 </AppStack.Group>

 <AppStack.Group name={'Create'} screenOptions={ { presentation: 'modal' } }>
 <AppStack.Screen name={ 'CreatePost' } component={ CreateEventScreen }/>
 <AppStack.Screen name={ 'CreateEvent' } component={ CreatePostScreen }/>
 </AppStack.Group>

 <AppStack.Group name={'Modal'} screenOptions={ { presentation: 'modal' } }>
 <AppStack.Screen name={ 'SingleEvent' } component={ SingleEventScreen }/>
 <AppStack.Screen name={ 'SinglePost' } component={ SinglePostScreen }/>
 </AppStack.Group>
 </AppStack.Navigator>
 )
 } */

const AppNavigator = ( props ) => {

  const navTheme = DefaultTheme
  navTheme.colors.background = '#24292e'
  navTheme.colors.card = '#24292e'
  navTheme.colors.text = 'white'

  return (
    <NavigationContainer theme={ DefaultTheme }>
      <BottomTab.Navigator tabBar={ ( props ) => <TabBar { ...props } /> }
                           screenOptions={ ( { route } ) => ( {
                               headerShown: false,
                             }
                           ) }
      >
        <BottomTab.Screen
          // TODO Name "Home" conflicts with another screen
          name={ 'HomeTab' }
          component={ HomeStackScreen }
        />
        <BottomTab.Screen
          name={ 'ExploreTab' }
          component={ ExploreStackScreen }
        />
        <BottomTab.Screen
          name={ 'CreateTab' }
          component={ CreateStackScreen }
        />
        <BottomTab.Screen
          name={ 'AccountTab' }
          component={ AuthenticationStackScreen }
        />
        <BottomTab.Screen
          name={ 'SettingsTab' }
          component={ SettingsStackScreen }
        />
      </BottomTab.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigator
