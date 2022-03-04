import { FlatList, Pressable, View, Text } from 'react-native'
import Post from './Post'
import Event from './Event'
import useMedia from '../hooks/useMedia'
import { useEffect, useState } from 'react'
import Loading from './Loading'
import HomeListHeader from './HomeListHeader'
import EmptyListMessage from './EmptyListMessage'

const HomeList = ( { navigation } ) => {
  console.log('HomeList.js')
  //
  const { getAllMedia } = useMedia()
  const [ mixedMedia, setMixedMedia ] = useState( [] )
  const [ activeList, setActiveList ] = useState( [] )
  const [ loading, setLoading ] = useState( false )

  useEffect( () => {
    return navigation.addListener( 'focus', async () => {
      console.log( 'HomeList.js focus' )
      setLoading(true)
      getAllMedia().then( mixedMedia => {
        setActiveList( mixedMedia )
        setMixedMedia( mixedMedia )
        setLoading(false)
      } )
    } )
  }, [] )
  // console.log('Loading in HomeList.js 2', loading)

  useEffect( async () => {
    setLoading( true )
    getAllMedia().then( mixedMedia => {
      setActiveList( mixedMedia )
    } ).then( () => {
      console.log( 'HomeList getAllMedia in useEffect ready' )
      setLoading( false )
    } )
  }, [] )
  // console.log('Loading in HomeList.js 3', loading)

  // Move user to single event view when tapping event card
  const eventPressHandler = ( eventId ) => {
    navigation.navigate( 'SingleEvent', { eventId: eventId } )
  }

  // Move user to single post view when tapping a post
  const postPressHandler = ( postId ) => {
    navigation.navigate( 'SinglePostHomeStack', { postId: postId } )
  }

  const filterCityHandler = ( city ) => {
    if ( city === 'all' ) {
      setLoading( true )
      getAllMedia().then( mixedMedia => {
        setActiveList( mixedMedia )
        setMixedMedia( mixedMedia )
        setLoading( false )
      } )
    } else {
      const filter = mixedMedia.filter(
        item => item.description.location === city )
      setActiveList( filter )
      setLoading( false )
    }
  }

  if ( loading ) return <Loading />

  return (
    <FlatList
      data={ activeList }
      ListHeaderComponent={
        <HomeListHeader
          navigation={ navigation }
          filterCityHandler={ filterCityHandler }
          media={ mixedMedia }
          loading={loading}
        /> }
      stickyHeaderIndices={ [ 0 ] }
      ListEmptyComponent={ <EmptyListMessage /> }
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
