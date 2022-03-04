import {
  Image,
  Text,
  TextInput,
  View,
  ScrollView,
  TouchableOpacity,
  Platform,
  Button,
} from 'react-native'
import { Controller, useForm } from 'react-hook-form'
import * as Yup from 'yup'
import useDevice from '../hooks/useDevice'
import useMedia from '../hooks/useMedia'
import useAuthStorage from '../hooks/useAuthStorage'
import theme from '../theme'
import { yupResolver } from '@hookform/resolvers/yup'
import { useFocusEffect } from '@react-navigation/native'
import { useCallback, useState } from 'react'
import RNDateTimePicker from '@react-native-community/datetimepicker'
import {Touchable} from "react-native-web";


const UploadEvent = props => {
  const { user } = useAuthStorage()
  const [ dateTime, setDateTime ] = useState( new Date() )
  const [ mode, setMode ] = useState( 'date' )
  const [ show, setShow ] = useState( true )
  // const android = Platform.OS === 'android'

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
    console.log( 'currentDate',currentDate.toLocaleString() )
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
    width,
    height,
    imageSelected,
    setImageSelected,
    type,
    setType,
    pickImage,
  } = useDevice()
  const { loadingMediaUpload } = useMedia()

  const EventSchema = Yup.object().shape( {
    location: Yup.string().
      min( 3, 'Too Short!' ).
      max( 20, 'Too Long!' ).
      required( 'Location is required: 3-20 characters' ),
    name: Yup.string().
      min( 5, 'Too Short!' ).
      max( 15, 'Too Long!' ).
      required( 'Name is required: 5-15 characters' ),
    date: Yup.date().
      required( 'Date and time is required' ),
    description: Yup.string().
      min( 25, 'Too Short!' ).
      max( 250, 'Too Long!' ).
      required( 'Description is required: 25-250 characters' ),
    price: Yup.number().
      required( 'Price is required in number format' ),
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
    mediaType: 'event',
    owner: user.username,
    fileType: type,
    location: getValues().location,
    name: getValues().name,
    date: dateTime,
    description: getValues().description,
    price: getValues().price,
    width,
    height
  }

  const resetAll = () => {
    reset()
    setImage( 'https://place-hold.it/300x200&text=Choose' )
    setImageSelected( false )
    setType( 'image' )
  }

  return (
    <>
      <ScrollView>
        {
          // TODO Replace Default image with custom component
        }
        <Image
          source={ { uri: image } }
          style={ theme.addImage }
        />
        <TouchableOpacity
          style={ [ theme.generalBtn, theme.createMediaButton ] }
          onPress={ pickImage }>
          <Text style={ theme.loginButtonText }>Choose Image</Text>
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

            {/* <Controller
             control={ control }
             render={ ( { field: { onChange, onBlur, value } } ) => (
             <TextInput
             style={ theme.input }
             onBlur={ onBlur }
             onChangeText={ onChange }
             value={ value }
             defaultValue={ date }
             placeholder='Date & time'
             disabled={true}
             />
             ) }
             name='date'
             /> */ }
            { errors.date && <Text
              style={ theme.inputErrorText }>{ errors.date.message }</Text> }

            { show &&
            <View style={ theme.inputContainer }>
              {
                <RNDateTimePicker
                  style={ {...theme.inputContainer, width: 150} }
                  testID='dateTimePicker'
                  value={ dateTime }
                  mode={ mode }
                  is24Hour={ true }
                  display='default'
                  onChange={ onChange }
                />
              }
            </View>
            }

            <View style={ { justifyContent: 'center' } }>
              <Text style={ { color: 'white' } }>{getValues().date && dateTime.toLocaleString()}</Text>
              <TouchableOpacity style={ theme.generalBtn } onPress={ showDatepicker }>
                <Text style={ theme.loginButtonText }>Select Date</Text>
              </TouchableOpacity>
              <TouchableOpacity style={ theme.generalBtn } onPress={ showTimepicker }>
                <Text style={ theme.loginButtonText }>Select Time</Text>
              </TouchableOpacity>
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
                  placeholder='Event description'
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
                  placeholder='Price'
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
      </ScrollView>
    </>
  )
}

export default UploadEvent