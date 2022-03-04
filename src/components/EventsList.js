import { FlatList, Pressable, Text, View } from 'react-native'
import { useCallback, useEffect, useState } from 'react'
import Event from './Event'
import DropDownPicker from 'react-native-dropdown-picker'
import {
  initCities,
  sortLatest,
  sortSoonestEvents,
  sortMostCommented,
  sortMostAttendees,
} from '../utils/sortFilterHelpers'
import theme from '../theme'

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
  const [ cityFilterValue, setCityFilterValue ] = useState( 'all' )
  const [ CityItems, setCityItems ] = useState( [] )

  useEffect( async () => {
    // await fetchEvents().then( () => initCities( events, setCityItems ) )
    // await fetchEvents()
    events && initCities( events, setCityItems )
  }, [] )

  useEffect( () => {
    return navigation.addListener( 'focus', async () => {
      console.log( 'EventsList focus' )
      // await fetchEvents().then( () => initCities( events, setCityItems ) )
      events && initCities( events, setCityItems )
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
    if ( city === 'all' ) {
      setActiveList( events )
    } else {
      const filter = events.filter(
        item => item.description.location === city )
      setActiveList( filter )
    }
  }

  const onSortOpen = useCallback( () => {
    setCityFilterOpen( false )
  }, [] )

  const onCityFilterOpen = useCallback( () => {
    setSortOpen( false )
  }, [] )

  const ListHeader = () => {
    return (
      <View style={ {
        backgroundColor: theme.colors.backgroundColor,
        justifyContent: 'center',
        padding: 10,
      } }
      >
        <DropDownPicker
          loading={ loading }
          open={ sortOpen }
          value={ sortValue }
          items={ sortItems }
          setOpen={ setSortOpen }
          setValue={ setSortValue }
          setItems={ setSortItems }
          // onPress={ ( open ) => setCityFilterOpen( false ) }
          onOpen={ onSortOpen }
          onSelectItem={ ( item ) => sortHandler( item.value ) }
          // onChangeValue={ ( value ) => setSortValue(value) }
          zIndex={ 3000 }
          zIndexInverse={ 3000 }
        />

        <DropDownPicker
          loading={ loading }
          open={ cityFilterOpen }
          value={ cityFilterValue }
          items={ CityItems }
          setOpen={ setCityFilterOpen }
          setValue={ setCityFilterValue }
          setItems={ setCityItems }
          // onPress={ ( open ) => setSortOpen( false ) }
          onOpen={ onCityFilterOpen }
          onSelectItem={ ( item ) => filterCityHandler( item.value ) }
          zIndex={ 2000 }
          zIndexInverse={ 2000 }
          listMode={ 'SCROLLVIEW' }
          searchable={true}
          searchTextInputProps={{
            maxLength: 25
          }}
          addCustomItem={true}
          searchPlaceholder="Search location"
          searchContainerStyle={{
            borderBottomColor: "#dfdfdf",
            ...theme.inputContainer,
          }}
          searchTextInputStyle={{
            height: 35,
            ...theme.inputContainer,
          }}
        />
      </View>
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