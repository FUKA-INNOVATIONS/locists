import useUserStorage from '../hooks/useUserStorage';


export const isLoggedIn = async () => {
  const userStorage = useUserStorage()
  const token = await userStorage.getUsername()
  return token
}