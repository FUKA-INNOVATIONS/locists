import { FlatList, Pressable, View, Text } from 'react-native';
import Post from './Post';
import Event from './Event';

import useMedia from '../hooks/useMedia';
import React, { useEffect, useState } from 'react';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';

const HomeList = ( { navigation } ) => {
  const { getEvents, events, loadingEvents } = useMedia();
  const { getPosts, posts, loadingPosts } = useMedia();
  const viewIsFocused = useIsFocused();
  const [ postsAndEventsMix, setPostsAndEventsMix ] = useState( [] );
  const mixed = [];

  // console.log('POSTS: ', posts)
  // console.log('EVENTS: ', events)
  // console.log('loading: ', loadingPosts)

  useEffect( async () => {
    await getEvents();
    await getPosts();
    // setPostsAndEventsMix(previousState => [...previousState, posts, events])
  }, [ viewIsFocused ] );

  // TODO: find a better solution
  if ( posts !== undefined && events !== undefined ) {
    events.map( event => mixed.push( event ) );
    posts.map( post => mixed.push( post ) );
  }

  // TODO: Add a spinner icon
  // Display loading spinner icon while loading
  if ( loadingEvents || loadingPosts ) {
    return (
        <View>
          <Text>
            Loading..
          </Text>
        </View>
    );
  }

  const dummyData = [
    {
      typePost: true,
      photo: true,
      title: 'test',
      description: 'this is a test of how the card will look',
      likes: 50,
      comments: 4,
      id: 1,
    },
    {
      typePost: true,
      photo: false,
      title: 'test',
      description: 'this is a test of how the card will look',
      likes: 33,
      comments: 7,
      id: 2,
    },
    {
      typePost: false,
      photo: false,
      title: 'event',
      description: 'testing events in home page',
      attendees: 5,
      id: 3,
    },
    {
      typePost: false,
      photo: true,
      title: 'event',
      description: 'testing events in home page',
      attendees: 5,
      id: 4,
    }, {
      typePost: true,
      photo: true,
      title: 'test',
      description: 'this is a test of how the card will look',
      likes: 50,
      comments: 4,
      id: 5,
    },
    {
      typePost: true,
      photo: false,
      title: 'test',
      description: 'this is a test of how the card will look',
      likes: 33,
      comments: 7,
      id: 6,
    },
  ];

  // Move user to single event view when tapping event card
  const eventPressHandler = ( eventId ) => {
    console.log( 'event pressed' );
    navigation.navigate( 'SingleEvent', { eventId: eventId } );
  };

  return (
      <FlatList
          data={ mixed }
          keyExtractor={ ( item ) => item.file_id }
          renderItem={ ( { item } ) => {
            return (
                item.tag === 'locists_post' ?
                    <Post
                        postMedia={ item }/>
                    :
                    <Pressable onPress={ () => eventPressHandler( item.id ) }>
                      <Event eventMedia={ item }/>
                    </Pressable>
            );
          }
          }
      />
  );
};

export default HomeList;