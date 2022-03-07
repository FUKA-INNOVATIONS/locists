import { View, Image, Text } from 'react-native'
import { uploadsUrl } from '../../config'
import Attend from './Attend'
import DeleteMedia from './DeleteMedia'
import theme from '../theme'
import UserInfo from './UserInfo'
import Loading from './Loading'
import { Location, Calendar, Price, Attendees } from '../utils'
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

const Event = ( { eventDetails, ownProfile } ) => {
  // console.log('Event.js', eventDetails)

  useEffect( async () => {

  } )

  if ( eventDetails === null ) return <Loading />

  console.log(eventDetails)
  return (
    <>
      {
        !ownProfile
        &&
        <View style={ { marginLeft: 10, marginVertical: 3 } }>
          <UserInfo username={ eventDetails.description.owner }
                    avatar={ eventDetails.description.ownerAvatar } />
        </View>
      }

      <View style={ [ theme.generalListEvent] }>
        <View style={ theme.eventListTitle }>
          <Text
              style={ [ theme.mediaTitle, { color: '#fff' } ] }>{ eventDetails.description.name }
          </Text>
        </View>
        <Image source={ { uri: uploadsUrl + eventDetails.thumbnails.w320 } }
               style={ theme.eventImage2 } />
        <View style={ theme.eventExtra }>
          <View style={ theme.eventSection }>
            <Location width={ 25 } height={ 40 } />
            <Text>{ eventDetails.description.location }</Text>
          </View>
          <View style={ theme.eventSection }>
            <Calendar width={ 30 } height={ 40 } />
            <Text>
              { new Date( eventDetails.description.date ).toLocaleDateString() }
            </Text>
          </View>
          <View style={ theme.eventSection }>
            <Price width={ 30 } height={ 40 } />
            <Text>
              {
                eventDetails.description.price > 0
                    ?
                    eventDetails.description.price
                    :
                    'Free'
              }
            </Text>
          </View>
          <View style={ theme.eventSection }>
            <Attendees width={ 30 } height={ 40 } />
            <Attend file_id={ eventDetails.file_id } displayIcon={ false } />
          </View>
        </View>
        { eventDetails.description.isOwner &&
        <DeleteMedia file_id={ eventDetails.file_id } /> }
      </View>
    </>
  )
}

Event.propTypes = {
  eventDetails: PropTypes.object,
  ownProfile: PropTypes.bool,
}

export default Event
