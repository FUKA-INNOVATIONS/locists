import { Image, Text, View } from 'react-native';
import { uploadsUrl } from '../../config';

const SinglePostHeader = ( { postDetails } ) => {
  if ( postDetails === undefined ) return <View><Text>Loading..</Text></View>;

  /* useEffect(async() => {
   await getMediaById(eventDetails.file_id)
   },[eventDetails.file_id]) */

  if (postDetails === undefined) {
    return (
        <>
          <Text>Loading</Text>
        </>
    )
  }

  // const mediaDescription = JSON.parse(singleMedia.description)
  console.log('postDetails in singlePostHeader', postDetails)

  return (
      <>
        <Image source={ { uri: uploadsUrl + postDetails.thumbnails.w320 } }
               style={ { width: '100%', height: 200 } }/>
        <Text>Title: { postDetails.title }</Text>
        <Text>Description: { postDetails.description.description }</Text>
        <Text>Location: { postDetails.description.location }</Text>
        <Text>File_id: { postDetails.file_id }</Text>
        <Text>Media type: { postDetails.description.mediaType }</Text>
      </>
  );
};

export default SinglePostHeader;