import { View, Text } from 'react-native';
import Event from '../components/Event';
import useMedia from '../hooks/useMedia';
import { useEffect } from 'react';

const SingleEvent = ( { navigation, route } ) => {
  const { eventId } = route.params;
  const { getMediaById, singleMedia, loadingSingleMedia } = useMedia();

  useEffect(async() => {
    await getMediaById(eventId)
  }, [eventId])

  if(loadingSingleMedia) return <View><Text>Loading..</Text></View>

  // const EventHeader = () => <Text>Event header</Text>;
  // const ItemSeparator = () => <Text>----------------------</Text>;
  // const EmptyListMessage = () => <Text>No events </Text>;
  // const ListFooter = () => <Text>Footer</Text>;



  return (
      <>
        {singleMedia !== undefined && <Event key={'ww'} eventDetails={singleMedia}/>}
      </>
  );
};

export default SingleEvent;