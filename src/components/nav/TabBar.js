import { View, StyleSheet, Dimensions } from 'react-native';
import Tab from './Tab';
import React, { useState } from 'react';
import PropTypes from 'prop-types'

const { width } = Dimensions.get( 'screen' );

const TabBar = ( { state, navigation } ) => {
  const [ selected, setSelected ] = useState( 'HomeTab' );
  const { routes } = state;

  // Active/inactive color of icons
  const isSelected = ( currentTab ) => currentTab === selected;

  // Handles navigation on touch, ignores already selected
  const handlePress = ( activeTab, index ) => {
    setSelected( activeTab );
    if ( state.index !== index ) {
      navigation.navigate( activeTab );
    }
  };

  return <View style={ styles.wrapper }>
    <View style={ styles.container }>
      {
        routes.map( ( route, index ) => <Tab
            tab={ route }
            onPress={ () => handlePress( route.name, index ) }
            selected={ isSelected( route.name ) }
            key={ route.key }/> )
      }
    </View>
  </View>;
};

const styles = StyleSheet.create( {
  wrapper: {
    position: 'absolute',
    bottom: -2,
    paddingBottom: 5,
    width,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: '#24292e',
    width,
    paddingHorizontal: 20,
    borderTopWidth: 2,
    borderColor: '#7b08a3',
  },
} );

TabBar.propTypes = {
  navigation: PropTypes.object,
  state: PropTypes.object,
}

export default TabBar;