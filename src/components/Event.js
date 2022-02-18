import { View, Image, Text, StyleSheet } from 'react-native';
import { uploadsUrl } from '../../config';

const Event = ( { eventDetails } ) => {

  if ( eventDetails === null ) {
    return (
        <View>
          <Text>
            Loading...
          </Text>
        </View>
    );
  }

  return (
      <View style={ styles.event }>
        <View style={ styles.text }>
          <Text>{ eventDetails.title }</Text>
          <Text numberOfLines={ 2 }>{ eventDetails.description }</Text>

          <View style={ styles.attendees }>
            <Text>likes: { eventDetails.attendees }</Text>
            <Text>Host:</Text>
          </View>
        </View>

        <Image
            // TODO: use thumbnails when ever possible
            source={ { uri: uploadsUrl + eventDetails.filename } }
            style={ { width: 100, height: 100 } }
        />
      </View>

  );
};

export default Event;

const styles = StyleSheet.create( {
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