import { View, Image, Text, Dimensions } from 'react-native'
import { uploadsUrl } from '../../config'
import Attend from './Attend'
import DeleteMedia from './DeleteMedia'
import theme from '../theme'
import { Location, Calendar, Price, Attendees } from '../utils'
import UserInfo from './UserInfo'
import Loading from './Loading'
import React from 'react'
import PropTypes from 'prop-types'

import {
  useFonts,
  Nunito_500Medium as Nunito,// eslint-disable-line
} from '@expo-google-fonts/nunito'

const Event = ( { eventDetails, ownProfile } ) => { // Event card used in HomeList, EventsList, Account List
  // console.log( 'Event.js', eventDetails )
  const [ fontsLoaded ] = useFonts( {
    Nunito,
  } )

  if ( !fontsLoaded ) {
    return null
  }

  if ( eventDetails === null ) return <Loading />

  const smallScreen = Dimensions.get( 'screen' ).width <= 390
  const hasThumbnails = ( eventDetails.thumbnails !== undefined )

  return (
    <>
      <View
        style={ {
          marginLeft: 10,
          marginVertical: 3,
          flexDirection: 'row',
          position: 'relative',
        } }>
        <UserInfo username={ eventDetails.description.owner }
                  timeAdded={ eventDetails.time_added }
                  avatar={ eventDetails.description.ownerAvatar } />
        <View style={ {
          right: 0,
          position: 'absolute',
          alignSelf: 'center',
          opacity: 0.5,
          bottom: 15
        } }>
          { ( eventDetails.description.isOwner || ownProfile ) &&
          <DeleteMedia file_id={ eventDetails.file_id } /> }
        </View>
      </View>
      <View style={ [ theme.generalListEvent ] }>
        <View style={ theme.eventListTitle }>
          <Text
            style={ [
              theme.mediaTitle,
              { color: '#fff', fontFamily: 'Nunito' },
            ] }>{ eventDetails.description.name }
          </Text>
        </View>
        <Image source={ {
          uri: ( hasThumbnails && smallScreen ) ? ( uploadsUrl +
            eventDetails.thumbnails.w320 ) : ( uploadsUrl +
            eventDetails.filename ),
        } }
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
      </View>

    </>
  )
}

Event.propTypes = {
  eventDetails: PropTypes.object,
  ownProfile: PropTypes.bool,
}

export default Event
