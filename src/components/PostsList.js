import { FlatList, Pressable, Text, View } from 'react-native'
import { useEffect, useState } from 'react'
import Post from './Post'
import useMedia from '../hooks/useMedia'
import Loading from './Loading'
import EventListHeader from './EventListHeader'
import PostsListHeader from './PostsListHeader'

const PostsList = ( { navigation } ) => {
  // console.log( 'PostsList.js rendered');

  const { getPostsWithThumbnails } = useMedia()
  const [ loading, setLoading ] = useState( false )
  const [ posts, setPosts ] = useState( [] )
  const [ activeList, setActiveList ] = useState( posts )

  useEffect( async () => {
    // console.log( 'PostList.js useEffect' )
    setLoading( true )
    getPostsWithThumbnails().then( posts => {
      setPosts( posts )
      setActiveList( posts )
    } ).finally( () => setLoading( false ) )
  }, [] )

  useEffect( () => {
    return navigation.addListener( 'focus', async () => {
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

  if ( loading ) return <Loading />

  return (
    <FlatList
      ListHeaderComponent={
        <PostsListHeader
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

export default PostsList