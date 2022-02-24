import Post from './Post';
import Event from './Event';
import { View, Text, FlatList, Pressable } from 'react-native';

import useMedia from '../hooks/useMedia';
import { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';

const ExploreList = ( { navigation, explore } ) => {
  const { getEvents, events, loading: loadingEvents } = useMedia();
  const { getPosts, posts, loading: loadingPosts } = useMedia();
  const viewIsFocused = useIsFocused();
  const [ loading, setLoading ] = useState(false);

  useEffect( async () => {
    setLoading(true)
    await getEvents();
    await getPosts();
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