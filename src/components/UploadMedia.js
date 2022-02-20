import { View, Text, Image, Button, TextInput, Alert } from 'react-native';
import useMedia from '../hooks/useMedia';
import { useCallback, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as ImagePicker from 'expo-image-picker';

import useAuthStorage from '../hooks/useAuthStorage';
import { useFocusEffect } from '@react-navigation/native';

const UploadMedia = ( { mediaType } ) => {
  const { uploadMedia, loadingMediaUpload } = useMedia();
  const [ image, setImage ] = useState(
      'https://place-hold.it/300x200&text=Choose' );
  const [ imageSelected, setImageSelected ] = useState( false );
  const [ type, setType ] = useState( 'image' );
  const { user, token } = useAuthStorage();

  useFocusEffect(
      useCallback( () => {
        return () => reset();
      }, [] ),
  );

  const formData = new FormData();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm( {
    defaultValues: {
      title: '',
      description: '',
    },
  } );

  // console.log('FORM ERRORS: ', errors)

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync( {
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 0.5,
    } );
    console.log( 'picked img: ', result );
    if ( !result.cancelled ) {
      setImage( result.uri );
      setImageSelected( true );
      setType( result.type );
    }
  };

  const onSubmit = async ( data ) => {

    // console.log( 'uploadMedia onSubmit' );

    let mediaDescription = {
      mediaType,
      owner: user.username,
      description: data.description,
    };
    mediaDescription = JSON.stringify( mediaDescription );

    if ( !imageSelected ) {
      Alert.alert( 'Please, select a file' );
      return;
    }

    const formData = new FormData();
    formData.append( 'title', data.title );
    formData.append( 'description', mediaDescription );
    const filename = image.split( '/' ).pop();
    let fileExtension = filename.split( '.' ).pop();
    fileExtension = fileExtension === 'jpg' ? 'jpeg' : fileExtension;
    formData.append( 'file', {
      uri: image,
      name: filename,
      type: type + '/' + fileExtension,
    } );

    // console.log('token in submitMedia ', token)
    const response = await uploadMedia( formData, token );
    console.log('upload res in onSubmit', response)

  };

  const reset = () => {
    setImage( 'https://place-hold.it/300x200&text=Choose' );
    setImageSelected( false );
    setValue( 'title', '' );
    setValue( 'description', '' );
    setType( 'image' );
  };

  switch ( mediaType ) {
    case 'profileImage':
      return (
          <View>
            <Text>Upload profile image</Text>
            <Image source={ { uri: image } }
                   style={ { width: 200, height: 200, borderRadius: 100 } }/>
            <View>
              <Controller
                  control={ control }
                  rules={ {
                    required: true,
                  } }
                  render={ ( { field: { onChange, onBlur, value } } ) => (
                      <TextInput
                          onBlur={ onBlur }
                          onChangeText={ onChange }
                          value={ value }
                          autoCapitalize="none"
                          placeholder="Title"
                          errorMessage={ errors.title && 'This is required.' }
                      />
                  ) }
                  name="title"
              />

              <Controller
                  control={ control }
                  rules={ {
                    // required: false,
                  } }
                  render={ ( { field: { onChange, onBlur, value } } ) => (
                      <TextInput
                          onBlur={ onBlur }
                          onChangeText={ onChange }
                          value={ value }
                          autoCapitalize="none"
                          placeholder="Description"
                          errorMessage={ errors.description &&
                          'This is required.' }
                      />
                  ) }
                  name="description"
              />

              <Button title="Choose image" onPress={ pickImage }/>
              <Button
                  disabled={ !imageSelected }
                  loading={ loadingMediaUpload }
                  title="Upload"
                  onPress={ handleSubmit( onSubmit ) }
              />
              <Button title="Reset form" onPress={ reset }/>
            </View>
          </View>
      );
      break;
    default:
      return (
          <View></View>
      );
  }
};

export default UploadMedia;