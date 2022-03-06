import { FlatList } from 'react-native'
import useMedia from '../hooks/useMedia'
import { useEffect, useState } from 'react'
import Comment from '../components/Comment'
import SinglePostHeader from '../components/SinglePostHeader'
import useComment from '../hooks/useComment'
import Loading from '../components/Loading'
import NoComments from '../components/NoComments'

const SinglePost = ( { navigation, route } ) => {
  const { postId } = route.params
  const [ loading, setLoading ] = useState()
  const [ mediaComments, setMediaComments ] = useState( [] )

  const { getMediaById, singleMedia } = useMedia()
  const { getMediaComments } = useComment()

  const [ updateView, setUpdateView ] = useState( false )

  useEffect( async () => {
    setLoading( true )
    await getMediaById( postId ).then( async () => {
      await getMediaComments( postId ).
        then( comments => setMediaComments( comments ) )
    } ).finally( () => setLoading( false ) )
    setUpdateView( false )
  }, [ postId, updateView ] )

  if ( loading ) return <Loading />

  return (
    <FlatList
      ListHeaderComponent={ <SinglePostHeader postDetails={ singleMedia } setUpdateSinglePostView={ setUpdateView } type={ 'post' } /> }
      data={ mediaComments }
      ListEmptyComponent={ <NoComments /> }
      keyExtractor={ ( item ) => item.comment_id }
      renderItem={ ( { item } ) => <Comment commentObj={ item }
                                            setUpdateSinglePostView={ setUpdateView }
                                            type={ 'post' } /> }
    />
  )
}

export default SinglePost
