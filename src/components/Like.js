import { View, Text, Pressable } from 'react-native';
import { useEffect, useState } from 'react';
import useFavourite from '../hooks/useFavourite';

const Like = ( { file_id } ) => {
  const { getMediaFavourites, mediaFavourites } = useFavourite();
  // const { favouritesCount, setFavouritesCount } = useState();
  useEffect( async () => {
    /*return navigation.addListener('focus', async () => {
     console.log( 'EventsList focus' );
     await fetchEvents();
     });*/
    const favourites = await getMediaFavourites( file_id );
    // console.log( favourites );
    // setFavouritesCount(favourites)
  }, [] );

  const likeHandler = async () => {
    console.log( 'Like', file_id );
  };

  const hasLiked = () => {
    const isOwner =  mediaFavourites.map( f => f.isOwner )
    console.log(isOwner)
    return isOwner
  }

  return (
      <View>
        <Pressable onPress={ likeHandler }>
          <Text style={ { fontSize: 20 } }>{ hasLiked() ? 'disLike' : 'like' } ({mediaFavourites.length})</Text>
        </Pressable>
      </View>
  );
};

export default Like;