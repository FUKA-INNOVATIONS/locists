import { FlatList } from 'react-native'
import useMedia from '../hooks/useMedia'
import { useEffect, useState } from 'react'
import SingleEventHeader from '../components/SingleEventHeader'
import Comment from '../components/Comment'
import theme from '../theme'
import useComment from '../hooks/useComment'
import Loading from '../components/Loading'
import NoComments from '../components/NoComments'

const SingleEvent = ( { navigation, route } ) => {
  const { eventId } = route.params
  const [ loading, setLoading ] = useState()
  const { getMediaById, singleMedia } = useMedia()
  const { getMediaComments } = useComment()
  const [ mediaComments, setMediaComments ] = useState( [] )
  const [ updateView, setUpdateView ] = useState( false )

  useEffect( async () => {
    setLoading( true )
    await getMediaById( eventId ).then( async () => {
      await getMediaComments( eventId ).
        then( comments => setMediaComments( comments ) )
    } ).finally( () => setLoading( false ) )
    setUpdateView( false )
  }, [ eventId, updateView ] )

  if ( loading ) return <Loading />

  return (
    <FlatList
      ListHeaderComponent={ <SingleEventHeader eventDetails={ singleMedia } setUpdateSingleEventView={setUpdateView} type={'event'} /> }
      style={ [ theme.singleMediaComments ] }
      data={ mediaComments }
      ListEmptyComponent={ <NoComments /> }
      keyExtractor={ ( item ) => item.comment_id }
      renderItem={ ( { item } ) => <Comment commentObj={ item } setUpdateSingleEventView={setUpdateView} type={'event'} /> }
    />
  )
}

export default SingleEvent
