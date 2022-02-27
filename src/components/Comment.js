import { View, Text, Image } from 'react-native';
import TimeAgo from '@andordavoti/react-native-timeago';

const Comment = ( { commentObj, avatar } ) => {
  // const { comment_id, file_id, user_id, comment, time_added } = commentObj;

  return (
      <View>
        <Image source={{uri: 'http://placekitten.com/35/35'}} style={ { width: 35, height: 35 } } />
        <Text>Comment: {commentObj.comment}</Text>
        <Text>Commented <TimeAgo dateTo={new Date(commentObj.time_added)} /></Text>
        <Text>Likes</Text>
      </View>
  );
};

export default Comment;