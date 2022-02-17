import { useState } from 'react';
import axios from 'axios';

import { appId } from '../../config';
import { baseUrl } from '../../config';
import { eventTag } from '../../config';
import { postTag } from '../../config';

const useMedia = () => {
  const [ loadingEvents, setLoadingEvents ] = useState( false );
  const [ loadingPosts, setLoadingPosts ] = useState( false );
  const [ events, setEvents ] = useState();
  const [ posts, setPosts ] = useState();

  const getEvents = async () => {
    const URL = `${ baseUrl }tags/${ eventTag }`;
    try {
      setLoadingEvents( true );
      const events = await axios.get( URL );
      setEvents( events.data );
      setLoadingEvents( false );
    } catch ( e ) {
      console.log( e );
    }
  };

  const getPosts = async () => {
    const URL = `${ baseUrl }tags/${ postTag }`;
    try {
      setLoadingEvents( true );
      const posts = await axios.get( URL );
      setPosts( posts.data );
      setLoadingPosts( false );
    } catch ( e ) {
      console.log( e );
    }
  };

  return {
    getEvents,
    getPosts,
    events,
    posts,
    loadingEvents,
    loadingPosts,
  };

};

export default useMedia;
