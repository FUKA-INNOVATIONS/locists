import { View, Image, Text } from 'react-native';
import { uploadsUrl } from '../../config';
import Attend from './Attend';
import DeleteMedia from './DeleteMedia';
import theme from '../theme';
import { Entypo } from '@expo/vector-icons';
import UserInfo from './UserInfo';

import Location from '../../assets/icons/Location.svg';

const Event = ( { eventDetails, ownProfile } ) => {
  // console.log(eventDetails)

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
      <>
          {
              !ownProfile
              &&
              <View style={ { marginLeft: 10, marginVertical: 5 } }>
                  <UserInfo username={ eventDetails.description.owner }
                            avatar={ eventDetails.description.ownerAvatar }/>
              </View>
          }

        <View style={ [ theme.generalListPost, theme.event ] }>
          <View style={ theme.eventInfo }>
            <Text
                style={ theme.mediaTitle }>{ eventDetails.description.name }</Text>
            <Text>
              <Location width={20} height={20} />
              { eventDetails.description.location }
            </Text>
            <View style={{paddingLeft: 5}}>
            <Text>
              { new Date(eventDetails.description.date).toDateString() }
            </Text>
            <Text>{ eventDetails.description.price } €</Text>
            </View>
            <View style={ theme.eventAttend }>
              <Entypo name="users" size={ 20 } color="black"/>

              <Attend file_id={ eventDetails.file_id } displayIcon={ false }/>
              { eventDetails.description.isOwner &&
              <DeleteMedia file_id={ eventDetails.file_id }/> }
            </View>
          </View>
          <Image source={ { uri: uploadsUrl + eventDetails.filename } }
                 style={ theme.eventImage }/>
        </View>
      </>
  );
};

export default Event;
