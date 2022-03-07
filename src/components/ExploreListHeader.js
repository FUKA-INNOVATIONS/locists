import { View, Platform } from 'react-native'
import theme from '../theme'
import DropDownPicker from 'react-native-dropdown-picker'
import React, { useState, useEffect, useCallback } from 'react'
import {
  initCities,
  sortLatest, sortMostAttendees, sortMostCommented,
  sortSoonestEvents,
} from '../utils/sortFilterHelpers'
import PropTypes from 'prop-types'

const EventListHeader = ( {
  media,
  activeList,
  setActiveList,
  navigation,
  loading,
  mediaType,
} ) => {
  // console.log('EventListHeader.js')
  const [ cityFilterOpen, setCityFilterOpen ] = useState( false )
  const [ cityFilterValue, setCityFilterValue ] = useState( 'all' )
  const [ cityItems, setCityItems ] = useState( [] )

  const eventSortItems = [
    { label: 'Freshest events', value: 'latest' },
    { label: 'Most commented', value: 'mostCommented' },
    { label: 'Most attendees', value: 'mostAttendees' },
    { label: 'Upcoming events', value: 'soonest' },
  ]

  const postSortItems = [
    { label: 'Freshest posts', value: 'latest' },
    { label: 'Most commented', value: 'mostCommented' },
    { label: 'Most likes', value: 'mostLikes' },
  ]

  const [ sortOpen, setSortOpen ] = useState( false )
  const [ sortValue, setSortValue ] = useState( 'latest' )
  const [ sortItems, setSortItems ] = useState(
    mediaType === 'event' ? eventSortItems : postSortItems )

  useEffect( () => {
    initCities( media, setCityItems )
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
      case 'soonest':
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
      default:
        const defaultSort = sortLatest( activeList ) // eslint-disable-line
        setActiveList( [ ...defaultSort ] )
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
      flexDirection: 'row',
      justifyContent: 'center',
      padding: 0,
      marginHorizontal: 10,
      marginBottom: 10,
      marginTop: 5,
    } }>
      { ( mediaType === 'event' || mediaType === 'post' ) &&
      <DropDownPicker
        loading={ loading }
        open={ sortOpen }
        value={ sortValue }
        items={ sortItems }
        setOpen={ setSortOpen }
        setValue={ setSortValue }
        setItems={ setSortItems }
        listMode={ Platform.OS === 'android' ? 'MODAL' : 'SCROLLVIEW' }
        // onPress={ ( open ) => setCityFilterOpen( false ) }
        onOpen={ onSortOpen }
        onSelectItem={ ( item ) => sortHandler( item.value ) }
        // onChangeValue={ ( value ) => setSortValue(value) }
        zIndex={ 3000 }
        zIndexInverse={ 3000 }
        style={
          [
            theme.dropDownPicker,
            {
            marginRight: 0,
            alignSelf: 'flex-end',
            }
          ]
          }
        dropDownContainerStyle={{
          width: '45%',
          alignSelf: 'flex-end',
          borderColor: '#7b08a3',
          borderWidth: 2,
        }}

      />
      }

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
        listMode={ Platform.OS === 'android' ? 'MODAL' : 'SCROLLVIEW' }
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
        style={
          [
            theme.dropDownPicker,
            {
          marginLeft: 15,
          alignSelf: mediaType === 'mixedMedia' ? 'flex-end' : 'flex-start',
            }
            ]
        }
        dropDownContainerStyle={{
          width: '45%',
          alignSelf: mediaType === 'mixedMedia' ? 'flex-end' : 'flex-start',
          marginLeft: mediaType === 'mixedMedia' ? 0 : 15,
          borderColor: '#7b08a3',
          borderWidth: 2,
        }}
      />
    </View>
  )
}

EventListHeader.propTypes = {
  media: PropTypes.array,
  activeList: PropTypes.array,
  setActiveList: PropTypes.func,
  navigation: PropTypes.object,
  loading: PropTypes.bool,
  mediaType: PropTypes.string,
}


export default EventListHeader