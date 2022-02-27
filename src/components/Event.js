import {View, Image, Text, Button} from 'react-native';
import { uploadsUrl } from '../../config';
import theme from "../theme";

import { Entypo } from '@expo/vector-icons';

const Event = ( { eventDetails } ) => {
  let description = eventDetails.description;
  description = JSON.parse(description)

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
      <>
          <View style={{marginLeft: 15}}>
              {
                  // Todo add user avatar here
              }
              <Text style={{ color: 'white'}}>Username</Text>
          </View>

        <View style={[theme.generalListPost, theme.event]}>
          <View style={theme.eventInfo}>
            <Text style={theme.mediaTitle}>{ description.name }</Text>
            <Text>
              <Entypo name="location-pin" size={20} color="black" />
              { description.location }
            </Text>
            <Text>
              <Entypo name="calendar" size={20} color="black" />
              { description.date }
            </Text>
            <Text>{ description.price } €</Text>
            <View style={theme.eventAttend}>
              <Entypo name="users" size={20} color="black" />
              <Text>
                50
                {
                // {description.attendees}
                }
              </Text>

              <Button title="Attend" />
            </View>
          </View>
          <Image source={ { uri: uploadsUrl + eventDetails.filename } }
                 style={theme.eventImage} />
        </View>
      </>
  );
};

export default Event;