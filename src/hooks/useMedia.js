import { useState } from 'react';
import axios from 'axios';
import doFetch from '../utils/doFetch';
import { baseUrl, eventTag, postTag } from '../../config';

const useMedia = () => {
  // const [ loadingEvents, setLoadingEvents ] = useState( false );
  // const [ loadingPosts, setLoadingPosts ] = useState( false );
  // const [ loadingSingleMedia, setLoadingSingleMedia ] = useState( false );
  const [ loading, setLoading ] = useState( false );
  // const [ loadingSingleMediaComments, setSingleLoadingMediaComments ] = useState(false );
  // const [ loadingMediaUpload, setLoadingMediaUpload ] = useState( false );

  const [ events, setEvents ] = useState();
  const [ posts, setPosts ] = useState();
  const [ singleMedia, setSingleMedia ] = useState();
  const [ allMedia, setAllMedia ] = useState();
  const [ singleMediaComments, setSingleMediaComments ] = useState();

  const getAllMedia = async () => {

    /*
     * inorder to get thumbnails for optimization
     * get all ids and fetch files
     * */

    const events = await getEventsWithThumbnails();
    const posts = await getPostsWithThumbnails();

    const mixed = [ ...events, ...posts ];
    setAllMedia( mixed );

  };

  const getEventsWithThumbnails = async () => {
    setLoading(true)
    const eventArr = [];
    const idEvents = await getEvents().
        then( events => events.map( event => event.file_id ) );
    for ( let i = 0; i < idEvents.length; i++ ) {
      let event = await getMediaById( idEvents[ i ], true );
      eventArr.push( event );
    }
    setEvents( eventArr );
    setLoading(false)
    return eventArr;
  };

  const getPostsWithThumbnails = async () => {
    setLoading(true)
    const postArr = [];
    const idPosts = await getPosts().
        then( posts => posts.map( post => post.file_id ) );
    for ( let i = 0; i < idPosts.length; i++ ) {
      let post = await getMediaById( idPosts[ i ], true );
      postArr.push( post );
    }
    setPosts( postArr );
    setLoading(false)
    return postArr;
  };

  const getEvents = async () => {
    const URL = `${ baseUrl }tags/${ eventTag }`;
    try {
      const events = await axios.get( URL );
      setEvents( events.data );
      return events.data;
    } catch ( e ) {
      console.log( e );
    }
  };

  const getPosts = async () => {
    const URL = `${ baseUrl }tags/${ postTag }`;
    try {
      const posts = await axios.get( URL );
      setPosts( posts.data );
      return posts.data;
    } catch ( e ) {
      console.log( e );
    }
  };

  const getMediaById = async ( mediaId, returnObject = false ) => {
    const URL = `${ baseUrl }media/${ mediaId }`;
    try {
      setLoading( true );
      const { data } = await axios.get( URL );
      if ( data ) {
        data.description = JSON.parse( data.description );
        if ( returnObject ) {
          setLoading( false );
          return data;
        } else {
          setSingleMedia( data );
          setLoading( false );
        }
      }
    } catch ( e ) {
      console.log( e );
      setLoading( false );
    }
  };

  const getSingleMediaComments = async ( mediaId ) => {
    const URL = `${ baseUrl }comments/file/${ mediaId }`;
    try {
      setLoading( true );
      const comments = await axios.get( URL );
      setSingleMediaComments( comments.data );
      setLoading( false );
    } catch ( e ) {
      console.log( e );
      setLoading( false );
    }
  };

  const uploadMedia = async ( formData, token ) => {

    const options = {
      method: 'POST',
      headers: {
        'x-access-token': token,
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    };

    try {
      // setLoading(true);
      const result = await doFetch( baseUrl + 'media', options );
      // console.log('url', baseUrl)
      // result && setLoading(false);
      return result;
    } catch ( e ) {
      console.log( 'error in uploadMedia hook', e.message );
      return false;
    }

  };

  return {
    getEvents,
    getPosts,
    getMediaById,
    getAllMedia,
    getSingleMediaComments,
    uploadMedia,
    getEventsWithThumbnails,
    getPostsWithThumbnails,
    events,
    posts,
    allMedia,
    singleMedia,
    singleMediaComments,
    // loadingEvents,
    // loadingPosts,
    // loadingSingleMedia,
    loading,
    setLoading,
    // loadingSingleMediaComments,
    // loadingMediaUpload,
  };

};

export default useMedia;