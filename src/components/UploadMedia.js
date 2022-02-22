import { Alert } from 'react-native';
import useMedia from '../hooks/useMedia';

import useAuthStorage from '../hooks/useAuthStorage';
import useTag from '../hooks/useTag';
import UploadAvatar from './UploadAvatar';
import UploadEvent from './uploadEvent';
import { postTag, eventTag } from '../../config';
import UploadPost from './uploadPost';

const UploadMedia = ( { mediaType } ) => {
  const { user, token } = useAuthStorage();
  const { createTag } = useTag();
  const { uploadMedia } = useMedia();

  /* useFocusEffect(
   useCallback( () => {
   return () => reset();
   }, [] ),
   ); */

  const onSubmit = async ( data, mediaDescription, imageSelected, image ) => {
    mediaDescription = JSON.stringify( mediaDescription );


    if ( !imageSelected ) {
      Alert.alert( 'Please, select a file' );
      return;
    }
    // TODO: Handle too big image case

    const formData = new FormData();  // eslint-disable-line
    data.title && formData.append( 'title', data.name );
    formData.append( 'description', mediaDescription );
    const filename = image.split( '/' ).pop();
    let fileExtension = filename.split( '.' ).pop();
    fileExtension = fileExtension === 'jpg' ? 'jpeg' : fileExtension;
    formData.append( 'file', {
      uri: image,
      name: filename,
      type: mediaDescription.fileType + '/' + fileExtension,
    } );

    // Upload media
    const response = await uploadMedia( formData, token );

    // Create new tag and associate it with uploaded media

    let tag = '';
    switch ( mediaType ) {
      case 'avatar':
        tag = `avatar_${ user.user_id }`;
        break;
      case 'event':
        tag = eventTag;
        break;
      case 'post':
        tag = postTag;
    }

    const tagResponse = await createTag(
        {
          file_id: response.file_id,
          tag,
        },
        token,
    );

    console.log( 'new tag res in onSubmit', tagResponse );
    console.log( 'upload res in onSubmit', response );
  };

  switch ( mediaType ) {
    case 'avatar':
      return <UploadAvatar onSubmit={ onSubmit }/>;

    case 'event':
      return <UploadEvent onSubmit={ onSubmit }/>;
    default:
      return <UploadPost onSubmit={ onSubmit }/>;
  }
};

export default UploadMedia;