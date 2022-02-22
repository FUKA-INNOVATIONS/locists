import { Button, Image, Text, TextInput, View } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import useDevice from '../hooks/useDevice';
import useMedia from '../hooks/useMedia';
import useAuthStorage from '../hooks/useAuthStorage';
import theme from '../theme';
import { yupResolver } from '@hookform/resolvers/yup';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

const UploadEvent = props => {
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
  const { loadingMediaUpload } = useMedia();

  const EventSchema = Yup.object().shape( {
    location: Yup.string().
        min( 5, 'Too Short!' ).
        max( 20, 'Too Long!' ).
        required( 'Location is required: 5-20 characters' ),
    name: Yup.string().
        min( 5, 'Too Short!' ).
        max( 15, 'Too Long!' ).
        required( 'Name is required: 5-15 characters' ),
    date: Yup.string().
        min( 5, 'Too Short!' ).
        max( 15, 'Too Long!' ).
        required( 'Name is required: format => 13.3.2022' ),
    description: Yup.string().
        min( 25, 'Too Short!' ).
        max( 250, 'Too Long!' ).
        required( 'Description is required: 25-250 characters' ),
    price: Yup.number().
        required( 'Price is required in number format' ),
  } );

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm( {
     resolver: yupResolver( EventSchema ), mode: 'onBlur',
  } );

  const mediaDescription = {
    mediaType: 'event',
    owner: user.user_id,
    fileType: type,
    location: getValues().location,
    name: getValues().name,
    date: getValues().date,
    description: getValues().description,
    price: getValues().price,
  };

  const resetAll = () => {
    reset();
    setImage( 'https://place-hold.it/300x200&text=Choose' );
    setImageSelected( false );
    setType( 'image' );
  };

  return (
      <>
        <Text>Create new event</Text>
        <Image source={ { uri: image } }
               style={ { width: 200, height: 200, borderRadius: 100 } }/>
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
                        style={ theme.input }
                        onBlur={ onBlur }
                        onChangeText={ onChange }
                        value={ value }
                        placeholder="Event name"
                    />
                ) }
                name="name"
            />
            { errors.name && <Text>{ errors.name.message }</Text> }
          </View>

          <View style={ theme.inputContainer }>
            <Controller
                control={ control }
                render={ ( { field: { onChange, onBlur, value } } ) => (
                    <TextInput
                        style={ theme.input }
                        onBlur={ onBlur }
                        onChangeText={ onChange }
                        value={ value }
                        placeholder="Date & time"
                    />
                ) }
                name="date"
            />
            { errors.date && <Text>{ errors.date.message }</Text> }
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
                        placeholder="Event description"
                    />
                ) }
                name="description"
            />
            { errors.description &&
            <Text>{ errors.description.message }</Text> }
          </View>

          <View style={ theme.inputContainer }>
            <Controller
                control={ control }
                render={ ( { field: { onChange, onBlur, value } } ) => (
                    <TextInput
                        style={ theme.input }
                        onBlur={ onBlur }
                        onChangeText={ onChange }
                        value={ value }
                        placeholder="Price"
                    />
                ) }
                name="price"
            />
            { errors.price && <Text>{ errors.price.message }</Text> }
          </View>


          <Button
              disabled={ !imageSelected }
              loading={ loadingMediaUpload }
              title="Create event"
              onPress={ handleSubmit(
                  data => props.onSubmit( data, mediaDescription, imageSelected,
                      image ) ) }
          />
          <Button title="Reset form" onPress={ resetAll }/>
        </View>
      </>
  );
};

export default UploadEvent;