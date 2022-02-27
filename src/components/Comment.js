import { View, Text, Image } from 'react-native';
import theme from "../theme";

import { AntDesign } from '@expo/vector-icons';

const Comment = ( { commentObj, avatar } ) => {
  // const { comment_id, file_id, user_id, comment, time_added } = commentObj;

  return (
      <View style={theme.postComment}>
        <Image source={{uri: 'http://placekitten.com/35/35'}} style={theme.commentAvatar } />
        <View>
            <Text>{commentObj.comment}</Text>
            <Text>Added: {commentObj.time_added}</Text>
        </View>
              <Text>
                  0
                  <AntDesign name="like2" size={24} color="black" />
              </Text>
      </View>
  );
};

export default Comment;