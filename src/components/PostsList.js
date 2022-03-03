import { FlatList, Pressable, Text, View } from 'react-native'
import { useEffect, useState } from 'react'
import Post from './Post'
import sortLatest from '../utils/sortLatest'
import sortSoonestEvents from '../utils/sortSoonestEvents'
import sortMostCommented from '../utils/sortMostCommented'
import sortMostLikesOrAttendees from '../utils/sortMostLikesOrAttendees'
import DropDownPicker from 'react-native-dropdown-picker'

const PostsList = ( { navigation, posts, loading, fetchPosts } ) => {
  // console.log( 'PostsList rendered');

  if ( loading || !posts ) {
    return (
      <View>
        <Text>
          Loading..
        </Text>
      </View>
    )
  }

  const [ activeList, setActiveList ] = useState( posts )

  const [ sortOpen, setSortOpen ] = useState( false )
  const [ sortValue, setSortValue ] = useState( 'latest' )
  const [ sortItems, setSortItems ] = useState( [
    { label: 'Latest added', value: 'latest' },
    { label: 'Most commented', value: 'mostCommented' },
    { label: 'Most likes', value: 'mostLikes' },
  ] )

  useEffect( () => {
    return navigation.addListener( 'focus', async () => {
      console.log( 'PostsList focus' )
      // await fetchPosts();
    } )
  }, [] )

  useEffect( () => {
    sortHandler( sortValue )
  }, [ sortValue ] )

  const sortHandler = (type) => {
    switch ( type ) {
      case 'latest':
        const latest = sortLatest(activeList) // eslint-disable-line
        // console.log('latest', latest)
        setActiveList(latest)
        break
      case 'mostCommented':
        const mostCommented = sortMostCommented(activeList) // eslint-disable-line
        // console.log('most commented', mostCommented)
        setActiveList(mostCommented)
        break
      case 'mostLikes':
        const mostLikes = sortMostLikesOrAttendees(activeList) // eslint-disable-line
        // console.log('most likes', mostLikes)
        setActiveList(mostLikes)
        break
    }

  }

  const postPressHandler = ( postId ) => {
    navigation.navigate( 'SinglePost', { postId: postId } )
  }

  const ListHeader = () => {
    return (
      <DropDownPicker
        open={ sortOpen }
        value={ sortValue }
        items={ sortItems }
        setOpen={ setSortOpen }
        setValue={ setSortValue }
        setItems={ setSortItems }
        // onPress={ ( open ) => console.log( 'Sort picker open?', open ) }
        onSelectItem={ ( item ) => sortHandler(item.value) }
        // onChangeValue={ ( value ) => setSortValue(value) }
      />
    )
  }

  return (
    <FlatList
      ListHeaderComponent={ <ListHeader /> }
      stickyHeaderIndices={ [ 0 ] }
      data={ activeList }
      keyExtractor={ ( item ) => item.file_id }
      renderItem={ ( { item } ) => {
        return (
          <Pressable
            onPress={ () => postPressHandler( item.file_id ) }>
            <Post postMedia={ item } />
          </Pressable>

        )
      } }
    />
  )
}

export default PostsList