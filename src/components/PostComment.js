import { Text, Alert, TextInput, View, TouchableOpacity } from 'react-native'
import useComment from '../hooks/useComment'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import theme from '../theme'
import React, { useState } from 'react'
import Loading from './Loading'
import PropTypes from 'prop-types'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const PostComment = ( { // Post new comment on single event/post screen
  file_id, // eslint-disable-line
  display,
  updateComments,
  displayHeader,
} ) => {
  const { postComment } = useComment()
  const [ loading, setLoading ] = useState( false )

  const CommentSchema = Yup.object().shape( {
    content: Yup.string().
      min( 3, 'Too Short comment, min 3 characters!' ).
      max( 50, 'Too Long comment, max 50 characters!' ).
      required( 'Comment is required: 3-50 characters' ),
  } )

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm( {
    resolver: yupResolver( CommentSchema ), mode: 'onBlur',
  } )

  const onSubmit = async ( data ) => { // Handle create comment button press
    setLoading( true )
    const { content } = data
    const comment = await postComment( file_id, content ) // Try to create new comment
    if ( comment.comment_id ) { // Comment creation succeeded
      reset()
      display( false )  // Hide comment view
      setLoading( false )
      updateComments()  // Re-render comments List to keep it up to date
    } else {  // Comment creation failed
      setLoading( false )
      Alert.alert( 'Comment not added', 'Please login and try again!' )
    }
    displayHeader()
    console.log( comment )
  }

  if ( loading ) return <Loading />

  return (
    <KeyboardAwareScrollView enableAutomaticScroll={ true }
                             enableOnAndroid={ true }
                             viewIsInsideTabBar={ true }>
      <View style={ theme.commentContainer }>
        <Controller
          control={ control }
          render={ ( { field: { onChange, onBlur, value } } ) => (
            <TextInput
              style={ theme.commentInput }
              onBlur={ onBlur }
              onChangeText={ onChange }
              value={ value }
              placeholder='Your comment'
              multiline={ true }
              maxLength={ 50 }
            />
          ) }
          name='content'
        />
        { errors.content && <Text style={ {
          color: 'white',
          textAlign: 'center',
        } }>{ errors.content.message }</Text> }
      </View>
      <View style={ theme.addCommentButtons }>
        <TouchableOpacity style={ { ...theme.generalBtn } } title='Clear'
                          onPress={ () => reset() }>
          <Text style={ theme.loginButtonText }>Clear</Text>
        </TouchableOpacity>

        <TouchableOpacity style={ { ...theme.generalBtn, width: 200 } }
                          onPress={ handleSubmit( onSubmit ) }>
          <Text style={ theme.loginButtonText }>Post</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  )
}

PostComment.propTypes = {
  file_id: PropTypes.number,
  display: PropTypes.func,
  updateComments: PropTypes.func,
  displayHeader: PropTypes.func,
}

export default PostComment