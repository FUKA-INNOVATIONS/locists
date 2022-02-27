import { useState } from 'react';
import { Button, Image, Text, View } from 'react-native';
import { uploadsUrl } from '../../config';

import PostComment from './PostComment';

const SingleEventHeader = ( { eventDetails } ) => {
  if ( eventDetails === undefined ) return <View><Text>Loading..</Text></View>;
  const [ isWriteComment, setIsWriteComment ] = useState( false );

  if ( eventDetails === undefined ) {
    return (
        <>
          <Text>Loading</Text>
        </>
    );
  }

  const onWriteCommentHandler = () => {
    console.log( 'onWriteCommentHandler' );
    setIsWriteComment(true)
  };

  const onPostCommentHandler = () => {
    console.log( 'onPostCommentHandler' );
    setIsWriteComment(false)
  };

  return (
      <>
        <Button title={ 'Write a comment' } onPress={ onWriteCommentHandler }/>
        {isWriteComment && <PostComment file_id={eventDetails.file_id} display={setIsWriteComment}/>}
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