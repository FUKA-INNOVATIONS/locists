import { Image, Text, View } from 'react-native';
import { uploadsUrl } from '../../config';

const SingleEventHeader = ( { eventDetails } ) => {
  if ( eventDetails === undefined ) return <View><Text>Loading..</Text></View>;
  // const { singleMedia, getMediaById } = useMedia();

  /* useEffect(async() => {
    await getMediaById(eventDetails.file_id)
  },[eventDetails.file_id]) */

  if (eventDetails === undefined) {
    return (
        <>
          <Text>Loading</Text>
        </>
    )
  }

  // const mediaDescription = JSON.parse(singleMedia.description)
  // console.log('singleEventHeader', eventDetails)

  return (
      <>
        <Image source={ { uri: uploadsUrl + eventDetails.thumbnails.w320 } }
               style={ { width: '100%', height: 200 } }/>
        <Text>Title: { eventDetails.title }</Text>
        <Text>Description: { eventDetails.description.description }</Text>
        <Text>Location: { eventDetails.description.location }</Text>
        <Text>File_id: { eventDetails.file_id }</Text>
        <Text>Media type: { eventDetails.description.mediaType }</Text>
      </>
  );
};

export default SingleEventHeader;