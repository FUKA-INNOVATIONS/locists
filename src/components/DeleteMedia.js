import React, { useState } from 'react'
import { View, Text, Pressable, Alert } from 'react-native'
import useMedia from '../hooks/useMedia'
import Loading from './Loading'

const DeleteMedia = ( { file_id } ) => { // eslint-disable-line
  const { deleteMedia } = useMedia()
  const [ loading, setLoading ] = useState()

  const deleteHandler = async () => {
    setLoading(true)
    console.log( 'delete event', file_id )
    const mediaDeleted = await deleteMedia( file_id )
    if ( mediaDeleted.message ) {
      setLoading(false)
      Alert.alert( mediaDeleted.message )
    } else {
      setLoading(false)
      Alert.alert( 'Deletion failed', mediaDeleted )
    }
  }

  if (loading) return <Loading text={'Deleting media'} />

  return (
    <View>
      <Pressable onPress={ deleteHandler }>
        <Text style={ { color: 'red' } }>X Delete</Text>
      </Pressable>
    </View>
  )
}

export default DeleteMedia