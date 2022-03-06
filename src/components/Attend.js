import { View, Text, Alert, TouchableOpacity } from 'react-native'
import { useEffect, useState } from 'react'
import useFavourite from '../hooks/useFavourite'
import theme from '../theme'
import useAuthStorage from '../hooks/useAuthStorage'

const Attend = ( { file_id, displayIcon, single } ) => {  // eslint-disable-line
  const { user } = useAuthStorage()
  // console.log('attend.js')
  const {
    getMediaFavourites,
    deleteFavourite,
    createFavourite,
  } = useFavourite()
  const [ mediaFavourites, setMediaFavourites ] = useState( [] )

  useEffect( async () => {
    // let cancel = true
    await getMediaFavourites( file_id ).then( mediaFavourites => {
      // if ( cancel ) return
      setMediaFavourites( mediaFavourites )
    } )
    /* return () => {
     cancel = true
     } */
  }, [] )

  const likeHandler = async () => {
    console.log( 'Attend', file_id )
    if ( hasAttended() ) {
      const disLiked = await deleteFavourite( file_id )
      disLiked.message && Alert.alert( disLiked.message )
    } else {

      if ( !user.isLogged ) {
        Alert.alert( 'You must login',
          'Only logged in users are able to attend events, please login to your account and try again!' )
      }

      const liked = await createFavourite( file_id )
      liked.file_id && Alert.alert( 'Successfully attended' )
    }
  }

  const hasAttended = () => {
    return mediaFavourites.filter( f => f.isOwner ).length > 0
  }

  return (
    <View style={ theme.attend }>
      { displayIcon &&
      <TouchableOpacity style={ [ theme.generalBtn, theme.attendBtn ] }
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