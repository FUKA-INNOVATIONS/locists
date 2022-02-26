import { View } from 'react-native';
import ExploreList from '../components/ExploreList';

import { useState } from 'react';
import SwitchSelector from 'react-native-switch-selector';
import theme from '../theme';

import PostsList from '../components/PostsList';
import EventsList from '../components/EventsList';

const Explore = ( { navigation } ) => {
  const [ explore, setExplore ] = useState( 'events' );
  const exploreOptions = [
    {
      label: 'Events',
      value: { explore: 'events' },
    },
    {
      label: 'Posts',
      value: { explore: 'posts' },
    },
  ];

  const setView = explore => {
    setExplore( explore );
  };

  return (
      <View>
        <SwitchSelector
            textColor={ theme.colors.textPrimary }
            buttonColor={ theme.colors.primary }
            options={ exploreOptions }
            initial={ 0 }
            onPress={ value => setView( value.explore ) }
        />
        { explore === 'events' && <EventsList navigation={navigation}/> }
        { explore === 'posts' && <PostsList navigation={navigation} /> }
      </View>
  );
};

export default Explore;