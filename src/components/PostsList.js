import { FlatList, Pressable, Text, View } from 'react-native'
import { useCallback, useEffect, useState } from 'react'
import Post from './Post'
import sortLatest from '../utils/sortLatest'
import sortMostCommented from '../utils/sortMostCommented'
import DropDownPicker from 'react-native-dropdown-picker'
import sortMostLikes from '../utils/sortMostLikes'

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
    { label: 'Freshest posts', value: 'latest' },
    { label: 'Most commented', value: 'mostCommented' },
    { label: 'Most likes', value: 'mostLikes' },
  ] )

  const [ cityFilterOpen, setCityFilterOpen ] = useState( false )
  const [ cityFilterValue, setCityFilterValue ] = useState( null )
  const [ CityItems, setCityItems ] = useState( [] )

  useEffect( () => {
    const cities = []
    posts.map( item => cities.push( item.description.location ) )
    const uniqueCities = [ ...new Set( cities ) ]
    const cityOptions = [ { label: 'All locations', value: 'none' } ]
    uniqueCities.map(
      city => cityOptions.push( { label: city, value: city } ) )
    setCityItems( cityOptions )
  }, [] )

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
        const latest = sortLatest( activeList) // eslint-disable-line
        // console.log('latest', latest)
        setActiveList(latest)
        break
      case 'mostCommented':
        const mostCommented = sortMostCommented(activeList) // eslint-disable-line
        // console.log('most commented', mostCommented)
        setActiveList(mostCommented)
        break
      case 'mostLikes':
        const mostLikes = sortMostLikes(activeList) // eslint-disable-line
        // console.log('most likes', mostLikes)
        setActiveList(mostLikes)
        break
    }

  }

  const filterCityHandler = ( city ) => {
    console.log( city )
    if ( city === 'none' ) {
      setActiveList( posts )
    } else {
      const filter = posts.filter(
        item => item.description.location === city )
      setActiveList( filter )
    }
  }

  const onSortOpen = useCallback(() => {
    setCityFilterOpen(false);
  }, []);

  const onCityFilterOpen = useCallback(() => {
    setSortOpen(false);
  }, []);

  const postPressHandler = ( postId ) => {
    navigation.navigate( 'SinglePost', { postId: postId } )
  }

  const ListHeader = () => {
    return (
      <>
        <DropDownPicker
          open={ sortOpen }
          value={ sortValue }
          items={ sortItems }
          setOpen={ setSortOpen }
          setValue={ setSortValue }
          setItems={ setSortItems }
          // onPress={ ( open ) => setCityFilterOpen( false ) }
          onOpen={onSortOpen}
          onSelectItem={ ( item ) => sortHandler( item.value ) }
          // onChangeValue={ ( value ) => setSortValue(value) }
          zIndex={3000}
          zIndexInverse={3000}
        />

        <DropDownPicker
          open={ cityFilterOpen }
          value={ cityFilterValue }
          items={ CityItems }
          setOpen={ setCityFilterOpen }
          setValue={ setCityFilterValue }
          setItems={ setCityItems }
          // onPress={ ( open ) => setSortOpen( false ) }
          onOpen={onCityFilterOpen}
          onSelectItem={ ( item ) => filterCityHandler( item.value ) }
          zIndex={2000}
          zIndexInverse={2000}
        />
      </>
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