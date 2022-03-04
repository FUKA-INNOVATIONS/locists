import { FlatList, Pressable, View, Text } from 'react-native'
import Post from './Post'
import Event from './Event'
import useMedia from '../hooks/useMedia'
import { useEffect, useState } from 'react'
import theme from '../theme'
import DropDownPicker from 'react-native-dropdown-picker'
import { initCities } from '../utils/sortFilterHelpers'

const HomeList = ( { navigation } ) => {
  const { getAllMedia } = useMedia()
  // TODO: fix with focus listener
  const [ loading, setLoading ] = useState( false )

  const [ mixedMedia, setMixedMedia ] = useState( [] )
  const [ activeList, setActiveList ] = useState( [] )

  const [ cityFilterOpen, setCityFilterOpen ] = useState( false )
  const [ cityFilterValue, setCityFilterValue ] = useState( 'all' )
  const [ cityItems, setCityItems ] = useState( [] )

  // const [ searchFilterOpen, setSearchFilterOpen ] = useState( false )
  // const [ searchFilterValue, setSearchFilterValue ] = useState( 'no-search' )
  // const [ searchItems, setSearchItems ] = useState( [] )

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
        // mixedMedia.map(m => console.log(m.description))
        setActiveList( mixedMedia )
        setMixedMedia( mixedMedia )
        initCities(mixedMedia, setCityItems)
        // initSearchNames(mixedMedia, setSearchItems)
      } )
    } )
  }, [] )

  useEffect( () => {
    setLoading( true )
    getAllMedia().then( mixedMedia => {
      setActiveList( mixedMedia )
      initCities(mixedMedia, setCityItems)
      // initSearchNames(mixedMedia, setSearchItems)
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
    if ( city === 'all' ) {
      getAllMedia().then( mixedMedia => {
        setActiveList( mixedMedia )
        setMixedMedia( mixedMedia )
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
        backgroundColor: theme.colors.backgroundColor,
        justifyContent: 'center',
        padding: 10

      } }>
        <DropDownPicker
          open={ cityFilterOpen }
          value={ cityFilterValue }
          items={ cityItems }
          setOpen={ setCityFilterOpen }
          setValue={ setCityFilterValue }
          setItems={ setCityItems }
          // onPress={ ( open ) => setSortOpen( false ) }
          onSelectItem={ ( item ) => filterCityHandler( item.value ) }
          listMode={'SCROLLVIEW'}
          theme={'LIGHT'}
          searchable={true}
          style={ theme.dropdown }
          // mode="BADGE"
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
        {/*
         <DropDownPicker
         open={ searchFilterOpen }
         value={ searchFilterValue }
         items={ searchItems }
         setOpen={ setSearchFilterOpen }
         setValue={ setSearchFilterValue }
         setItems={ setSearchItems }
         // onPress={ ( open ) => setSortOpen( false ) }
         onSelectItem={ ( item ) => filterCityHandler( item.value ) }
         listMode={'SCROLLVIEW'}
         theme={'LIGHT'}
         searchable={true}

         // addCustomItem={true}
         // searchContainerStyle={{ borderBottomColor: "#dfdfdf" }}
         // searchTextInputStyle={{ color: "#000" }}
         />
        */}
      </View>
    )
  }

  return (
    <FlatList
      data={ activeList }
      style={{marginBottom: 50}}
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
