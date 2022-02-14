import { useContext } from 'react';

import UserStorageContext
  from '../context/UserDataLocalStorageContext';

const useUserStorage = () => {
  return useContext( UserStorageContext );
};

export default useUserStorage;