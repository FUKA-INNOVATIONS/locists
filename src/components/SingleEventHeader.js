import { useState } from 'react';
import { Button, Image, Text, View } from 'react-native';
import { uploadsUrl } from '../../config';
import theme from "../theme";
import PostComment from './PostComment';

const SingleEventHeader = ({eventDetails}) => {
  if(eventDetails === undefined) return <View><Text>Loading..</Text></View>
  const [ isWriteComment, setIsWriteComment ] = useState( false );
  const description = eventDetails.description;

  const onWriteCommentHandler = () => {
    console.log( 'onWriteCommentHandler' );
    setIsWriteComment(true)
  };

  return (
      <>
        <Button title={ 'Write a comment' } onPress={ onWriteCommentHandler }/>
        <Image source={{uri: uploadsUrl+eventDetails.filename}} style={{width: '100%', height: 200}} />
          <View style={theme.singleEventInfo}>
              <Text style={theme.mediaTitle}>{description.name}</Text>
              <Text>Desc: {description.description}</Text>
              <Text>{description.date}</Text>
              <Text>{description.location}</Text>
              <Text>€{description.price}</Text>
              <Text>Host: {description.owner}</Text>
          </View>

export default SingleEventHeader;