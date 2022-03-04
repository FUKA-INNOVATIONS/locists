import { FlatList, Pressable, Text, View } from 'react-native'
import { useCallback, useEffect, useState } from 'react'
import Post from './Post'
import DropDownPicker from 'react-native-dropdown-picker'

import {
  sortLatest,
  sortMostCommented,
  sortMostLikes,
  initCities
} from '../utils/sortFilterHelpers'
import theme from '../theme'

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
  const [ cityFilterValue, setCityFilterValue ] = useState( 'all' )
  const [ CityItems, setCityItems ] = useState( [] )

  useEffect( () => {
    initCities(posts, setCityItems)
  }, [] )

  useEffect( () => {
    return navigation.addListener( 'focus', async () => {
      console.log( 'PostsList focus' )
      initCities(posts, setCityItems)
    } )
  }, [] )

  useEffect( () => {
    sortHandler( sortValue )
  }, [ sortValue ] )

  const sortHandler = ( type ) => {
    switch ( type ) {
      case 'latest':
        const latest = sortLatest( activeList ) // eslint-disable-line
        // console.log('latest', latest)
        setActiveList( latest )
        break
      case 'mostCommented':
        const mostCommented = sortMostCommented( activeList ) // eslint-disable-line
        // console.log('most commented', mostCommented)
        setActiveList( mostCommented )
        break
      case 'mostLikes':
        const mostLikes = sortMostLikes( activeList ) // eslint-disable-line
        // console.log('most likes', mostLikes)
        setActiveList( mostLikes )
        break
    }

  }

  const filterCityHandler = ( city ) => {
    console.log( city )
    if ( city === 'all' ) {
      setActiveList( posts )
    } else {
      const filter = posts.filter(
        item => item.description.location === city )
      setActiveList( filter )
    }
  }

  const onSortOpen = useCallback( () => {
    setCityFilterOpen( false )
  }, [] )

  const onCityFilterOpen = useCallback( () => {
    setSortOpen( false )
  }, [] )

  const postPressHandler = ( postId ) => {
    navigation.navigate( 'SinglePost', { postId: postId } )
  }

  const ListHeader = () => {
    return (
      <View style={ theme.dropdownMenu }
      >
        <DropDownPicker
          loading={loading}
          open={ sortOpen }
          value={ sortValue }
          items={ sortItems }
          setOpen={ setSortOpen }
          setValue={ setSortValue }
          setItems={ setSortItems }
          // onPress={ ( open ) => setCityFilterOpen( false ) }
          onOpen={ onSortOpen }
          onSelectItem={ ( item ) => sortHandler( item.value ) }
          // onChangeValue={ ( value ) => setSortValue(value) }
          style={ [theme.dropdownExplore, {alignSelf: 'flex-end'}] }
          containerStyle={ [theme.dropdownExplore] }
          zIndex={ 3000 }
          zIndexInverse={ 3000 }
        />

        <DropDownPicker
          loading={loading}
          open={ cityFilterOpen }
          value={ cityFilterValue }
          items={ CityItems }
          setOpen={ setCityFilterOpen }
          setValue={ setCityFilterValue }
          setItems={ setCityItems }
          // onPress={ ( open ) => setSortOpen( false ) }
          onOpen={ onCityFilterOpen }
          onSelectItem={ ( item ) => filterCityHandler( item.value ) }
          zIndex={ 2000 }
          zIndexInverse={ 2000 }
          listMode={'SCROLLVIEW'}
          searchable={true}
          searchTextInputProps={{
            maxLength: 25
          }}
          addCustomItem={true}
          searchPlaceholder="Search location"
          style={ theme.dropdownExplore }
          containerStyle={ theme.dropdownExplore }
          searchContainerStyle={{
            borderBottomColor: "#dfdfdf",
            ...theme.inputContainer,
          }}
          searchTextInputStyle={{
            height: 35,
            ...theme.inputContainer,
          }}
        />
      </View>
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