import { FlatList, Pressable, View, Text, Button } from 'react-native'
import Post from './Post'
import Event from './Event'
import useMedia from '../hooks/useMedia'
import { useEffect, useMemo, useState } from 'react'
import theme from '../theme'
import DropDownPicker from 'react-native-dropdown-picker'

const HomeList = ( { navigation } ) => {
  const { getAllMedia } = useMedia()
  // TODO: fix with focus listener
  const [ loading, setLoading ] = useState( false )

  const [ mixedMedia, setMixedMedia ] = useState( [] )
  const [ activeList, setActiveList ] = useState( [] )

  const [ cityFilterOpen, setCityFilterOpen ] = useState( false )
  const [ cityFilterValue, setCityFilterValue ] = useState( null )
  const [ CityItems, setCityItems ] = useState( [] )

  /* const getPostsAndEvents = useMemo( async () => {
   await getAllMedia().then( mixedMedia => setActiveList( mixedMedia ) )
   }, [] ) */

  // TODO: fix rendering : as many renders as amount of items
  // TODO: dont fetch all files at once
  // onEndReached={this.onScrollHandler} , onEndThreshold={0}
  // No good solutions with the api available, considering the way we use the api

  useEffect( () => {
    return navigation.addListener( 'focus', async () => {
      console.log( 'HomeList.js focus' )
      getAllMedia().then( mixedMedia => {
        setActiveList( mixedMedia )
        setMixedMedia( mixedMedia )
      } )
    } )
  }, [] )

  useEffect( () => {
    setLoading( true )
    getAllMedia().then( mixedMedia => {
      setActiveList( mixedMedia )
      const cities = []
      mixedMedia.map( item => cities.push( item.description.location ) )
      const uniqueCities = [ ...new Set( cities ) ]
      console.log( 'cities', cities.length )
      console.log( 'cities unique', uniqueCities.length )
      const cityOptions = [{label: 'All locations', value: 'none'}]
      uniqueCities.map(
        city => cityOptions.push( { label: city, value: city } ) )
      setCityItems( cityOptions )
    } ).then( () => {
      console.log( 'ready' )
    } )
    setLoading( false )
  }, [] )

  if ( loading ) {  // TODO: Add a spinner icon
    return (
      <View>
        <Text>
          Loading..
        </Text>
      </View>
    )
  }

  // Move user to single event view when tapping event card
  const eventPressHandler = ( eventId ) => {
    navigation.navigate( 'SingleEvent', { eventId: eventId } )
  }

  const postPressHandler = ( postId ) => {
    navigation.navigate( 'SinglePostHomeStack', { postId: postId } )
  }

  const filterCityHandler = ( city ) => {
    console.log( city )
    if ( city === 'none' ) {
      getAllMedia().then( mixedMedia => {
        setActiveList( mixedMedia )
        setMixedMedia(mixedMedia)
      } )
    } else {
      const filter = mixedMedia.filter(
        item => item.description.location === city )
      setActiveList( filter )
    }
  }

  const EmptyListMessage = () => <Text>No events </Text>

  const ListHeader = () => {
    return (
      <View style={ {
        backgroundColor: theme.colors.mainBackground,
        justifyContent: 'center',

      } }>
        <DropDownPicker
          open={ cityFilterOpen }
          value={ cityFilterValue }
          items={ CityItems }
          setOpen={ setCityFilterOpen }
          setValue={ setCityFilterValue }
          setItems={ setCityItems }
          // onPress={ ( open ) => setSortOpen( false ) }
          onSelectItem={ ( item ) => filterCityHandler( item.value ) }
        />
      </View>
    )
  }

  return (
    <FlatList
      data={ activeList }
      ListHeaderComponent={ <ListHeader /> }
      stickyHeaderIndices={ [ 0 ] }
      ListEmptyComponent={ EmptyListMessage }
      keyExtractor={ ( item ) => item.file_id }
      renderItem={ ( { item } ) => {
        return (
          item.description.mediaType === 'post' ?
            <Pressable
              onPress={ () => postPressHandler( item.file_id ) }>
              <Post postMedia={ item } />
            </Pressable>
            :
            <Pressable
              onPress={ () => eventPressHandler( item.file_id ) }>
              <Event eventDetails={ item } />
            </Pressable>
        )
      }
      }
    />
  )
}

export default HomeList
