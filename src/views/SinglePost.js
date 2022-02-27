import { View, Text, Button, FlatList } from 'react-native';
import useMedia from '../hooks/useMedia';
import { useEffect } from 'react';
import Comment from '../components/Comment';
import SinglePostHeader from '../components/SinglePostHeader';
import useComment from '../hooks/useComment';

const SinglePost = ( { navigation, route } ) => {
  const { postId } = route.params;
  // const { getMediaById, getSingleMediaComments, singleMediaComments, singleMedia, loadingSingleMedia } = useMedia();
  const { getMediaById, singleMedia, loading: loadingSingleMedia } = useMedia();
  const { getMediaComments, mediaComments, loading: loadingComments, } = useComment();


  useEffect( async () => {
    await getMediaById( postId );
    await getMediaComments( postId );
  }, [ postId ] );

  if ( loadingSingleMedia ) return <View><Text>Loading..</Text></View>;
  if ( loadingComments ) return <View><Text>Loading media comments..</Text></View>;

  const onModalCloseHandler = () => {
    navigation.goBack();
  };

  const EmptyListMessage = () => <Text>No comments </Text>;

  // console.log( 'singleMedia in SinglePost.js', singleMedia );

  return (
      <>
        <Text>Hello from SinglePost.js</Text>
        <Button title={'Go back'} onPress={onModalCloseHandler} />
        <FlatList
            data={ mediaComments }
            ListEmptyComponent={ EmptyListMessage }
            ListHeaderComponent={ <SinglePostHeader postDetails={ singleMedia } /> }
            keyExtractor={ (  item  ) => item.comment_id }
            renderItem={ ( { item } ) => <Comment commentObj={ item } avatar={ '' }/> }
        />
      </>
  );
};

export default SinglePost;