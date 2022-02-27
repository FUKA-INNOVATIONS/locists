import { Button, Image, Text, View } from 'react-native';
import { uploadsUrl } from '../../config';
import { useState } from 'react';
import PostComment from './PostComment';

const SinglePostHeader = ( { postDetails } ) => {
  if ( postDetails === undefined ) return <View><Text>Loading..</Text></View>;
  const [ isWriteComment, setIsWriteComment ] = useState( false );


  if (postDetails === undefined) {
    return (
        <>
          <Text>Loading</Text>
        </>
    )
  }

  const onWriteCommentHandler = () => {
    console.log( 'onWriteCommentHandler' );
    setIsWriteComment(true)
  };

  return (
      <>
        <Button title={ 'Write a comment' } onPress={ onWriteCommentHandler }/>
        {isWriteComment && <PostComment file_id={postDetails.file_id} display={setIsWriteComment}/>}
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