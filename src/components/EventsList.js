import { FlatList, Pressable, Text, View } from 'react-native'
import { useCallback, useEffect, useState } from 'react'
import Event from './Event'
import DropDownPicker from 'react-native-dropdown-picker'
import sortLatest from '../utils/sortLatest'
import sortSoonestEvents from '../utils/sortSoonestEvents'
import sortMostCommented from '../utils/sortMostCommented'
import sortMostAttendees from '../utils/sortMostAttendees'

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
    { label: 'Freshest events', value: 'latest' },
    { label: 'Most commented', value: 'mostCommented' },
    { label: 'Most attendees', value: 'mostAttendees' },
    { label: 'Upcoming (disabled)', value: 'soonest' },
  ] )

  const [ cityFilterOpen, setCityFilterOpen ] = useState( false )
  const [ cityFilterValue, setCityFilterValue ] = useState( null )
  const [ CityItems, setCityItems ] = useState( [] )

  useEffect( () => {
    const cities = []
    events.map( item => cities.push( item.description.location ) )
    const uniqueCities = [ ...new Set( cities ) ]
    console.log( 'cities', cities.length )
    console.log( 'cities unique', uniqueCities.length )
    const cityOptions = [ { label: 'All locations', value: 'none' } ]
    uniqueCities.map(
      city => cityOptions.push( { label: city, value: city } ) )
    setCityItems( cityOptions )
  }, [] )

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
        const mostAttendees = sortMostAttendees( activeList ) // eslint-disable-line
        // console.log('most attendees', mostAttendees)
        setActiveList( mostAttendees )
        break
    }

  }

  const filterCityHandler = ( city ) => {
    console.log( city )
    if ( city === 'none' ) {
      setActiveList( events )
    } else {
      const filter = events.filter(
        item => item.description.location === city )
      setActiveList( filter )
    }
  }

  const onSortOpen = useCallback(() => {
    setCityFilterOpen(false);
  }, []);

  const onCityFilterOpen = useCallback(() => {
    setSortOpen(false);
  }, []);

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
          onOpen={onSortOpen}
          onSelectItem={ ( item ) => sortHandler( item.value ) }
          // onChangeValue={ ( value ) => setSortValue(value) }
          zIndex={3000}
          zIndexInverse={3000}
        />

        <DropDownPicker
          open={ cityFilterOpen }
          value={ cityFilterValue }
          items={ CityItems }
          setOpen={ setCityFilterOpen }
          setValue={ setCityFilterValue }
          setItems={ setCityItems }
          // onPress={ ( open ) => setSortOpen( false ) }
          onOpen={onCityFilterOpen}
          onSelectItem={ ( item ) => filterCityHandler( item.value ) }
          zIndex={2000}
          zIndexInverse={2000}
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