import { FlatList, Pressable, View, Text } from 'react-native';
import Post from './Post';
import Event from './Event';
import useMedia from '../hooks/useMedia';
import { useEffect, useState, useMemo, useCallback } from 'react';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';

const HomeList = ( { navigation } ) => {
  const { getAllMedia, allMedia } = useMedia();
  const viewIsFocused = useIsFocused();
  const [ loading, setLoading ] = useState( false );

  const getPostsAndEvents = useMemo( async () => {
    await getAllMedia()
  }, [] );

  // TODO: dont fetch all files at once
  // onEndReached={this.onScrollHandler} , onEndThreshold={0}
  // No good solutions with the api available, considering the way we use the api

  useFocusEffect(
      useCallback( () => {
        return async () => {
          await getPostsAndEvents
        };
      }, [viewIsFocused] ),
  );

  /* useEffect( async () => {
    setLoading( true );
    await getPostsAndEvents
    // await getAllMedia()
    setLoading( false );
  }, [] ); */

  // TODO: Add a spinner icon
  // Display loading spinner icon while loading
  if ( loading ) {
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
    navigation.navigate( 'SingleEvent', { eventId: eventId } );
  };

  const postPressHandler = ( postId ) => {
    navigation.navigate( 'SinglePostHomeStack', { postId: postId } );
  };

  const EmptyListMessage = () => <Text>No events </Text>;

  // console.log('all media', allMedia)

  return (
      <FlatList
          data={ allMedia }
          ListEmptyComponent={ EmptyListMessage }
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
