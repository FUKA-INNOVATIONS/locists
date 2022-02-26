import { View } from 'react-native';
import ExploreList from '../components/ExploreList';

import { useState } from 'react';
import SwitchSelector from 'react-native-switch-selector';
import theme from '../theme';

import PostsList from '../components/PostsList';
import EventsList from '../components/EventsList';

const Explore = ( { navigation } ) => {
  const [ explore, setExplore ] = useState( 'events' );
  const [ updatePosts, setUpdatePosts ] = useState( false );
  const [ updateEvents, setUpdateEvents ] = useState( false );
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
    switch ( explore ) {
      case 'posts':
        setUpdatePosts(true);
        setUpdateEvents(false);
      case 'events':
        setUpdateEvents(true)
        setUpdatePosts(false)
    }
  };

  const pressHandler = ( postId, type ) => {
    switch ( type ) {
      case 'post':
        navigation.navigate( 'SinglePost', { postId: postId } );
        break;
      case 'event':
        navigation.navigate( 'SingleEvent', { postId: postId } );
        break;
    }
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
        { explore === 'events' &&
        <EventsList navigation={ navigation } pressHandler={ pressHandler }
                    update={ updateEvents } setUpdate={setUpdateEvents}/> }
        { explore === 'posts' &&
        <PostsList navigation={ navigation } pressHandler={ pressHandler }
                   update={ updatePosts }setUpdate={ setUpdatePosts}/> }
      </View>
  );
};

export default Explore;