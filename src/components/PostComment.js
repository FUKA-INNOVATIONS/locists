import {
  Text,
  Alert,
  TextInput,
  View,
  TouchableOpacity,
  KeyboardAvoidingViewComponent,
} from 'react-native'
import useComment from '../hooks/useComment'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import theme from '../theme'
import React, { useState } from 'react'
import Loading from './Loading'
import PropTypes from 'prop-types'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Button from '../components/Button'

const PostComment = ( {
  file_id, // eslint-disable-line
  display,
  updateComments,
} ) => { // eslint-disable-line
  // const { user } = useAuthStorage()
  const { postComment } = useComment()
  const [ loading, setLoading ] = useState( false )

  const CommentSchema = Yup.object().shape( {
    content: Yup.string().
      min( 5, 'Too Short comment!' ).
      max( 50, 'Too Long comment!' ).
      required( 'Comment is required: 5-50 characters' ),
  } )

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm( {
    resolver: yupResolver( CommentSchema ), mode: 'onBlur',
  } )

  const onSubmit = async ( data ) => {
    setLoading( true )
    const { content } = data
    const comment = await postComment( file_id, content )
    if ( comment.comment_id ) {
      reset()
      display( false )
      setLoading( false )
      updateComments()
    } else {
      setLoading( false )
      Alert.alert( 'Comment not added', 'Please login and try again!' )
    }
    console.log( comment )
  }

  if ( loading ) return <Loading />

  return (
    <KeyboardAwareScrollView>
      <View style={{flex: 1}}>
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
        { errors.content && <Text style={ { color: 'white', textAlign: 'center', } }>{ errors.content.message }</Text> }
      </View>

      <View style={ { flexDirection: 'row' } }>
        <Button title={ 'Post comment' } style={ { width: 50 } }
                onPress={ handleSubmit( onSubmit ) } />
        <Button title={ 'Clear' } style={ { width: 80 } }
                onPress={ reset } />
      </View>

    </KeyboardAwareScrollView>
  )
}

PostComment.propTypes = {
  file_id: PropTypes.number,
  display: PropTypes.func,
  updateComments: PropTypes.func,
}

export default PostComment
