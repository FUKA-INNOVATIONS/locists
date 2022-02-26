import useMedia from '../hooks/useMedia';
import { FlatList, Pressable, Text, View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import Event from './Event';

const EventsList = ({navigation}) => {
  const { getEventsWithThumbnails, events, loading: loadingEvents } = useMedia();
  const [ loading, setLoading ] = useState(false);
  const viewIsFocused = useIsFocused();

  console.log('n', navigation)

  useEffect( async () => {
    setLoading(true)
    await getEventsWithThumbnails();
    setLoading(false)
  }, [  ] );

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