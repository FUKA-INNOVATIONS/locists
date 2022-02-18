import { Image, Text, View } from 'react-native';
import { uploadsUrl } from '../../config';

const SingleEventHeader = ({eventDetails}) => {
  if(eventDetails === undefined) return <View><Text>Loading..</Text></View>
  return (
      <>
        <Image source={{uri: uploadsUrl+eventDetails.thumbnails.w320}} style={{width: '100%', height: 200}} />
        <Text>Title: {eventDetails.title}</Text>
        <Text>Desc: {eventDetails.description}</Text>
      </>
  )
}

export default SingleEventHeader;