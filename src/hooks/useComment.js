import { baseUrl } from '../../config';
import axios from 'axios';
import { useState } from 'react';
import doFetch from '../utils/doFetch';
import useAuthStorage from './useAuthStorage';

const useComment = () => {
  const { user } = useAuthStorage();
  const [ loading, setLoading ] = useState( false );
  const [ mediaComments, setMediaComments ] = useState( [] );

  const getMediaComments = async ( mediaId ) => {
    const URL = `${ baseUrl }comments/file/${ mediaId }`;
    try {
      setLoading( true );
      const comments = await axios.get( URL );
      setMediaComments( comments.data );
      setLoading( false );
    } catch ( e ) {
      console.log( e );
      setLoading( false );
    }
  };

  const postComment = async ( file_id, content ) => { // eslint-disable-line
    const newComment = {
      file_id,
      comment: content,
    };
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': user.token,
      },
      body: JSON.stringify( newComment ),
    };

    try {
      return await doFetch( baseUrl + 'comments/', options );
    } catch ( error ) {
      console.log( 'error in postComment hook', error );
      return false;
    }

  };

  const deleteComment = async ( id ) => {
    console.log( 'deleteComment hook' );
    const options = {
      method: 'DELETE',
      headers: {
        'x-access-token': user.token,
      },
    };

    try {
      return await doFetch( baseUrl + 'comments/' + id, options );
    } catch ( error ) {
      console.log( 'error in deleteComment hook', error );
      return false;
    }
  };

  const getCurrentUserComments = async () => {
    const options = {
      method: 'GET',
      headers: {
        'x-access-token': user.token,
      },
    };

    try {
      return await doFetch( baseUrl + 'comments/', options );
    } catch ( error ) {
      console.log( 'error in getCurrentUserComments hook', error );
      return false;
    }
  };

  return {
    getMediaComments,
    postComment,
    deleteComment,
    getCurrentUserComments,
    mediaComments,
    loading,
  };

};

export default useComment;
