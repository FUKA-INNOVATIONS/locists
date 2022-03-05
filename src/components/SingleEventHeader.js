import { useState } from 'react';
import { Image, Text, TouchableOpacity, View} from 'react-native';
import { uploadsUrl } from '../../config';
import PostComment from './PostComment';
import Attend from './Attend';
import theme from "../theme";
import AddComment from "../../assets/icons/AddComment.svg";

const SingleEventHeader = ({eventDetails}) => {
    if (eventDetails === undefined) return <View><Text>Loading..</Text></View>
    const [isWriteComment, setIsWriteComment] = useState(false);

  const onWriteCommentHandler = () => {
    console.log( 'onWriteCommentHandler' );
    setIsWriteComment(!isWriteComment)
  };

  
  if ( eventDetails === undefined ) {
    return (
        <>
          <Text>Loading</Text>
        </>
    );
  }
  
  return (
      <View>
        <Image source={ { uri: uploadsUrl + eventDetails.thumbnails.w320 } }
               style={ { width: '100%', height: 200 } }/>
          <View style={ theme.singleEventInfo }>
              <View style={ theme.infoTop}>
                  <View>
                    <Text style={ theme.mediaTitle }>{ eventDetails.description.name }</Text>
                    <Text>Location: { eventDetails.description.location }</Text>
                  </View>
                      <Attend displayIcon file_id={eventDetails.file_id} single={true} />
              </View>

              <View style={ theme.infoBottom }>
                  <Text style={{width: '80%'}}>Description: { eventDetails.description.description }</Text>
                  <TouchableOpacity onPress={ onWriteCommentHandler }>
                      <AddComment width={32} height={32} />
                  </TouchableOpacity>
              </View>

              {/* <Text>File_id: { eventDetails.file_id }</Text> */}
              {/* <Text>Media type: { eventDetails.description.mediaType }</Text> */}
          </View>

          <View style={ { alignItems: 'center' } }>
            {isWriteComment && <PostComment file_id={eventDetails.file_id} display={setIsWriteComment}/>}
          </View>
      </View>
  );
};

export default SingleEventHeader;