import { View, Text, Button, FlatList } from 'react-native';
import useMedia from '../hooks/useMedia';
import { useEffect } from 'react';
import Comment from '../components/Comment';
import SinglePostHeader from '../components/SinglePostHeader';

const SinglePost = ( { navigation, route } ) => {
  const { postId } = route.params;
  const { getMediaById, getSingleMediaComments, singleMediaComments, singleMedia, loadingSingleMedia } = useMedia();

  useEffect( async () => {
    await getMediaById( postId );
    await getSingleMediaComments( postId );
  }, [ postId ] );

  if ( loadingSingleMedia ) return <View><Text>Loading..</Text></View>;

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
            data={ singleMediaComments }
            ListEmptyComponent={ EmptyListMessage }
            ListHeaderComponent={ <SinglePostHeader postDetails={ singleMedia } /> }
            keyExtractor={ (  item  ) => item.comment_id }
            renderItem={ ( { item } ) => <Comment commentObj={ item } avatar={ '' }/> }
        />
      </>
  );
};

export default SinglePost;