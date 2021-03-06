import React, { useCallback } from 'react'
import { Image, Text, TextInput, View, TouchableOpacity } from 'react-native'
import { Controller, useForm } from 'react-hook-form'
import * as Yup from 'yup'
import useDevice from '../hooks/useDevice'
import useMedia from '../hooks/useMedia'
import useAuthStorage from '../hooks/useAuthStorage'
import theme from '../theme'
import { yupResolver } from '@hookform/resolvers/yup'
import { useFocusEffect } from '@react-navigation/native'
import PropTypes from 'prop-types'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


const UploadPost = props => {   // Handle post creation
  const { user } = useAuthStorage()

  useFocusEffect(
    useCallback( () => {
      return () => resetAll()
    }, [] ),
  )

  const {
    image,
    imageSelected,
    setImageSelected,
    type,
    setType,
    pickImage,
  } = useDevice()
  const { loadingMediaUpload } = useMedia()

  const PostSchema = Yup.object().shape( {
    location: Yup.string().
      min( 3, 'Too Short, min 3 characters!' ).
      max( 20, 'Too Long, max 20 characters!' ).
      required( 'Location is required: 3-20 characters' ),
    description: Yup.string().
      min( 5, 'Too Short, min 5 characters!' ).
      max( 250, 'Too Long, max 250 characters!' ).
      required( 'Description is required: 5-250 characters' ),

  } )

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm( {
    resolver: yupResolver( PostSchema ), mode: 'onBlur',
  } )

  const dummyImage = require( '../../assets/dummy_image.gif' )

  const mediaDescription = {
    location: getValues().location,
    description: getValues().description,
    mediaType: 'post',
    owner: user.username,
    fileType: type,
    hasImage: imageSelected !== dummyImage,
  }

  const resetAll = () => {
    reset()
    setImageSelected( dummyImage )
    setType( 'image' )
  }

  !imageSelected && setImageSelected( dummyImage )  // Upload dummy image if user doesnt select and image

  return (
    <KeyboardAwareScrollView enableAutomaticScroll={ false }
                             enableOnAndroid={ true }
                             viewIsInsideTabBar={ true }>
      { dummyImage !== imageSelected &&
      <Image source={ { uri: image } }
             style={ theme.addImage }/> }
      <TouchableOpacity style={[theme.generalBtn, theme.createMediaButton]} onPress={ pickImage }>
        <Text style={theme.loginButtonText}>Add an Image (optional)</Text>
      </TouchableOpacity>
      <View style={ theme.createMediaForm}>
        <View style={ theme.inputContainer }>
          <Controller
            control={ control }
            render={ ( { field: { onChange, onBlur, value } } ) => (
              <TextInput
                style={ theme.input }
                onBlur={ onBlur }
                onChangeText={ onChange }
                value={ value }
                placeholder='Location'
              />
            ) }
            name='location'
          />
          { errors.location && <Text
            style={ theme.inputErrorText }>{ errors.location.message }</Text> }
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
                placeholder='Post description'
              />
            ) }
            name='description'
          />
          { errors.description &&
          <Text
            style={ theme.inputErrorText }>{ errors.description.message }</Text> }
        </View>


        <TouchableOpacity
          style={ [ theme.generalBtn, theme.createMediaButton ] }
          disabled={ !imageSelected }
          loading={ loadingMediaUpload }
          onPress={ handleSubmit(
            data => props.onSubmit( data, mediaDescription, imageSelected,
              image, type, setImageSelected ) ) }
        >
          <Text style={ theme.loginButtonText }>Create Post</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={ [ theme.generalBtn, theme.createMediaButton ] }
          onPress={ resetAll }>
          <Text style={ theme.loginButtonText }>Reset Form</Text>
        </TouchableOpacity>
      </View>
      </KeyboardAwareScrollView>
  )
}

UploadPost.propTypes = {
  onSubmit: PropTypes.func
}

export default UploadPost