import { View, Text, FlatList, Button } from 'react-native';
import useMedia from '../hooks/useMedia';
import { useEffect } from 'react';

import SingleEventHeader from '../components/SingleEventHeader';
import Comment from '../components/Comment';
import theme from "../theme";

const SingleEvent = ( { navigation, route } ) => {
  const { eventId } = route.params;
  const { getMediaById, singleMedia, loading: loadingSingleMedia } = useMedia();
  const { getSingleMediaComments, singleMediaComments, loading: loadingComments, } = useMedia();

  useEffect( async () => {
    await getMediaById( eventId ).then(async () => {
      await getSingleMediaComments( eventId );
    })
  }, [ eventId ] );

  if ( loadingSingleMedia ) return <View><Text>Loading media details..</Text></View>;
  if ( loadingComments ) return <View><Text>Loading media comments..</Text></View>;

  // const ItemSeparator = () => <Text>----------------------</Text>;
  const EmptyListMessage = () => <Text style={{color: 'white'}}>No comments </Text>;
  // const ListFooter = () => <Text>Footer</Text>;


  const onModalCloseHandler = () => {
    navigation.goBack();
  }


  return (
      <>
        <Button title={'Go back'} onPress={onModalCloseHandler} />
        <SingleEventHeader eventDetails={ singleMedia } />
        <View style={theme.singleMediaComments}>
          <FlatList
              data={ singleMediaComments }
              ListEmptyComponent={ EmptyListMessage }
              keyExtractor={ (  item  ) => item.comment_id }
              renderItem={ ( { item } ) => <Comment commentObj={ item } avatar={ '' }/> }
          />
        </View>

      </>
  );
};

export default SingleEvent;
