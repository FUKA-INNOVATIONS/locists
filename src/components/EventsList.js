import useMedia from '../hooks/useMedia';
import { FlatList, Pressable, Text, View } from 'react-native';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
import Event from './Event';

const EventsList = ( { navigation, pressHandler, events, loading, refetchEvents } ) => {
  console.log( 'EventsList rendered');

  useEffect( () => {
    return navigation.addListener('focus', async () => {
      console.log( 'EventsList focus' );
      // await getEventsWithThumbnails();
      await refetchEvents();
    });
  }, []);

  const eventPressHandler = ( eventId ) => {
    navigation.navigate( 'SingleEvent', { eventId: eventId } );
  };

  if ( loading ) {
    return (
        <View>
          <Text>
            Loading..
          </Text>
        </View>
    );
  }

  return (
      <FlatList
          data={ events }
          keyExtractor={ ( item ) => item.file_id }
          renderItem={ ( { item } ) => {
            return (
                <Pressable
                    onPress={ () => eventPressHandler( item.file_id ) }>
                  <Event eventDetails={ item }/>
                </Pressable>
            );
          } }
      />
  );
};

export default EventsList;