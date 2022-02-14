import { useContext } from 'react';

import UserStorageContext
  from '../context/UserStorageContext';

const useUserStorage = () => {
  return useContext( UserStorageContext );
};

export default useUserStorage;