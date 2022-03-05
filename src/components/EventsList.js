import { FlatList, Pressable } from 'react-native'
import { useEffect, useState } from 'react'
import Event from './Event'
import Loading from './Loading'
import useMedia from '../hooks/useMedia'
import ExploreListHeader from './ExploreListHeader'

const EventsList = ( { navigation } ) => {
  // console.log( 'EventsList.js')

  const { getEventsWithThumbnails } = useMedia()
  const [ loading, setLoading ] = useState( false )
  const [ events, setEvents ] = useState( [] )
  const [ activeList, setActiveList ] = useState( events )

  useEffect( () => {
    // console.log( 'EventsList.js useEffect' )
    setLoading( true )
    getEventsWithThumbnails().then( events => {
      setEvents( events )
      setActiveList( events )
    } ).finally( () => setLoading( false ) )

    // To keep state up to date
    // TODO instead update app state on changes like add/delete new event/comment/attendee
    return navigation.addListener( 'focus', async () => {
      // console.log( 'EventsList.js focus' )
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

  if ( loading ) return <Loading />

  return (
    <FlatList
      ListHeaderComponent={
        <ExploreListHeader
          mediaType={'event'}
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