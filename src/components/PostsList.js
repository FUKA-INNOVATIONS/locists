import React, { useEffect, useState } from 'react'
import { FlatList, Pressable, View } from 'react-native'
import Post from './Post'
import useMedia from '../hooks/useMedia'
import Loading from './Loading'
import ExploreListHeader from './ExploreListHeader'
import PropTypes from 'prop-types'
import FooterMarginWorkAround from './ListFooterMarginWorAround'

const PostsList = ( { navigation } ) => { // Views a list of posts
  // console.log( 'PostsList.js rendered');

  const { getPostsWithThumbnails } = useMedia()
  const [ loading, setLoading ] = useState( false )
  const [ posts, setPosts ] = useState( [] )
  const [ activeList, setActiveList ] = useState( posts )

  useEffect( () => {
    // console.log( 'PostList.js useEffect' )
    setLoading( true )
    getPostsWithThumbnails().then( posts => {
      setPosts( posts )
      setActiveList( posts )
    } ).finally( () => setLoading( false ) )

    return navigation.addListener( 'focus', async () => { // To keep List state up to date
      // console.log( 'PostList.js focus' )
      setLoading( true )
      getPostsWithThumbnails().then( posts => {
        setPosts( posts )
        setActiveList( posts )
      } ).finally( () => setLoading( false ) )
    } )
  }, [] )

  const postPressHandler = ( postId ) => {
    navigation.navigate( 'SinglePost', { postId: postId } )
  }

  if ( loading ) return <View style={{top: 300}}><Loading text={'Loading events'} /></View>

  return (
    <FlatList
      ListFooterComponent={<FooterMarginWorkAround />}
      ListHeaderComponent={
        <ExploreListHeader
          mediaType={ 'post' }
          media={ posts }
          activeList={ activeList }
          setActiveList={ setActiveList }
          navigation={ navigation }
          loading={ loading }
        />
      }
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

PostsList.propTypes = {
  navigation: PropTypes.object,
}

export default PostsList