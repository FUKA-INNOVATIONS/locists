import {
  Image,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Platform,
} from 'react-native'
import { Controller, useForm } from 'react-hook-form'
import * as Yup from 'yup'
import useDevice from '../hooks/useDevice'
import useMedia from '../hooks/useMedia'
import useAuthStorage from '../hooks/useAuthStorage'
import theme from '../theme'
import { yupResolver } from '@hookform/resolvers/yup'
import { useFocusEffect } from '@react-navigation/native'
import React, { useCallback, useState } from 'react'
import RNDateTimePicker from '@react-native-community/datetimepicker'
import PropTypes from 'prop-types'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const UploadEvent = props => {
  const { user } = useAuthStorage()
  const [ dateTime, setDateTime ] = useState( new Date() )
  const [ mode, setMode ] = useState( 'date' )
  const [ show, setShow ] = useState( true )

  useFocusEffect(
    useCallback( () => {
      return () => resetAll()
    }, [] ),
  )

  const onChange = ( event, selectedDate ) => {
    const currentDate = selectedDate || dateTime
    setShow( Platform.OS === 'ios' )
    setDateTime( currentDate )
    setFormValue( 'date', currentDate, { shouldValidate: false } )
    console.log( 'currentDate', currentDate.toLocaleString() )
  }

  const showMode = ( currentMode ) => {
    setShow( true )
    setMode( currentMode )
  }

  const showDatepicker = () => {
    showMode( 'date' )
  }

  const showTimepicker = () => {
    showMode( 'time' )
  }

  const {
    image,
    setImage,
    imageSelected,
    setImageSelected,
    type,
    setType,
    pickImage,
  } = useDevice()
  const { loadingMediaUpload } = useMedia()

  const EventSchema = Yup.object().shape( {
    location: Yup.string().
      min( 3, 'Too Short, min 3 characters!' ).
      max( 20, 'Too Long, max 20 characters!' ).
      required( 'Event location is required: 3-20 characters' ),
    name: Yup.string().
      min( 3, 'Too Short, min 3 characters!' ).
      max( 15, 'Too Long, max 15 characters!' ).
      required( 'Event name is required: 3-15 characters' ),
    date: Yup.date().
      required( 'Date and time is required' ),
    description: Yup.string().
      min( 5, 'Too Short, min 5 characters!' ).
      max( 250, 'Too Long!' ).
      required( 'Description is required: 5-250 characters' ),
    price: Yup.number().
      required( 'Price is required, type 0 for "Free"' ),
  } )

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
    setValue: setFormValue,
  } = useForm( {
    resolver: yupResolver( EventSchema ), mode: 'onBlur',
  } )

  const mediaDescription = {
    description: getValues().description,
    name: getValues().name,
    location: getValues().location,
    price: getValues().price,
    mediaType: 'event',
    owner: user.username,
    fileType: type,
    date: dateTime,
  }

  const resetAll = () => {
    reset()
    setImage( 'https://place-hold.it/300x200&text=Choose' )
    setImageSelected( false )
    setType( 'image' )
  }

  return (
    <KeyboardAwareScrollView enableAutomaticScroll={ false }
                             enableOnAndroid={ true }
                             viewIsInsideTabBar={ true }>
      {
        // TODO Replace Default image with custom component
      }
      <TouchableOpacity
        onPress={ pickImage }>
        <Image
          source={ { uri: image } }
          style={ theme.addImage }
        />
      </TouchableOpacity>

      <View style={ theme.createMediaForm }>

        <View style={ theme.inputContainer }>
          <Controller
            control={ control }
            render={ ( { field: { onChange, onBlur, value } } ) => (
              <TextInput
                style={ theme.input }
                onBlur={ onBlur }
                onChangeText={ onChange }
                value={ value }
                placeholder='Event location'
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
                style={ theme.input }
                onBlur={ onBlur }
                onChangeText={ onChange }
                value={ value }
                placeholder='Event name'
              />
            ) }
            name='name'
          />
          { errors.name && <Text
            style={ theme.inputErrorText }>{ errors.name.message }</Text> }
        </View>

        <View style={ theme.inputContainer }>
          { errors.date && <Text
            style={ theme.inputErrorText }>{ errors.date.message }</Text> }
          { show &&
          <View style={ { ...theme.inputContainer } }>
            {
              <RNDateTimePicker
                // style={ { ...theme.inputContainer, backgroundColor: '#fff', color: 'red' } }
                testID='dateTimePicker'
                value={ dateTime }
                mode={ mode }
                is24Hour={ true }
                display='default'
                onChange={ onChange }
                themeVariant={ 'dark' }
              />
            }
          </View>
          }

          <View style={ { justifyContent: 'center', flexDirection: 'column' } }>
            <View style={ { alignSelf: 'flex-start' } }><Text
              style={ { color: 'white' } }>{ getValues().date &&
            dateTime.toLocaleString() }</Text></View>
            <View style={ {
              flexDirection: 'column',
              width: 300,
              justifyContent: 'space-between',
              marginTop: 10,
            } }>
              <TouchableOpacity style={[ theme.generalBtn, theme.createMediaButton ]}
                                onPress={ showDatepicker }>
                <Text style={ theme.loginButtonText }>Select Date</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[ theme.generalBtn, theme.createMediaButton ]}
                                onPress={ showTimepicker }>
                <Text style={ theme.loginButtonText }>Select Time</Text>
              </TouchableOpacity>
            </View>
          </View>
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
                placeholder='Event description: Please be descriptive! '
              />
            ) }
            name='description'
          />
          { errors.description &&
          <Text
            style={ theme.inputErrorText }>{ errors.description.message }</Text> }
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
                placeholder='Price ( type 0 for free)'
                keyboardType={'numeric'}
               // defaultValue={'0'}
              />
            ) }
            name='price'
          />
          { errors.price && <Text
            style={ theme.inputErrorText }>{ errors.price.message }</Text> }
        </View>

        <TouchableOpacity
          style={ [ theme.generalBtn, theme.createMediaButton ] }
          disabled={ !imageSelected }
          loading={ loadingMediaUpload }
          title='Create event'
          onPress={ handleSubmit(
            data => props.onSubmit( data, mediaDescription, imageSelected,
              image, type ) ) }
        >
          <Text style={ theme.loginButtonText }>Create Event</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={ [ theme.generalBtn, theme.createMediaButton ] }
          title='Reset form' onPress={ resetAll }>
          <Text style={ theme.loginButtonText }>Reset Form</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  )
}

UploadEvent.propTypes = {
  onSubmit: PropTypes.func,
}

export default UploadEvent