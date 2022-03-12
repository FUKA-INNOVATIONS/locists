import { uploadsUrl } from '../../config'
import useTag from '../hooks/useTag'

const fetchAvatar = async ( userId ) => { // Fetch user avatar image
  // console.log('fetchA')
  const { getFilesByTag } = useTag()
  try {
    const avatarArray = await getFilesByTag( 'avatar_' + userId )
    const avatar = avatarArray.pop()
    // console.log('avatar', avatar)
    if (avatar) {
      return uploadsUrl + avatar.filename
    } else {
      return null
    }

  } catch ( error ) {
    console.log('error in fetchAvatar util')
    console.error( error.message )
  }
}

export default fetchAvatar