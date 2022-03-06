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

  const onModalCloseHandler = () => {
    navigation.goBack()
  }

    return (
      <>
        <Button title={'Go back'} onPress={onModalCloseHandler} />
        <SinglePostHeader postDetails={ singleMedia } />
        <View style={ singleMedia !== undefined && singleMedia.description.hasImage ?
          [theme.singleMediaComments, {maxHeight: 250}]
          :
          [theme.singleMediaComments, {height: 430}]
        }>
        <FlatList
          data={ mediaComments }
          ListEmptyComponent={ <EmptyListMessage /> }
          keyExtractor={ (  item  ) => item.comment_id }
          renderItem={ ( { item } ) => <Comment commentObj={ item } avatar={ '' }/> }
        />
      </View>
    </>
  )
}

export default SinglePost
