import { FlatList, Pressable, Text, View } from 'react-native'
import { useEffect, useState } from 'react'
import Event from './Event'
import DropDownPicker from 'react-native-dropdown-picker'
import sortLatest from '../utils/sortLatest'
import sortSoonestEvents from '../utils/sortSoonestEvents'
import sortMostCommented from '../utils/sortMostCommented'
import sortMostLikesOrAttendees from '../utils/sortMostLikesOrAttendees'
import { locations } from '../utils/locations'

const EventsList = ( { navigation, events, loading, fetchEvents } ) => {
  // console.log( 'EventsList rendered'); // TODO fix too many renders

  if ( loading || !events ) {
    return (
      <View>
        <Text>
          Loading..
        </Text>
      </View>
    )
  }

  const [ activeList, setActiveList ] = useState( events )

  const [ sortOpen, setSortOpen ] = useState( false )
  const [ sortValue, setSortValue ] = useState( 'latest' )
  const [ sortItems, setSortItems ] = useState( [
    { label: 'Latest added', value: 'latest' },
    { label: 'Most commented', value: 'mostCommented' },
    { label: 'Most attendees', value: 'mostAttendees' },
    { label: 'Upcoming', value: 'soonest' },
  ] )



  useEffect( () => {
    return navigation.addListener( 'focus', async () => {
      console.log( 'EventsList focus' )
      // await fetchEvents()
    } )
  }, [] )

  useEffect( () => {
    sortHandler( sortValue )
  }, [ sortValue ] )

  const eventPressHandler = ( eventId ) => {
    navigation.navigate( 'SingleEvent', { eventId: eventId } )
  }

  const sortHandler = ( type ) => {
    switch ( type ) {
      case 'latest':
        const latest = sortLatest( activeList ) // eslint-disable-line
        // console.log('latest', latest)
        setActiveList( latest )
        break
      case 'soonest': // TODO fix soonest result
        const soonest = sortSoonestEvents( activeList ) // eslint-disable-line
        // console.log('soonest', soonest)
        setActiveList( soonest )
        break
      case 'mostCommented':
        const mostCommented = sortMostCommented( activeList ) // eslint-disable-line
        // console.log('most commented', mostCommented)
        setActiveList( mostCommented )
        break
      case 'mostAttendees':
        const mostAttendees = sortMostLikesOrAttendees( activeList ) // eslint-disable-line
        // console.log('most attendees', mostAttendees)
        setActiveList( mostAttendees )
        break
    }

  }

  const ListHeader = () => {
    return (
      <>
        <DropDownPicker
          open={ sortOpen }
          value={ sortValue }
          items={ sortItems }
          setOpen={ setSortOpen }
          setValue={ setSortValue }
          setItems={ setSortItems }
          // onPress={ ( open ) => setCityFilterOpen( false ) }
          onSelectItem={ ( item ) => sortHandler( item.value ) }
          // onChangeValue={ ( value ) => setSortValue(value) }
        />
      </>
    )
  }

  return (
    <FlatList
      ListHeaderComponent={ <ListHeader /> }
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