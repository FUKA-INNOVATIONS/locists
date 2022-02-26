import axios from 'axios'
import { baseUrl } from '../../config'
import doFetch from '../utils/doFetch';

const useTag = () => {
  const createTag = async (tagData, token) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
      body: JSON.stringify(tagData),
    };

    try {
      return await doFetch(baseUrl + 'tags/', options);
    } catch (error) {
      console.log('error on createTag hook', error)
      return false
    }
  }

  const getFilesByAppId = async (tag) => {
    const URL = `${baseUrl}tags/${tag}`
    try {
      const response = await axios.get(URL, tag)
      return response.data
    } catch (error) {
      console.log('getFilesByTag error', error)
    }
  }

  const getFilesByTag = async (tag) => {
    return await doFetch(baseUrl + 'tags/' + tag);
  };

  return { createTag, getFilesByAppId, getFilesByTag }
}

export default useTag;
