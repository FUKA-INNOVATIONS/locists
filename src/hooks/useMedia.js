import { useState } from 'react';
import axios from 'axios';

import { baseUrl, eventTag, postTag } from '../../config';


const useMedia = () => {
  const [ loadingEvents, setLoadingEvents ] = useState( false );
  const [ loadingPosts, setLoadingPosts ] = useState( false );
  const [ loadingSingleMedia, setLoadingSingleMedia ] = useState( false );
  const [ loadingAllMedia, setLoadingAllMedia ] = useState( false );

  const [ events, setEvents ] = useState();
  const [ posts, setPosts ] = useState();
  const [ singleMedia, setSingleMedia ] = useState();
  const [ allMedia, setAllMedia ] = useState();

  const getAllMedia = async () => {
    setLoadingAllMedia(true);
    const events = await getEvents();
    const posts = await getPosts();
    const mixed = [ ...events, ...posts ];
    setAllMedia( mixed );
    setLoadingAllMedia(false);
  };

  const getEvents = async () => {
    const URL = `${ baseUrl }tags/${ eventTag }`;
    try {
      setLoadingEvents( true );
      const events = await axios.get( URL );
      setEvents( events.data );
      setLoadingEvents( false );
      return events.data;
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
      return posts.data;
    } catch ( e ) {
      console.log( e );
    }
  };

  const getMediaById = async ( mediaId ) => {
    const URL = `${ baseUrl }media/${ mediaId }`;
    try {
      setLoadingSingleMedia( true );
      const singleMedia = await axios.get( URL );
      setSingleMedia( singleMedia.data );
      setLoadingSingleMedia( false );
    } catch ( e ) {
      console.log( e );
    }
  };

  return {
    getEvents,
    getPosts,
    getMediaById,
    getAllMedia,
    events,
    posts,
    allMedia,
    singleMedia,
    loadingEvents,
    loadingPosts,
    loadingSingleMedia,
    loadingAllMedia,
  };

};

export default useMedia;
