import { useState } from 'react'
import axios from 'axios'
import doFetch from '../utils/doFetch'
import { baseUrl, eventTag, postTag } from '../../config'
import useAuthStorage from './useAuthStorage'
import fetchAvatar from '../utils/fetchAvatar'
import useComment from './useComment'
import useFavourite from './useFavourite'


/* Weired and strange issues : Ilkka saw the issue
 * Keeping state here and returning it to caller created unlimited re-rendering issue
 * Above issue was solved by  returning state to caller and not the state it self
 * **/


const useMedia = () => {
  const { user } = useAuthStorage()
  const authStorage = useAuthStorage()
  const [ singleMedia, setSingleMedia ] = useState()
  const [ userMedia, setUserMedia ] = useState()

  const { getMediaComments } = useComment()
  const { getMediaFavourites } = useFavourite()

  const getAllMedia = async () => {
    // console.log( 'called getAllMedia hook' )

    const events = await getEventsWithThumbnails()
    const posts = await getPostsWithThumbnails()

    return [ ...events, ...posts ]
  }

  const getEventsWithThumbnails = async () => { // Helper
    const idEvents = await getEvents().
      then( events => events.map( event => event.file_id ) )
    return await fetchWithThumbnails(idEvents, 'event')
  }

  const getPostsWithThumbnails = async () => { // Helper
    const idPosts = await getPosts().
      then( posts => posts.map( post => post.file_id ) )
    return await fetchWithThumbnails(idPosts, 'post')
  }

  const fetchWithThumbnails = async (idArr, type, ) => {
    /* API WORKAROUND
     * inorder to get thumbnails and other details for optimization
     * get all ids and fetch files
     * */

      const newArr = []

      for ( let i = 0; i < idArr.length; i++ ) {
        const object = await getMediaById( idArr[ i ], true )
        object.description.isOwner = ( object.user_id === user.user_id )
        object.description.ownerAvatar = await fetchAvatar( object.user_id )  // Set owner avatar url

        object.description.commentsCount = await getMediaComments( object.file_id ).   // Set comments count for sorting
          then( e => e.length )

        switch ( type ) { // Set attendees or likes count
          case 'event':
            object.description.attendeesCount = await getMediaFavourites(
              object.file_id ).then( attendees => attendees.length )
            break
          case 'post':
            object.description.likesCount = await getMediaFavourites( object.file_id ).
              then( likes => likes.length )
            break
          default:
            return
        }

        // Set internal id for list opt // this was not implemented, would have been used to fetch limited objects for FlatList and
        // fetching more objects when user scrolled the list, usually this is handled by backend
        // Existing API endpoint was not an option for app requirements
        object.eventId = i + 1
        newArr.push( object )
      }
      return newArr
  }

  const getEvents = async () => {
    const URL = `${ baseUrl }tags/${ eventTag }`
    try {
      const events = await axios.get( URL )
      return events.data
    } catch ( e ) {
      console.log( e )
    }
  }

  const getPosts = async () => {
    const URL = `${ baseUrl }tags/${ postTag }`
    try {
      const posts = await axios.get( URL )
      return posts.data
    } catch ( e ) {
      console.log( e )
    }
  }

  const getMediaById = async ( mediaId, returnObject = false ) => {
    const URL = `${ baseUrl }media/${ mediaId }`
    try {
      const { data } = await axios.get( URL )
      if ( data ) {
        data.description = JSON.parse( data.description );
        data.description.ownerAvatar = await fetchAvatar( data.user_id );
        data.description.isOwner = ( data.user_id === user.user_id )
        if ( returnObject ) {
          return data
        } else {
          setSingleMedia( data )
        }
      }
    } catch ( e ) {
      console.log( e )
    }
  }

  const getUserMedia = async ( ) => {
    const userMediaPE = []
    const token = await authStorage.getToken()
    const URL = `${ baseUrl }media/user`
    const options = {
      method: 'GET',
      headers: {
        'x-access-token': token,
      },
    }
    try {
      const data = await doFetch( URL, options )
      if ( data ) {
        console.log( data.length )
        for ( let i = 0; i < data.length; i++ ) {
          try {
            data[ i ].description = JSON.parse( data[ i ].description )
          } catch (e) {
            console.log('error in parsing user data desc to json')
          }
          const type = data[ i ].description.mediaType;
          ( type === 'event' || type === 'post' ) &&
          userMediaPE.push( data[ i ] )
        }
      }
      setUserMedia( userMediaPE )
    } catch ( e ) {
      console.log( 'Error in getting user files', e.message )
    }
  }

  const uploadMedia = async ( formData ) => {
    const token = await authStorage.getToken()
    const options = {
      method: 'POST',
      headers: {
        'x-access-token': token,
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    }

    try {
      const result = await doFetch( baseUrl + 'media', options )
      return result
    } catch ( e ) {
      console.log( 'error in uploadMedia hook', e.message )
      return false
    }

  }

  const deleteMedia = async ( id ) => {
    const token = await authStorage.getToken()
    console.log( 'DELETE' )
    const options = {
      method: 'DELETE',
      headers: {
        'x-access-token': token,
      },
    }

    try {
      const result = await doFetch( baseUrl + 'media/' + id, options )
      console.log( 'delete res in hook', result )
      return result
    } catch ( e ) {
      console.log( 'error in deleteMedia hook', e.message )
      return e.message
    }

  }

  return {
    getEvents,
    getPosts,
    getMediaById,
    getAllMedia,
    getUserMedia,
    uploadMedia,
    getEventsWithThumbnails,
    getPostsWithThumbnails,
    deleteMedia,
    singleMedia,
    userMedia,
  }

}

export default useMedia