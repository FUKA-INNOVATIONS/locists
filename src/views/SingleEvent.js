import { View, Text, FlatList, Button } from 'react-native'
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

  const onModalCloseHandler = () => {
    navigation.goBack()
  }

  return (
    <>
      <Button title={ 'Go back' } onPress={ onModalCloseHandler } />
      <SingleEventHeader eventDetails={ singleMedia } />
      {/* <View style={theme.singleMediaComments}> */ }
      <FlatList
        style={ [ theme.singleMediaComments, { maxHeight: 50 } ] }
        data={ mediaComments }
        ListEmptyComponent={ <EmptyListMessage /> }
        keyExtractor={ ( item ) => item.comment_id }
        renderItem={ ( { item } ) => <Comment commentObj={ item }
                                              avatar={ '' } /> }
      />
      {/* </View> */ }
    </>
  )
}

export default SingleEvent
