import { View } from 'react-native';
import { useState } from 'react';
import SwitchSelector from 'react-native-switch-selector';
import theme from '../theme';

import PostsList from '../components/PostsList';
import EventsList from '../components/EventsList';
import useMedia from '../hooks/useMedia';

const Explore = ( { navigation } ) => {
  const { getPostsWithThumbnails, posts, loading: loadingPosts } = useMedia();
  const { getEventsWithThumbnails, events, loading: loadingEvents } = useMedia();
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

  const setView = async (explore) => {
    setExplore( explore );
    switch ( explore ) {
      case 'posts':
        await getPostsWithThumbnails();
        break;
      case 'events':
        await getEventsWithThumbnails();
        break;
      /* default:
        await getEventsWithThumbnails();
        break; */
    }
  };

  /* const pressHandler = ( postId, type ) => {
    switch ( type ) {
      case 'post':
        navigation.navigate( 'SinglePost', { postId: postId });
        break;
      case 'event':
        navigation.navigate( 'SingleEvent', { postId: postId } );
        break;
    }
  }; */

    return (
        <View style={{paddingBottom: 90}}>
            <SwitchSelector
                backgroundColor={ theme.colors.textPrimary}
                textColor={ theme.colors.white }
                selectedColor={theme.colors.primary}
                buttonColor={theme.colors.white}
                borderColor={theme.colors.primary}
                valuePadding={3}
                hasPadding={true}
                bold={true}
                options={ exploreOptions }
                initial={ 0 }
                onPress={ value => setView( value.explore ) }
            />
            { explore === 'events' &&
            <EventsList navigation={ navigation }
                        events={events} loading={loadingEvents} fetchEvents={getEventsWithThumbnails}/> }
            { explore === 'posts' &&
            <PostsList navigation={ navigation }
                       posts={posts} loading={loadingPosts} fetchPosts={getPostsWithThumbnails}/> }
        </View>
    );
};

export default Explore;