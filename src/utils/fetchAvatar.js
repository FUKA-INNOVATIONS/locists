import { uploadsUrl } from '../../config';
import useTag from '../hooks/useTag';

const fetchAvatar = async ( userId ) => {
  const { getFilesByTag } = useTag();
  try {
    const avatarArray = await getFilesByTag( 'avatar_' + userId );
    const avatar = avatarArray.pop();
    console.log('avatar', avatar)
    return uploadsUrl + avatar.filename;
  } catch ( error ) {
    console.error( error.message );
  }
};

export default fetchAvatar;