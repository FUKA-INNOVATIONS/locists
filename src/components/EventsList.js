import { FlatList, Pressable } from 'react-native'
import { useEffect, useState } from 'react'
import Event from './Event'
import Loading from './Loading'
import EventListHeader from './EventListHeader'
import useMedia from '../hooks/useMedia'
import {
  sortLatest, sortMostAttendees,
  sortMostCommented,
  sortSoonestEvents,
} from '../utils/sortFilterHelpers'

const EventsList = ( { navigation } ) => {
  console.log( 'EventsList.js')

  const { getEventsWithThumbnails } = useMedia()
  const [ loading, setLoading ] = useState( false )
  const [ events, setEvents ] = useState( [] )
  const [ activeList, setActiveList ] = useState( events )

  useEffect( async () => {
    console.log( 'EventsList.js useEffect' )
    setLoading( true )
    getEventsWithThumbnails().then( events => {
      setEvents( events )
      setActiveList( events )
    } ).finally( () => setLoading( false ) )
  }, [] )

  useEffect( () => {
    return navigation.addListener( 'focus', async () => {
      console.log( 'EventsList.js focus' )
      setLoading( true )
      getEventsWithThumbnails().then( events => {
        setEvents( events )
        setActiveList( events )
      } ).finally( () => setLoading( false ) )
    } )
  }, [] )

  const eventPressHandler = ( eventId ) => {
    navigation.navigate( 'SingleEvent', { eventId: eventId } )
  }

  const sortHandler = ( type ) => {
    console.log( 'EventListHeader.js sortHandler' )
    switch ( type ) {
      case 'latest':
        const latest = sortLatest( activeList ) // eslint-disable-line
        setActiveList( latest )
        break
      case 'soonest': // TODO fix soonest result
        const soonest = sortSoonestEvents( activeList ) // eslint-disable-line
        setActiveList( soonest )
        break
      case 'mostCommented':
        const mostCommented = sortMostCommented( activeList ) // eslint-disable-line
        setActiveList( mostCommented )
        break
      case 'mostAttendees':
        // console.log('mostAttendees')
        const mostAttendees = sortMostAttendees( activeList ) // eslint-disable-line
        // console.log('activeList', activeList)
        setActiveList( mostAttendees )
        break
    }
  }

  if ( loading ) return <Loading />

  return (
    <FlatList
      ListHeaderComponent={
        <EventListHeader
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

export default EventsList