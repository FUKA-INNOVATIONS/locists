import { View, Text, Button, FlatList } from 'react-native'
import useMedia from '../hooks/useMedia'
import { useEffect } from 'react'
import theme from '../theme'
import Comment from '../components/Comment'
import SinglePostHeader from '../components/SinglePostHeader'
import useComment from '../hooks/useComment'

const SinglePost = ( { navigation, route } ) => {
  const { postId } = route.params
  // const { getMediaById, getSingleMediaComments, singleMediaComments, singleMedia, loadingSingleMedia } = useMedia();
  const { getMediaById, singleMedia, loading: loadingSingleMedia } = useMedia()
  const {
    getMediaComments,
    mediaComments,
    loading: loadingComments,
  } = useComment()

  useEffect( async () => {
    await getMediaById( postId )
    await getMediaComments( postId )
  }, [ postId ] )

  if ( loadingSingleMedia ) return <View><Text>Loading..</Text></View>
  if ( loadingComments ) return <View><Text>Loading media
    comments..</Text></View>

  const EmptyListMessage = () => <Text style={ { color: 'white' } }>No
    comments </Text>

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
          ListEmptyComponent={ EmptyListMessage }
          keyExtractor={ (  item  ) => item.comment_id }
          renderItem={ ( { item } ) => <Comment commentObj={ item } avatar={ '' }/> }
        />
      </View>
    </>
  )
}

export default SinglePost
