import { Image, Text, View } from 'react-native';
import { uploadsUrl } from '../../config';
import theme from "../theme";

const SingleEventHeader = ({eventDetails}) => {
  if(eventDetails === undefined) return <View><Text>Loading..</Text></View>

    const description = eventDetails.description;

  return (
      <>
        <Image source={{uri: uploadsUrl+eventDetails.filename}} style={{width: '100%', height: 200}} />
          <View style={theme.singleEventInfo}>
              <Text style={theme.mediaTitle}>{description.name}</Text>
              <Text>Desc: {description.description}</Text>
              <Text>{description.date}</Text>
              <Text>{description.location}</Text>
              <Text>€{description.price}</Text>
              <Text>Host: {description.owner}</Text>
          </View>

      </>
  );
};

export default SingleEventHeader;