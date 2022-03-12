import React, { useState } from 'react'
import { View, Text, Pressable, Alert, StyleSheet } from 'react-native'
import useMedia from '../hooks/useMedia'
import Loading from './Loading'
import PropTypes from 'prop-types'

const DeleteMedia = ( { file_id, display } ) => { // eslint-disable-line
  const { deleteMedia } = useMedia()
  const [ loading, setLoading ] = useState()

  const deleteHandler = async () => { // Handle Delete button
    setLoading( true )
    // console.log( 'delete event', file_id )
    const mediaDeleted = await deleteMedia( file_id )   // Try to delete post / event
    if ( mediaDeleted.message ) { // Deletion succeeded, alert the user
      setLoading( false )
      Alert.alert( mediaDeleted.message )
    } else {  // Deletion failed, alert the user
      setLoading( false )
      Alert.alert( 'Deletion failed', mediaDeleted )
    }
  }

  if ( loading ) return <Loading text={ 'Deleting media' } />

  return (
    <View style={ styles.container }>
      <View style={ styles.iconContainer }>
        <Pressable onPress={ deleteHandler }>
          <Text style={ styles.icon }>X</Text>
        </Pressable>
      </View>
      { display && <Text style={ styles.text }>Delete</Text> }
    </View>
  )
}

DeleteMedia.propTypes = {
  file_id: PropTypes.number,
  display: PropTypes.bool,
}

const styles = StyleSheet.create( {
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  iconContainer: {
    width: 30,
    height: 30,
    borderColor: 'red',
    borderWidth: 2,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'red',
  },
  text: {
    marginLeft: 10,
    color: 'red',
    fontSize: 20,
  },
} )

export default DeleteMedia