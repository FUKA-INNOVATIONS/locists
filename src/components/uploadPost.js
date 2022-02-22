import { Button, Image, Text, TextInput, View } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import useDevice from '../hooks/useDevice';
import useMedia from '../hooks/useMedia';
import useAuthStorage from '../hooks/useAuthStorage';
import theme from '../theme';
import { yupResolver } from '@hookform/resolvers/yup';
import dummyImage from '../../assets/dummy_image.gif';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

const UploadPost = props => {
  const { user } = useAuthStorage();

  useFocusEffect(
   useCallback( () => {
   return () => resetAll();
   }, [] ),
   );

  const {
    image,
    setImage,
    imageSelected,
    setImageSelected,
    type,
    setType,
    pickImage,
  } = useDevice();
  const { uploadMedia, loadingMediaUpload } = useMedia();

  const PostSchema = Yup.object().shape( {
    location: Yup.string().
        min( 5, 'Too Short!' ).
        max( 20, 'Too Long!' ).
        required( 'Location is required: 5-20 characters' ),
    description: Yup.string().
        min( 25, 'Too Short!' ).
        max( 250, 'Too Long!' ).
        required( 'Description is required: 25-250 characters' ),

  } );

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    getValues,
  } = useForm( {
    resolver: yupResolver( PostSchema ), mode: 'onBlur',
  } );

  let mediaDescription = {
    mediaType: 'post',
    owner: user.user_id,
    fileType: type,
    location: getValues().location,
    description: getValues().description,
  };

  const resetAll = () => {
    reset();
    setImageSelected( dummyImage );
    setType( 'image' );
  };


  /*
  * Upload dummy image if user doesnt select and image
  * */
  const dummyImage = require( '../../assets/dummy_image.gif' );
  !imageSelected && setImageSelected( dummyImage );

  console.log('dummyImage: ', dummyImage === imageSelected)

  return (
      <>
        <Text>Create new post</Text>
        { dummyImage !== imageSelected && <Image source={ { uri: image } }
                                  style={ {
                                    width: 200,
                                    height: 200,
                                    borderRadius: 100,
                                  } }/> }
        <Button title="Choose image" onPress={ pickImage }/>
        <View>

          <View style={ theme.inputContainer }>
            <Controller
                control={ control }
                render={ ( { field: { onChange, onBlur, value } } ) => (
                    <TextInput
                        style={ theme.input }
                        onBlur={ onBlur }
                        onChangeText={ onChange }
                        value={ value }
                        placeholder="Location"
                    />
                ) }
                name="location"
            />
            { errors.location && <Text>{ errors.location.message }</Text> }
          </View>


          <View style={ theme.inputContainer }>
            <Controller
                control={ control }
                render={ ( { field: { onChange, onBlur, value } } ) => (
                    <TextInput
                        style={ { ...theme.input, height: 100 } }
                        multiline={ true }
                        numberOfLines={ 5 }
                        onBlur={ onBlur }
                        onChangeText={ onChange }
                        value={ value }
                        placeholder="Enter post text here.."
                    />
                ) }
                name="description"
            />
            { errors.description &&
            <Text>{ errors.description.message }</Text> }
          </View>


          <Button
              disabled={ !imageSelected }
              loading={ loadingMediaUpload }
              title="Create post"
              onPress={ handleSubmit(
                  data => props.onSubmit( data, mediaDescription, imageSelected,
                      image, setImageSelected ) ) }
          />
          <Button title="Reset form" onPress={ resetAll }/>
        </View>
      </>
  );
};

export default UploadPost;