import { FlatList, Pressable, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Event from './Event'
import Loading from './Loading'
import useMedia from '../hooks/useMedia'
import ExploreListHeader from './ExploreListHeader'
import PropTypes from 'prop-types'
import FooterMarginWorkAround from './ListFooterMarginWorAround'

const EventsList = ( { navigation } ) => {
  // console.log( 'EventsList.js' )

  const { getEventsWithThumbnails } = useMedia()
  const [ loading, setLoading ] = useState( false )
  const [ events, setEvents ] = useState( [] )
  const [ activeList, setActiveList ] = useState( events )

  useEffect( () => {  // To keep app state up to date
    return navigation.addListener( 'focus', async () => { // Fetch events from API on screen focus
      // console.log( 'EventsList.js focus' )
      setLoading( true )
      getEventsWithThumbnails().then( events => {
        setEvents( events )
        setActiveList( events )
      } ).finally( () => setLoading( false ) )
    } )
  }, [] )

  const eventPressHandler = ( eventId ) => {  // Move to event details screen when user presses an event
    navigation.navigate( 'SingleEvent', { eventId: eventId } )
  }

  if ( loading ) return <View style={ { top: 300 } }><Loading
    text={ 'Loading events' } /></View>

  return (
    <FlatList
      ListFooterComponent={ <FooterMarginWorkAround /> }
      ListHeaderComponent={
        <ExploreListHeader
          mediaType={ 'event' }
          media={ events }
          activeList={ activeList }
          setActiveList={ setActiveList }
          navigation={ navigation }
          loading={ loading }
        />
      }
      stickyHeaderIndices={ [ 0 ] }
      data={ activeList }
      keyExtractor={ ( item ) => item.file_id }
      renderItem={ ( { item } ) => {
        return (
          <Pressable
            onPress={ () => eventPressHandler( item.file_id ) }>
            <Event eventDetails={ item } />
          </Pressable>
        )
      } }
    />
  )
}

EventsList.propTypes = {
  navigation: PropTypes.object,
}

export default EventsList