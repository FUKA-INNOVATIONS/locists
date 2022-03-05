import { View, Text, FlatList, Button } from 'react-native'
import useMedia from '../hooks/useMedia'
import { useEffect } from 'react'
import SingleEventHeader from '../components/SingleEventHeader'
import Comment from '../components/Comment'
import theme from '../theme'
import useComment from '../hooks/useComment'

const SingleEvent = ( { navigation, route } ) => {
  const { eventId } = route.params
  const { getMediaById, singleMedia, loading: loadingSingleMedia } = useMedia()
  const {
    getMediaComments,
    mediaComments,
    loading: loadingComments,
  } = useComment()

  useEffect( async () => {
    await getMediaById( eventId ).then( async () => {
      await getMediaComments( eventId )
    } )
  }, [ eventId ] )

  if ( loadingSingleMedia ) return <View><Text>Loading media
    details..</Text></View>
  if ( loadingComments ) return <View><Text>Loading media
    comments..</Text></View>

  // const ItemSeparator = () => <Text>----------------------</Text>;
  const EmptyListMessage = () => <Text style={ { color: 'white' } }>No
    comments </Text>
  // const ListFooter = () => <Text>Footer</Text>;

  const onModalCloseHandler = () => {
    navigation.goBack()
  }

  return (
    <>
      <Button title={'Go back'} onPress={onModalCloseHandler} />
      <SingleEventHeader eventDetails={ singleMedia } />
      {/* <View style={theme.singleMediaComments}> */}
      <FlatList
        style={ [theme.singleMediaComments, {maxHeight: 50}] }
        data={ mediaComments }
        ListEmptyComponent={ EmptyListMessage }
        keyExtractor={ (  item  ) => item.comment_id }
        renderItem={ ( { item } ) => <Comment commentObj={ item } avatar={ '' }/> }
      />
      {/* </View> */}
    </>
  )
}

export default SingleEvent
