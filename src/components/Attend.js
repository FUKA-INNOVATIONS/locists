import { View, Text, Alert, TouchableOpacity } from 'react-native'
import { useEffect, useState } from 'react'
import useFavourite from '../hooks/useFavourite'
import theme from "../theme";

const Attend = ( { file_id, displayIcon, single } ) => {  // eslint-disable-line
  const {
    getMediaFavourites,
    deleteFavourite,
    createFavourite,
  } = useFavourite()
  const [ mediaFavourites, setMediaFavourites ] = useState( [] )

  useEffect( () => {
    let cancel = true
    getMediaFavourites( file_id ).then( mediaFavourites => {
      if ( cancel ) return
      setMediaFavourites( mediaFavourites )
    } )
    return () => {
      cancel = true
    }
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
      <View style={ theme.attend } >
        { displayIcon && <TouchableOpacity style={ [theme.generalBtn, theme.attendBtn] }
                                           onPress={ likeHandler }>
          <Text style={ theme.loginButtonText }>{ hasAttended()
              ? 'can\'t attend'
              : 'Attend' }</Text>
        </TouchableOpacity> }
        <Text>{ mediaFavourites.length } attending </Text>
      </View>
  )
}

export default Attend