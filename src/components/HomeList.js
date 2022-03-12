import { FlatList, Pressable } from 'react-native'
import Post from './Post'
import Event from './Event'
import useMedia from '../hooks/useMedia'
import React, { useEffect, useState } from 'react'
import Loading from './Loading'
import EmptyListMessage from './EmptyListMessage'
import ExploreListHeader from './ExploreListHeader'
import PropTypes from 'prop-types'
import FooterMarginWorkAround from './ListFooterMarginWorAround'

const HomeList = ( { navigation } ) => {
  // console.log('HomeList.js')

  const { getAllMedia } = useMedia()
  const [ mixedMedia, setMixedMedia ] = useState( [] )
  const [ activeList, setActiveList ] = useState( [] )
  const [ loading, setLoading ] = useState( false )

  useEffect( () => {  // Fetch events and posts
    // console.log( 'HomeList.js useEffect' )
    return navigation.addListener( 'focus', async () => { // To keep state up to date, fetch posts and events on screen focus
      console.log( 'HomeList.js focus' )
      setLoading( true )
      getAllMedia().then( mixedMedia => {
        setActiveList( mixedMedia )
        setMixedMedia( mixedMedia )
      } ).finally( () => {
        setLoading( false )
      } )
    } )
  }, [] )

  const eventPressHandler = ( eventId ) => {  // Move user to single event screen when tapping event card
    navigation.navigate( 'SingleEventHomeStack', { eventId: eventId } )
  }

  const postPressHandler = ( postId ) => {  // Move user to single post screen when tapping a post card
    navigation.navigate( 'SinglePostHomeStack', { postId: postId } )
  }

  if ( loading ) return <Loading />

  return (
    <FlatList
      ListFooterComponent={<FooterMarginWorkAround />}
      data={ activeList }
      ListHeaderComponent={
        <ExploreListHeader
          mediaType={ 'mixedMedia' }
          media={ mixedMedia }
          activeList={ activeList }
          setActiveList={ setActiveList }
          navigation={ navigation }
          loading={ loading }
        /> }
      stickyHeaderIndices={ [ 0 ] }
      ListEmptyComponent={ <EmptyListMessage /> }
      keyExtractor={ ( item ) => item.file_id }
      renderItem={ ( { item } ) => {
        return (
          item.description.mediaType === 'post' ?
            <Pressable
              onPress={ () => postPressHandler( item.file_id ) }>
              <Post postMedia={ item } home={ true }
              />
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

HomeList.propTypes = {
  navigation: PropTypes.object,
}

export default HomeList
