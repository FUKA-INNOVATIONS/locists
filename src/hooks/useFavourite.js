import doFetch from '../utils/doFetch';
import { baseUrl } from '../../config';
import useAuthStorage from './useAuthStorage';
import { useState } from 'react';

const useFavourite = () => {
  const { user } = useAuthStorage();
  const [ mediaFavourites, setMediaFavourites ] = useState( [] );
  const [ userFavourites, setUserFavourites ] = useState( [] ); // eslint-disable-line

  const createFavourite = async ( file_id ) => {  // eslint-disable-line
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': user.token,
      },
      body: JSON.stringify( { file_id } ),
    };

    try {
      return await doFetch( baseUrl + 'favourites/', options );
    } catch ( error ) {
      console.log( 'error in createFavourite hook', error );
      return false;
    }
  };

  const deleteFavourite = async ( id ) => {
    const options = {
      method: 'DELETE',
      headers: {
        'x-access-token': user.token,
      },
    };

    try {
      return await doFetch( baseUrl + 'favourites/file/' + id, options );
    } catch ( error ) {
      console.log( 'error in deleteFavourite hook', error );
      return false;
    }
  };

  const getCurrentUserFavourites = async () => {
    const options = {
      method: 'GET',
      headers: {
        'x-access-token': user.token,
      },
    };
    try {
      return await doFetch( baseUrl + 'favourites/', options );
    } catch ( error ) {
      console.log( 'error in getCurrentUserFavourites hook', error );
      return false;
    }
  };

  const getMediaFavourites = async ( id ) => {
    const options = {
      method: 'GET',
    };

    try {
      let favourites = await doFetch( baseUrl + 'favourites/file/' + id,
          options );
      // favourites.isOwner = favourites.user_id === user.user_id;
      favourites = favourites.map( favourite => {
        return { ...favourite, isOwner: favourite.user_id === user.user_id };
      } );
      // console.log('f', favourites)
      // setMediaFavourites( favourites );
      return favourites;
    } catch ( error ) {
      console.log( 'error in getMediaFavourites hook', error );
      return false;
    }
  };

  return {
    createFavourite,
    deleteFavourite,
    getCurrentUserFavourites,
    getMediaFavourites,
    mediaFavourites,
    userFavourites,
  };
};

export default useFavourite;