import { useState } from 'react';
import axios from 'axios';
import doFetch from '../utils/doFetch';
import { baseUrl, eventTag, postTag } from '../../config';
import useAuthStorage from './useAuthStorage';

const useMedia = () => {
  // TODO: get token here, not in views, fix
  const { user } = useAuthStorage();
  const [ loading, setLoading ] = useState( false );
  const [ events, setEvents ] = useState();
  const [ posts, setPosts ] = useState();
  const [ singleMedia, setSingleMedia ] = useState();
  const [ allMedia, setAllMedia ] = useState();
  const [ userMedia, setUserMedia] = useState([]);

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
      let event = await getMediaById( idEvents[ i ], true ); // eslint-disable-line
      event.description.isOwner = (event.user_id === user.user_id)
      eventArr.push( event );
    }
    setEvents( eventArr );
    setLoading(false)
    // console.log('EEE', eventArr)
    return eventArr;
  };

  const getPostsWithThumbnails = async () => {
    setLoading(true)
    const postArr = [];
    const idPosts = await getPosts().
        then( posts => posts.map( post => post.file_id ) );
    for ( let i = 0; i < idPosts.length; i++ ) {
      let post = await getMediaById( idPosts[ i ], true ); // eslint-disable-line
      post.description.isOwner = (post.user_id === user.user_id)
      postArr.push( post );
    }
    setPosts( postArr );
    setLoading(false)
    // console.log('PPP', postArr)
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
      // setLoading( true );
      const { data } = await axios.get( URL );
      if ( data ) {
        data.description = JSON.parse( data.description );
        if ( returnObject ) {
          // setLoading( false );
          return data;
        } else {
          setSingleMedia( data );
          // setLoading( false );
        }
      }
    } catch ( e ) {
      console.log( e );
      setLoading( false );
    }
  };

  const getUserMedia = async (token) => {
    const URL = `${ baseUrl }media/user`;

    const options = {
      method: 'GET',
      headers: {
        'x-access-token': token
      },
    };
    try {
      const data = await doFetch( URL, options );
      console.log('Testing data', data);
      setUserMedia( data );
    } catch (e) {
      console.log('Error in getting user files', e.message);
    }
  };

  // TODO: get token here in the hook
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

  const deleteMedia = async (id) => {
    console.log('DELETE')
    const options = {
      method: 'DELETE',
      headers: {
        'x-access-token': user.token,
      }
    };

    try {
      const result = await doFetch( baseUrl + 'media/' + id, options );
      console.log('delete res in hook', result)
      return result
    } catch ( e ) {
      console.log( 'error in deleteMedia hook', e.message );
      return e.message;
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
    events,
    posts,
    allMedia,
    singleMedia,
    userMedia,
    // loadingEvents,
    // loadingPosts,
    // loadingSingleMedia,
    loading,
    setLoading,
    // loadingMediaUpload,
  };

};

export default useMedia;