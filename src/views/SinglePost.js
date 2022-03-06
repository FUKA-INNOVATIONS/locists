import { View, Button, FlatList } from 'react-native'
import useMedia from '../hooks/useMedia'
import { useEffect, useState } from 'react'
import theme from '../theme'
import Comment from '../components/Comment'
import SinglePostHeader from '../components/SinglePostHeader'
import useComment from '../hooks/useComment'
import Loading from '../components/Loading'
import EmptyListMessage from '../components/EmptyListMessage'

const SinglePost = ( { navigation, route } ) => {
  const { postId } = route.params
  const [ loading, setLoading ] = useState()
  const [ mediaComments, setMediaComments ] = useState( [] )

  const { getMediaById, singleMedia } = useMedia()
  const { getMediaComments } = useComment()

  useEffect( async () => {
    setLoading( true )
    await getMediaById( postId ).then( async () => {
      await getMediaComments( postId ).then(comments => setMediaComments(comments))
    } ).finally( () => setLoading( false ) )
  }, [ postId ] )

  if ( loading ) return <Loading />

    return (
        <FlatList
          ListHeaderComponent={<SinglePostHeader postDetails={ singleMedia } />}
          data={ mediaComments }
          ListEmptyComponent={ <EmptyListMessage /> }
          keyExtractor={ (  item  ) => item.comment_id }
          renderItem={ ( { item } ) => <Comment commentObj={ item } /> }
        />
  )
}

export default SinglePost
