import { View, Text, Alert, TouchableOpacity } from 'react-native';
import { useEffect } from 'react';
import useFavourite from '../hooks/useFavourite';
import theme from "../theme";

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
      <View style={{marginLeft: 5}}>
        { displayIcon && <TouchableOpacity style={ [theme.generalBtn, theme.attendBtn] } onPress={ likeHandler }>
          <Text style={ theme.loginButtonText }>{ hasAttended()
              ? 'can\'t attend'
              : 'Attend' }</Text>
        </TouchableOpacity> }
        <Text>{ mediaFavourites.length } attending </Text>
      </View>
  );
};

export default Attend;