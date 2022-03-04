import { View } from 'react-native'
import theme from '../theme'
import DropDownPicker from 'react-native-dropdown-picker'
import { useState, useEffect, useCallback } from 'react'
import {
  initCities,
  sortLatest, sortMostAttendees, sortMostCommented,
  sortSoonestEvents,
} from '../utils/sortFilterHelpers'

const EventListHeader = ( {
  media,
  activeList,
  setActiveList,
  navigation,
  loading,
} ) => {
  // console.log('EventListHeader.js')
  const [ cityFilterOpen, setCityFilterOpen ] = useState( false )
  const [ cityFilterValue, setCityFilterValue ] = useState( 'all' )
  const [ cityItems, setCityItems ] = useState( [] )

  const [ sortOpen, setSortOpen ] = useState( false )
  const [ sortValue, setSortValue ] = useState( 'latest' )
  const [ sortItems, setSortItems ] = useState( [
    { label: 'Freshest events', value: 'latest' },
    { label: 'Most commented', value: 'mostCommented' },
    { label: 'Most attendees', value: 'mostAttendees' },
    { label: 'Upcoming events', value: 'soonest' },
  ] )

  useEffect( () => {
    initCities( media, setCityItems )
  }, [] )

  useEffect( () => {
    return navigation.addListener( 'focus', async () => {
      initCities( media, setCityItems )
    } )
  }, [] )

  useEffect( () => {
    sortHandler( sortValue )
  }, [ sortValue ] )

  // TODO: find solution to update EvenList ui without spreading into new array to force update ui
  const sortHandler = ( type ) => {
    // console.log( 'EventListHeader.js sortHandler' )
    switch ( type ) {
      case 'latest':
        const latest = sortLatest( activeList ) // eslint-disable-line
        setActiveList( [ ...latest ] )
        break
      case 'soonest': // TODO fix soonest result
        const soonest = sortSoonestEvents( activeList ) // eslint-disable-line
        setActiveList( [ ...soonest ] )
        break
      case 'mostCommented':
        const mostCommented = sortMostCommented( activeList ) // eslint-disable-line
        setActiveList( [ ...mostCommented ] )
        break
      case 'mostAttendees':
        const mostAttendees = sortMostAttendees( activeList ) // eslint-disable-line
        setActiveList( [ ...mostAttendees ] )
        break
    }
  }

  const filterCityHandler = ( city ) => {
    if ( city === 'all' ) {
      setActiveList( media )
    } else {
      const filter = media.filter(
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

  return (
    <View style={ {
      backgroundColor: theme.colors.backgroundColor,
      justifyContent: 'center',
      padding: 0,

    } }>
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
        items={ cityItems }
        setOpen={ setCityFilterOpen }
        setValue={ setCityFilterValue }
        setItems={ setCityItems }
        // onPress={ ( open ) => setSortOpen( false ) }
        onOpen={ onCityFilterOpen }
        onSelectItem={ ( item ) => filterCityHandler( item.value ) }
        zIndex={ 2000 }
        zIndexInverse={ 2000 }
        listMode={ 'SCROLLVIEW' }
        searchable={ true }
        searchTextInputProps={ {
          maxLength: 25,
        } }
        addCustomItem={ true }
        searchPlaceholder='Search location'
        searchContainerStyle={ {
          borderBottomColor: '#dfdfdf',
        } }
        searchTextInputStyle={ {
          height: 35,
        } }
      />
    </View>
  )
}

export default EventListHeader