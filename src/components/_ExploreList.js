import Post from './Post';
import Event from './Event';
import { View, Text, FlatList, Pressable } from 'react-native';

import useMedia from '../hooks/useMedia';
import { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';

const ExploreList = ( { navigation, explore } ) => {
  const { getEventsWithThumbnails, events, loading: loadingEvents } = useMedia(); // eslint-disable-line
  const { getPostsWithThumbnails, posts, loading: loadingPosts } = useMedia(); // eslint-disable-line
  const viewIsFocused = useIsFocused();
  const [ loading, setLoading ] = useState(false);

  /* const getPostsAndEvents = useMemo( async () => {
    await getEventsWithThumbnails();
    await getPostsWithThumbnails();
  }, [viewIsFocused] ); */

  useEffect( async () => {
    setLoading(true)
    await getEventsWithThumbnails();
    await getPostsWithThumbnails();
    // await getPostsAndEvents;
    setLoading(false)
  }, [ viewIsFocused ] );

  if ( loading ) {
    return (
        <View>
          <Text>
            Loading..
          </Text>
        </View>
    );
  }

  const eventPressHandler = ( eventId ) => {
    navigation.navigate( 'SingleEvent', { eventId: eventId } );
  };

  const postPressHandler = ( postId ) => {
    navigation.navigate( 'SinglePost', { postId: postId } );
  };

  // TODO: use 2 views and fetch only 1 view related media at once for sake of opt and speed

  return (
      <FlatList
          data={ explore === 'events' ? events : posts }
          keyExtractor={ ( item ) => item.file_id }
          renderItem={ ( { item } ) => {
            return (
                explore === 'posts' ?
                    <Pressable
                        onPress={ () => postPressHandler( item.file_id ) }>
                      <Post postMedia={ item }/>
                    </Pressable>
                    :
                    <Pressable
                        onPress={ () => eventPressHandler( item.file_id ) }>
                      <Event eventDetails={ item }/>
                    </Pressable>
            );
          } }
      />
  );
};

export default ExploreList;