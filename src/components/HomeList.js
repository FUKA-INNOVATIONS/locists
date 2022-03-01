import { FlatList, Pressable, View, Text } from 'react-native'
import Post from './Post'
import Event from './Event'
import useMedia from '../hooks/useMedia'
import { useEffect, useMemo, useState } from 'react'
import { useIsFocused } from '@react-navigation/native'
import sortLatest from '../utils/sortLatest'

const HomeList = ( { navigation } ) => {
  const { getAllMedia, allMedia } = useMedia()
  // TODO: fix with focus listener
  const viewIsFocused = useIsFocused() // eslint-disable-line
  const [ loading, setLoading ] = useState( false )

  const getPostsAndEvents = useMemo( async () => {
    await getAllMedia()
  }, [] )




  // console.log('HomeList.js')
  console.log('HomeList.js => allMedia', allMedia)

  // TODO: fix rendering

  // TODO: dont fetch all files at once
  // onEndReached={this.onScrollHandler} , onEndThreshold={0}
  // No good solutions with the api available, considering the way we use the api

  useEffect( async () => {
    setLoading( true )
    await getPostsAndEvents
    // await getAllMedia()
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

  // console.log('all media', allMedia)

  return (
    <FlatList
      data={ allMedia }
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
