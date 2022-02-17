import { View, Text, FlatList } from 'react-native';
import Event from '../components/Event';

const SingleEvent = ( { navigation, route } ) => {
  const { eventId} = route.params;
  const dummyEvents = [
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
    },
  ];

  return (
      <FlatList
          data={dummyEvents}
          renderItem={(item) => <Event eventMedia={item}/>}
          keyExtractor={item => item.id }
          />
  );
};

export default SingleEvent;