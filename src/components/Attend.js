import { View, Text, Pressable, Alert } from 'react-native';
import { useEffect } from 'react';
import useFavourite from '../hooks/useFavourite';

const Attend = ( { file_id, displayIcon } ) => {  // eslint-disable-line
  const {
    getMediaFavourites,
    deleteFavourite,
    createFavourite,
    mediaFavourites,
  } = useFavourite();

  useEffect( async () => {
    /* return navigation.addListener('focus', async () => {
     console.log( 'EventsList focus' );
     await fetchEvents();
     }); */
    await getMediaFavourites( file_id );
    // console.log( favourites );
    // setFavouritesCount(favourites)
  }, [] );

  const likeHandler = async () => {
    console.log( 'Attend', file_id );
    if ( hasAttended() ) {
      const disLiked = await deleteFavourite( file_id );
      disLiked.message && Alert.alert( disLiked.message );
    } else {
      const liked = await createFavourite( file_id );
      liked.file_id && Alert.alert( 'Successfully attended' );
    }

  };

  const hasAttended = () => {
    return mediaFavourites.filter( f => f.isOwner ).length > 0;
  };

  return (
      <View>
        { displayIcon && <Pressable onPress={ likeHandler }>
          <Text style={ { fontSize: 20 } }>{ hasAttended()
              ? 'can\'t attend'
              : 'attend' }</Text>
        </Pressable> }
        <Text>{ mediaFavourites.length } attendees </Text>
      </View>
  );
};

export default Attend;