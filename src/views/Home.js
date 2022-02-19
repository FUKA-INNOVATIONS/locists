import { View, Text } from 'react-native';
import HomeList from '../components/HomeList';
import { useContext, useEffect, useState } from 'react';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import AuthStorageContext from '../context/AuthStorageContext';
import useAuthStorage from '../hooks/useAuthStorage';

const Home = ( { navigation } ) => {
  const { isLogged, user } = useAuthStorage();
  const viewFocused = useIsFocused()

  console.log(isLogged, user)

  return (
      <View style={ { marginTop: 50, marginHorizontal: 10 } }>
        <Text>You are logged { isLogged ? 'in' : 'out' }</Text>
        <HomeList/>
      </View>
  );
};

export default Home;
