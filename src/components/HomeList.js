import { FlatList, Pressable, View, Text } from 'react-native';
import Post from './Post';
import Event from './Event';
import useMedia from '../hooks/useMedia';
import { useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';

const HomeList = ( { navigation } ) => {
  const { getAllMedia, allMedia, loading } = useMedia();
  const viewIsFocused = useIsFocused();

  useEffect( async () => {
    await getAllMedia();
  }, [ viewIsFocused ] );

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
