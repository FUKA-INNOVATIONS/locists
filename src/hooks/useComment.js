import { baseUrl } from '../../config';
import axios from 'axios';
import { useState } from 'react';
import doFetch from '../utils/doFetch';

const useComment = () => {
  const [loading, setLoading] = useState(false);
  const [mediaComments, setMediaComments] = useState([]);

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

  const postComment = async (token, file_id, content) => {
    const newComment = {
      file_id,
      comment: content
    }
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
      body: JSON.stringify(newComment),
    };

    try {
      return await doFetch(baseUrl + 'comments/', options);
    } catch (error) {
      console.log('error on postComment hook', error)
      return false
    }

  }



  return {
    getMediaComments,
    postComment,
    mediaComments,
    loading,
  }

}

export default useComment;