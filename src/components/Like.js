import { View, Text, Pressable, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'

import useFavourite from '../hooks/useFavourite'
import HeartEmpty from '../../assets/icons/HeartEmpty.svg'
import HeartFull from '../../assets/icons/HeartFull.svg'
import theme from '../theme'
import useAuthStorage from '../hooks/useAuthStorage'

const Like = ( { file_id, displayIcon, single } ) => {  // eslint-disable-line
  const { user } = useAuthStorage()
  const {
    getMediaFavourites,
    deleteFavourite,
    createFavourite,
  } = useFavourite()
  const [ mediaFavourites, setMediaFavourites ] = useState( [] )

  const fetchLikes = async () => {
    await getMediaFavourites( file_id ).
      then( favourites => {
        setMediaFavourites( favourites )
      } )
  }


  useEffect( async () => {
    // let cancel = true
    await getMediaFavourites( file_id ).
      then( favourites => {
        // if ( cancel ) return
        setMediaFavourites( favourites )
      } )
    /* return () => {
     cancel = true
     } */
  }, [] )

  const likeHandler = async () => {
    console.log( 'Like', file_id )

    if ( !user.isLogged ) {
      Alert.alert( 'You must login',
        'Only logged in users are able to like posts, please login to your account and try again!' )
      return
    }

    if ( hasLiked() ) {
      await deleteFavourite( file_id ).then(async () => await fetchLikes())
    } else {
      await createFavourite( file_id ).then(async () => await fetchLikes())
    }

  }

  const hasLiked = () => {
    return mediaFavourites.filter( f => f.isOwner ).length > 0
  }

  return (
    <View style={ single ? theme.singlePostLikes : theme.postLikes }>
      <Text style={ single
        ? { color: '#fff' }
        : { color: '#000' } }>{ mediaFavourites.length }</Text>
      { displayIcon && <Pressable onPress={ likeHandler }>
        { hasLiked()
          ?
          <HeartFull width={ 30 } height={ 30 } />
          :
          <HeartEmpty width={ 30 } height={ 30 } />
        }
      </Pressable> }
    </View>
  )
}

export default Like