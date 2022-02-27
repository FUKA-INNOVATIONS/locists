import { Button, Image, Text, View } from 'react-native';
import { uploadsUrl } from '../../config';
import { useState } from 'react';
import theme from "../theme";
import {AntDesign} from "@expo/vector-icons";
import PostComment from './PostComment';

const SinglePostHeader = ( { postDetails } ) => {

const SinglePostHeader = ( { postDetails } ) => {
  if ( postDetails === undefined ) return <View><Text>Loading..</Text></View>;
  const [ isWriteComment, setIsWriteComment ] = useState( false );



  if (postDetails === undefined) {
      return (
          <>
              <Text>Loading</Text>
          </>
      );
  };

    const description = postDetails.description;

    const onWriteCommentHandler = () => {
      console.log( 'onWriteCommentHandler' );
      setIsWriteComment(true)
    };
  
    return (
        <View style={theme.singlePost}>
            <Button title={ 'Write a comment' } onPress={ onWriteCommentHandler }/>
            {isWriteComment && <PostComment file_id={postDetails.file_id} display={setIsWriteComment}/>}
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