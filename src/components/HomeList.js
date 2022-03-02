import { FlatList, Pressable, View, Text, Button } from 'react-native'
import Post from './Post'
import Event from './Event'
import useMedia from '../hooks/useMedia'
import { useEffect, useMemo, useState } from 'react'
import theme from '../theme'

const HomeList = ( { navigation } ) => {
  const { getAllMedia } = useMedia()
  // TODO: fix with focus listener
  const [ loading, setLoading ] = useState( false )
  const [ all, setAll ] = useState( [] )

  const getPostsAndEvents = useMemo( async () => {
    await getAllMedia().then( mixedMedia => setAll( mixedMedia ) )
  }, [] )

  // TODO: fix rendering
  // TODO: dont fetch all files at once
  // onEndReached={this.onScrollHandler} , onEndThreshold={0}
  // No good solutions with the api available, considering the way we use the api


  useEffect( () => {
    return navigation.addListener( 'focus', async () => {
      console.log( 'HomeList.js focus' )
      await getPostsAndEvents
    } )
  }, [] )

  useEffect( async () => {
    setLoading( true )
    await getPostsAndEvents
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

  const EmptyListMessage = () => <Text>No events </Text>

  const sortLatest = async () => {
    await getAllMedia( 'latest' ).then( sortedList => setAll( sortedList ) )
  }

  const sortPostsFirst = async () => {
    await getAllMedia( 'postsFirst' ).then( sortedList => setAll( sortedList ) )
  }

  const ListHeader = () => {
    return (
      <View style={ {
        // height: 50,
        backgroundColor: theme.colors.mainBackground,
        justifyContent: 'center',

      } }>
        <Button title={ 'Latest' } onPress={ sortLatest } />
        <Button title={ 'Posts First' } onPress={ sortPostsFirst } />
      </View>
    )
  }

  return (
    <FlatList
      data={ all }
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
