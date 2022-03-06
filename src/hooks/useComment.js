import { baseUrl } from '../../config'
import axios from 'axios'
import doFetch from '../utils/doFetch'
import useAuthStorage from './useAuthStorage'

const useComment = () => {
  const authStorage = useAuthStorage()

  const getMediaComments = async ( mediaId ) => {
    const URL = `${ baseUrl }comments/file/${ mediaId }`
    try {
      const comments = await axios.get( URL )
      // setMediaComments(comments)
      return comments.data
    } catch ( e ) {
      console.log( e )
    }
  }

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

  const deleteComment = async ( id ) => {
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

  const getCurrentUserComments = async () => {
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
