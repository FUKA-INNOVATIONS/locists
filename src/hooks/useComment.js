import { baseUrl } from '../../config'
import axios from 'axios'
import doFetch from '../utils/doFetch'
import useAuthStorage from './useAuthStorage'

const useComment = () => {
  const authStorage = useAuthStorage()

  const getMediaComments = async ( mediaId, onlyCount = false ) => {  // Fetch media comments
    const URL = `${ baseUrl }comments/file/${ mediaId }`
    try {
      const { data } = await axios.get( URL )
      if (onlyCount) return data.length
      return data
    } catch ( e ) {
      console.log( e )
    }
  }

  // Create new comment
  const postComment = async ( file_id, content ) => { // eslint-disable-line
    const token = await authStorage.getToken()
    const newComment = {
      file_id,
      comment: content,
    }
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
      body: JSON.stringify( newComment ),
    }

    try {
      return await doFetch( baseUrl + 'comments/', options )
    } catch ( error ) {
      console.log( 'error in postComment hook', error )
      return false
    }

  }

  const deleteComment = async ( id ) => { // Delete media comment
    const token = await authStorage.getToken()
    const options = {
      method: 'DELETE',
      headers: {
        'x-access-token': token,
      },
    }

    try {
      return await doFetch( baseUrl + 'comments/' + id, options )
    } catch ( error ) {
      console.log( 'error in deleteComment hook', error )
      return false
    }
  }

  const getCurrentUserComments = async () => { // Get currently authenticated user's comments
    const token = await authStorage.getToken()
    const options = {
      method: 'GET',
      headers: {
        'x-access-token': token,
      },
    }

    try {
      return await doFetch( baseUrl + 'comments/', options )
    } catch ( error ) {
      console.log( 'error in getCurrentUserComments hook', error )
      return false
    }
  }

  return {
    getMediaComments,
    postComment,
    deleteComment,
    getCurrentUserComments,
  }

}

export default useComment
