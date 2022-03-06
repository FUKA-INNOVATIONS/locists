import { FlatList, Button } from 'react-native'
import useMedia from '../hooks/useMedia'
import { useEffect, useState } from 'react'
import SingleEventHeader from '../components/SingleEventHeader'
import Comment from '../components/Comment'
import theme from '../theme'
import useComment from '../hooks/useComment'
import Loading from '../components/Loading'
import EmptyListMessage from '../components/EmptyListMessage'

const SingleEvent = ( { navigation, route } ) => {
  const { eventId } = route.params
  const [ loading, setLoading ] = useState()
  const { getMediaById, singleMedia } = useMedia()
  const { getMediaComments } = useComment()
  const [ mediaComments, setMediaComments ] = useState( [] )

  useEffect( async () => {
    setLoading( true )
    await getMediaById( eventId ).then( async () => {
      await getMediaComments( eventId ).then(comments => setMediaComments(comments))
    } ).finally( () => setLoading( false ) )
  }, [ eventId ] )

  if ( loading ) return <Loading />

  return (
      <FlatList
        ListHeaderComponent={<SingleEventHeader eventDetails={ singleMedia } />}
        style={ [ theme.singleMediaComments ] }
        data={ mediaComments }
        ListEmptyComponent={ <EmptyListMessage /> }
        keyExtractor={ ( item ) => item.comment_id }
        renderItem={ ( { item } ) => <Comment commentObj={ item } /> }
      />
  )
}

export default SingleEvent
