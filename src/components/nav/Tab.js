import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import LottieView from 'lottie-react-native'

import {
  HomeEmpty,
  HomeFull,
  ExploreEmpty,
  ExploreFull,
  PlusButton,
  ProfileEmpty,
  ProfileFull,
  SettingsEmpty,
  SettingsFull,
} from '../../utils'
import useAuthStorage from '../../hooks/useAuthStorage'
import PropTypes from 'prop-types'

const Tab = ( { selected, tab, onPress } ) => {
  const { user } = useAuthStorage()

  switch ( tab.name ) {
    case 'HomeTab':
      return (
        <TouchableOpacity style={ styles.container } onPress={ onPress }>
          { selected ? <HomeFull width={ 25 } height={ 25 } /> :
            <HomeEmpty width={ 25 } height={ 25 } /> }
          <Text style={ [
            styles.iconText,
            { color: selected ? '#7b08a3' : '#fff' },
          ] }>{ tab.name.slice( 0, -3 ) }</Text>
        </TouchableOpacity>
      )
    case 'ExploreTab':
      return (
        <TouchableOpacity style={ styles.container } onPress={ onPress }>
          { selected ? <ExploreFull width={ 25 } height={ 25 } /> :
            <ExploreEmpty width={ 25 } height={ 25 } /> }
          <Text style={ [
            styles.iconText,
            { color: selected ? '#7b08a3' : '#fff' },
          ] }>{ tab.name.slice( 0, -3 ) }</Text>
        </TouchableOpacity>
      )
    case 'CreateTab':
      // TODO fix create button visibility on app start
      return ( user.isLogged &&
        <TouchableOpacity style={ { bottom: 20 } } onPress={ onPress }>
          { selected ?
            <View style={ styles.animationBack }>
              <LottieView
                source={ require(
                  '../../../assets/animations/plusButtonWhite.json' ) }
                style={ styles.animation }
                autoPlay
                loop={false}
              />
            </View>

            :
            <PlusButton top={ 0 } width={ 60 } height={ 60 }
                        bottom={ 20 } elevation={ 10 } />
          }
        </TouchableOpacity>
      )
    case 'AccountTab':
      return (
        <TouchableOpacity style={ styles.container } onPress={ onPress }>
          { selected ? <ProfileFull width={ 25 } height={ 25 } /> :
            <ProfileEmpty width={ 25 } height={ 25 } /> }
          <Text style={ [
            styles.iconText,
            { color: selected ? '#7b08a3' : '#fff' },
          ] }>Profile</Text>
        </TouchableOpacity>
      )
    case 'SettingsTab':
      return ( user.isLogged &&
        <TouchableOpacity style={ styles.container } onPress={ onPress }>
          { selected ? <SettingsFull width={ 25 } height={ 25 } /> :
            <SettingsEmpty width={ 25 } height={ 25 } /> }
          <Text style={ [
            styles.iconText,
            { color: selected ? '#7b08a3' : '#fff' },
          ] }>{ tab.name.slice( 0, -3 ) }</Text>
        </TouchableOpacity>
      )
  }
  console.log( 'selected', selected )

}

const styles = StyleSheet.create( {
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    position: 'relative',
    marginVertical: 10
  },
  create: {
    position: 'absolute',
    top: -15,
  },
  iconText: {
    fontWeight: 'bold',
  },
  animation: {
    width: 60,
    height: 60,
    bottom: 20,
    elevation: 10,
    top: 0,
  },
  animationBack: {
    backgroundColor: '#7b08a3',
    borderRadius: 30,
  },
} )

Tab.propTypes = {
  selected: PropTypes.bool,
  tab: PropTypes.object,
  onPress: PropTypes.func,
}

export default Tab