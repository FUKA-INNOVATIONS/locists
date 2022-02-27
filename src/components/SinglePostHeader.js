import { Image, Text, View } from 'react-native';
import { uploadsUrl } from '../../config';
import theme from "../theme";
import {AntDesign} from "@expo/vector-icons";

const SinglePostHeader = ( { postDetails } ) => {

  /* useEffect(async() => {
   await getMediaById(eventDetails.file_id)
   },[eventDetails.file_id]) */

  if (postDetails === undefined) {
      return (
          <>
              <Text>Loading</Text>
          </>
      );
  };

    const description = postDetails.description;


    return (
        <View style={theme.singlePost}>
            <Text style={theme.singlePostOwner}>{description.owner}</Text>
            <View style={theme.imageAndLikes}>
                <Image source={{uri: uploadsUrl+postDetails.filename}} style={theme.singlePostImage} />
                <View>
                    <AntDesign name="like2" size={40} color="black" />
                    <Text style={theme.singlePostLikes}>0</Text>
                </View>
            </View>
            <View style={theme.singlePostText}>
                <Text>{description.description}</Text>
            </View>
        </View>
    );
};

export default SinglePostHeader;