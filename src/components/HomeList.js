import { FlatList, Pressable } from 'react-native'
import Post from './Post'
import Event from './Event'
import useMedia from '../hooks/useMedia'
import { useEffect, useState } from 'react'
import Loading from './Loading'
import EmptyListMessage from './EmptyListMessage'
import ExploreListHeader from './ExploreListHeader'

const HomeList = ( { navigation } ) => {
  // console.log('HomeList.js')

  const { getAllMedia } = useMedia()
  const [ mixedMedia, setMixedMedia ] = useState( [] )
  const [ activeList, setActiveList ] = useState( [] )
  const [ loading, setLoading ] = useState( false )

  useEffect( () => {
    console.log( 'HomeList.js useEffect' )
    setLoading( true )
    getAllMedia().then( mixedMedia => {
      setActiveList( mixedMedia )
      setMixedMedia( mixedMedia )
    } ).finally( () => {
      console.log( 'HomeList getAllMedia in useEffect ready' )
      setLoading( false )
    } )

    // To keep state up to date
    // TODO instead update app state on changes like add/delete new event/comment/attendee
    return navigation.addListener( 'focus', async () => {
      console.log( 'HomeList.js focus' )
      setLoading( true )
      getAllMedia().then( mixedMedia => {
        setActiveList( mixedMedia )
        setMixedMedia( mixedMedia )
      } ).finally(() => setLoading( false ))
    } )
  }, [] )


  // Move user to single event view when tapping event card
  const eventPressHandler = ( eventId ) => {
    navigation.navigate( 'SingleEvent', { eventId: eventId } )
  }

  // Move user to single post view when tapping a post
  const postPressHandler = ( postId ) => {
    navigation.navigate( 'SinglePostHomeStack', { postId: postId } )
  }


  if ( loading ) return <Loading />

  return (
    <FlatList
      data={ activeList }
      ListHeaderComponent={
        <ExploreListHeader
          mediaType={'mixedMedia'}
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
