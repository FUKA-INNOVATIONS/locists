import { View, Text, Pressable, Alert } from 'react-native';
import useMedia from '../hooks/useMedia';

const DeleteMedia = ( { file_id } ) => { // eslint-disable-line
  const { deleteMedia } = useMedia();

  const deleteHandler = async () => {
    console.log( 'delete event', file_id );
     const mediaDeleted = await deleteMedia( file_id );
     if(mediaDeleted.message) {
       Alert.alert(mediaDeleted.message)
     } else {
       Alert.alert('Deletion failed', mediaDeleted)
     }
  };

  return (
      <View>
        <Pressable onPress={ deleteHandler }>
          <Text>Delete</Text>
        </Pressable>
      </View>
  );
};

export default DeleteMedia;