import { View, Text, FlatList } from 'react-native';
import useMedia from '../hooks/useMedia';
import { useEffect } from 'react';

import SingleEventHeader from '../components/SingleEventHeader';
import Comment from '../components/Comment';

const SingleEvent = ( { navigation, route } ) => {
  const { eventId } = route.params;
  const { getMediaById, singleMedia, loadingSingleMedia } = useMedia();
  const {
    getSingleMediaComments,
    singleMediaComments,
    loadingSingleMediaComments,
  } = useMedia();

  useEffect( async () => {
    await getMediaById( eventId );
    await getSingleMediaComments( eventId );
  }, [ eventId ] );

  if ( loadingSingleMedia ) return <View><Text>Loading media
    details..</Text></View>;
  if ( loadingSingleMediaComments ) return <View><Text>Loading media
    comments..</Text></View>;

  // const EventHeader = () => <Text>Event header</Text>;
  // const ItemSeparator = () => <Text>----------------------</Text>;
  const EmptyListMessage = () => <Text>No comments </Text>;
  // const ListFooter = () => <Text>Footer</Text>;




  return (
      <FlatList
          data={ singleMediaComments }
          ListEmptyComponent={ EmptyListMessage }
          ListHeaderComponent={ <SingleEventHeader eventDetails={ singleMedia } /> }
          keyExtractor={ (  item  ) => item.comment_id }
          renderItem={ ( { item } ) => <Comment commentObj={ item } avatar={ '' }/> }
      />
  );
};

export default SingleEvent;
