import { View, Text, Pressable, Alert } from 'react-native';
import { useEffect } from 'react';
import useFavourite from '../hooks/useFavourite';

const Like = ( { file_id, displayIcon } ) => {  // eslint-disable-line
  const {
    getMediaFavourites,
    deleteFavourite,
    createFavourite,
    mediaFavourites,
  } = useFavourite();
  // const { favouritesCount, setFavouritesCount } = useState();

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
    console.log( 'Like', file_id );
    if ( hasLiked() ) {
      const disLiked = await deleteFavourite( file_id );
      disLiked.message && Alert.alert( disLiked.message );
    } else {
      const liked = await createFavourite( file_id );
      liked.file_id && Alert.alert( 'Successfully liked' );
    }

  };

  const hasLiked = () => {
    return mediaFavourites.filter( f => f.isOwner ).length > 0;
  };

  return (
      <View>
        { displayIcon && <Pressable onPress={ likeHandler }>
          <Text style={ { fontSize: 20 } }>{ hasLiked()
              ? 'disLike'
              : 'like' }</Text>
        </Pressable> }
        <Text>{ mediaFavourites.length } likes</Text>
      </View>
  );
};

export default Like;