import { View, Text, Pressable, Alert } from 'react-native'
import { useEffect, useState } from 'react'
import useFavourite from '../hooks/useFavourite'

const Attend = ( { file_id, displayIcon } ) => {  // eslint-disable-line
  const {
    getMediaFavourites,
    deleteFavourite,
    createFavourite,
  } = useFavourite()
  const [ mediaFavourites, setMediaFavourites ] = useState( [] )

  useEffect( async () => {
    getMediaFavourites( file_id ).then( mediaFavourites => {
      setMediaFavourites( mediaFavourites )
    } )
  }, [] )

  const likeHandler = async () => {
    console.log( 'Attend', file_id )
    if ( hasAttended() ) {
      const disLiked = await deleteFavourite( file_id )
      disLiked.message && Alert.alert( disLiked.message )
    } else {
      const liked = await createFavourite( file_id )
      liked.file_id && Alert.alert( 'Successfully attended' )
    }
  }

  const hasAttended = () => {
    return mediaFavourites.filter( f => f.isOwner ).length > 0
  }

  return (
    <View style={ { marginLeft: 5 } }>
      { displayIcon && <Pressable onPress={ likeHandler }>
        <Text style={ { fontSize: 20 } }>{ hasAttended()
          ? 'can\'t attend'
          : 'attend' }</Text>
      </Pressable> }
      <Text>{ mediaFavourites.length } attending </Text>
    </View>
  )
}

export default Attend