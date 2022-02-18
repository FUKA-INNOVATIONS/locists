import { FlatList, Pressable, View, Text } from 'react-native';
import Post from './Post';
import Event from './Event';

import useMedia from '../hooks/useMedia';
import { useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';

const HomeList = ( { navigation } ) => {
  // const { getEvents, events, loadingEvents } = useMedia();
  // const { getPosts, posts, loadingPosts } = useMedia();
  const { getAllMedia, allMedia, loadingAllMedia } = useMedia();
  const viewIsFocused = useIsFocused();

  useEffect( async () => {
    // await getEvents();
    // await getPosts();
    await getAllMedia();
    // setPostsAndEventsMix(previousState => [...previousState, posts, events])
  }, [ viewIsFocused ] );

  // TODO: find a better solution
  /* if ( posts !== undefined && events !== undefined ) {
    events.map( event => mixed.push( event ) );
    posts.map( post => mixed.push( post ) );
  } */

  // TODO: Add a spinner icon
  // Display loading spinner icon while loading
  if ( loadingAllMedia ) {
    return (
        <View>
          <Text>
            Loading..
          </Text>
        </View>
    );
  }

  // Move user to single event view when tapping event card
  const eventPressHandler = ( eventId ) => {
    console.log( 'event pressed' );
    navigation.navigate( 'SingleEvent', { eventId: eventId } );
  };

  const postPressHandler = ( postId ) => {
      console.log( 'post pressed' );
      navigation.navigate( 'SinglePost', { postId: postId } );
  };

  const EmptyListMessage = () => <Text>No events </Text>;

  return (
      <FlatList
          data={ allMedia }
          ListEmptyComponent={EmptyListMessage}
          keyExtractor={ ( item ) => item.file_id }
          renderItem={ ( { item } ) => {
            return (
                item.tag === 'locists_post' ?
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
          }
          }
      />
  );
};

export default HomeList;