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
  const { getAllMedia, loading } = useMedia()
  const [ mixedMedia, setMixedMedia ] = useState( [] )
  const [ activeList, setActiveList ] = useState( [] )

  useEffect( () => {
    return navigation.addListener( 'focus', async () => {
      console.log( 'HomeList.js focus' )
      // setLoading(true)
      getAllMedia().then( mixedMedia => {
        setActiveList( mixedMedia )
        setMixedMedia( mixedMedia )
        // setLoading(false)
      } )
    } )
  }, [] )
  // console.log('Loading in HomeList.js 2', loading)

  /* useEffect( () => {
    // setLoading( true )
    getAllMedia().then( mixedMedia => {
      setActiveList( mixedMedia )
    } ).then( () => {
      console.log( 'HomeList getAllMedia in useEffect ready' )
      // setLoading( false )
    } )
  }, [] ) */
  // console.log('Loading in HomeList.js 3', loading)

  // Move user to single event view when tapping event card
  const eventPressHandler = ( eventId ) => {
    // navigation.navigate( 'SingleEvent', { eventId: eventId } )
  }

  // Move user to single post view when tapping a post
  const postPressHandler = ( postId ) => {
    // navigation.navigate( 'SinglePostHomeStack', { postId: postId } )
  }

  const filterCityHandler = ( city ) => {
    if ( city === 'all' ) {
      // setLoading( true )
      getAllMedia().then( mixedMedia => {
        setActiveList( mixedMedia )
        setMixedMedia( mixedMedia )
        // setLoading( false )
      } )
    } else {
      const filter = mixedMedia.filter(
        item => item.description.location === city )
      setActiveList( filter )
    }
  }

  if ( loading ) return <Loading />

  return (
    <View>
      <Text>Home list</Text>
    </View>
  )
}

export default HomeList
