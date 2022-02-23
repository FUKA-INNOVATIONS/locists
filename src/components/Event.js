import { View, Image, Text, StyleSheet } from 'react-native';
import { uploadsUrl } from '../../config';
import theme from '../theme';
import UserQuickInfo from './UserQuickInfo';

const Event = ( { eventDetails } ) => {
  const description = JSON.parse( eventDetails.description );

  if ( !eventDetails ) {
    return (
        <View>
          <Text>
            Loading...
          </Text>
        </View>
    );
  }

  return (
      <>
        <UserQuickInfo/>
        <View style={ theme.card }>
          <Image
              // TODO: use thumbnails when ever possible
              source={ { uri: uploadsUrl + eventDetails.filename } }
              style={ { ...theme.cardImage } }
          />
          <View>
            <Text>{ description.name }</Text>
            <Text numberOfLines={ 2 }>{ description.location }</Text>
            <Text>{ description.date }</Text>
            <Text>{ description.price } €</Text>
            <View>
              <Text>likes: { eventDetails.attendees }</Text>
              <Text>Host:</Text>
            </View>
          </View>

        </View>
      </>

  );
};

export default Event;

