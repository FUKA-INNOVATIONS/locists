import { View, Image, Text, StyleSheet } from 'react-native';
import { uploadsUrl } from '../../config';
import Attend from './Attend';

const Event = ( { eventDetails } ) => {

  // console.log('event: ', eventDetails)

  if ( eventDetails === null ) {
    return (
        <View>
          <Text>
            Loading...
          </Text>
        </View>
    );
  }

  // console.log('eventDetails in Event.js', eventDetails)
  // TODO: fix rendering

  return (
      <View style={ styles.event }>
        <View style={ styles.text }>
          <Text>{ eventDetails.description.name }</Text>
          <Text numberOfLines={ 2 }>{ eventDetails.description.location }</Text>
          <Text>{ eventDetails.description.date }</Text>
          <Text>{ eventDetails.description.price } €</Text>
          <View style={ styles.attendees }>
            <Attend file_id={eventDetails.file_id} displayIcon={false}/>
            <Text>Host:</Text>
          </View>
        </View>

        <Image
            // TODO: use thumbnails when ever possible
            source={ { uri: uploadsUrl + eventDetails.thumbnails.w320 } }
            style={ { width: 100, height: 100 } }
        />
      </View>

  );
};

export default Event;

const styles = StyleSheet.create({
  event: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    position: 'relative',
  },
  text: {
    width: '70%',
  },
  attendees: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
  },
} );

