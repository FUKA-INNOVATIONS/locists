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
    // setLoading( true );
    const events = await getEvents();
    const posts = await getPosts();
    const mixed = [ ...events, ...posts ];
    setAllMedia( mixed );
    // setLoading( false );
  };

  const getEvents = async () => {
    const URL = `${ baseUrl }tags/${ eventTag }`;
    try {
      // setLoading( true );
      const events = await axios.get( URL );
      setEvents( events.data );
      // setLoading( false );
      return events.data;
    } catch ( e ) {
      console.log( e );
    }
  };

  const getPosts = async () => {
    const URL = `${ baseUrl }tags/${ postTag }`;
    try {
      // setLoading( true );
      const posts = await axios.get( URL );
      setPosts( posts.data );
      // setLoading( false );
      return posts.data;
    } catch ( e ) {
      console.log( e );
    }
  };

  const getMediaById = async ( mediaId ) => {
    const URL = `${ baseUrl }media/${ mediaId }`;
    try {
      // setLoading( true );
      const singleMedia = await axios.get( URL );
      setSingleMedia( singleMedia.data );
      // setLoading( false );
    } catch ( e ) {
      console.log( e );
    }
  };

  const getSingleMediaComments = async ( mediaId ) => {
    const URL = `${ baseUrl }comments/file/${ mediaId }`;
    try {
      // setLoading( true );
      const comments = await axios.get( URL );
      setSingleMediaComments( comments.data );
      // console.log('comments in hook', comments.data)
      // setLoading( false );
    } catch ( e ) {
      console.log( e );
    }
  };

  const uploadMedia = async ( formData, token ) => {
   // console.log( 'uploadMedia hook' );
    // console.log( 'formData in uploadMedia hook', formData);
    // console.log( 'token in uploadMedia hook', token );

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
      const result = await doFetch(baseUrl + 'media', options);
      // console.log('url', baseUrl)
      // result && setLoading(false);
      return result;
    } catch ( e ) {
      console.log('error in uploadMedia hook', e.message);
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
    events,
    posts,
    allMedia,
    singleMedia,
    singleMediaComments,
    // loadingEvents,
    // loadingPosts,
    // loadingSingleMedia,
    loading,
    // loadingSingleMediaComments,
    // loadingMediaUpload,
  };

};

export default useMedia;