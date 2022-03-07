import { View, Text, Alert, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import useFavourite from '../hooks/useFavourite'
import theme from '../theme'
import useAuthStorage from '../hooks/useAuthStorage'

const Attend = ( { file_id, displayIcon, single } ) => {  // eslint-disable-line
  const [ updateView, setUpdateView ] = useState(false)
  const { user } = useAuthStorage()
  // console.log('attend.js')
  const {
    getMediaFavourites,
    deleteFavourite,
    createFavourite,
  } = useFavourite()
  const [ mediaFavourites, setMediaFavourites ] = useState( [] )

  const fetchAttendees = async () => {
    await getMediaFavourites( file_id ).then( mediaFavourites => setMediaFavourites(mediaFavourites))
  }

  useEffect( async () => {
    let cancel = true
    await getMediaFavourites( file_id ).then( mediaFavourites => {
      if ( cancel ) return
      setMediaFavourites( mediaFavourites )
    } )
    setUpdateView(false)
    return () => {
     cancel = true
     }
  }, [updateView] )

  const likeHandler = async () => {
    console.log( 'Attend', file_id )
    if ( hasAttended() ) {

      await deleteFavourite( file_id ).then( async () => await fetchAttendees())
    } else {

      if ( !user.isLogged ) {
        Alert.alert( 'You must login',
          'Only logged in users are able to attend events, please login to your account and try again!' )
      }

      await createFavourite( file_id ).then( async () => await fetchAttendees())
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