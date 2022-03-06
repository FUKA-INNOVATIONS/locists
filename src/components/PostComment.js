import { Text, Alert, TextInput, View, TouchableOpacity } from 'react-native'
import useAuthStorage from '../hooks/useAuthStorage'
import useComment from '../hooks/useComment'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import theme from '../theme'
import { useState } from 'react'
import Loading from './Loading'

const PostComment = ( { file_id, display } ) => { // eslint-disable-line
  const { user } = useAuthStorage() // eslint-disable-line
  const { postComment } = useComment()
  const [ loading, setLoading ] = useState(false)

  const CommentSchema = Yup.object().shape( {
    content: Yup.string().
      min( 5, 'Too Short!' ).
      max( 50, 'Too Long!' ).
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

  // const content = `Comment for id ${ file_id }`;

  const onSubmit = async ( data ) => {
    setLoading(true)
    const { content } = data
    const comment = await postComment( file_id, content )
    if ( comment.comment_id ) {
      Alert.alert( 'Comment added' )
      reset()
      display( false )
      setLoading(false)
    } else {
      setLoading(false)
      Alert.alert( 'Comment not added', 'Please login and try again!' )
    }
    console.log( comment )
  }

  if(loading) return <Loading />

  return (
    <>
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
              multiline={true}
            />
          ) }
          name='content'
        />
        { errors.content && <Text>{ errors.content.message }</Text> }
      </View>
      <View style={ theme.addCommentButtons }>
        <TouchableOpacity style={ {...theme.generalBtn, } } title='Clear'
                          onPress={ () => reset() }>
          <Text style={ theme.loginButtonText }>Clear</Text>
        </TouchableOpacity>

        <TouchableOpacity style={ {...theme.generalBtn, width: 200} }
                          onPress={ handleSubmit( onSubmit ) }>
          <Text style={ theme.loginButtonText }>Post</Text>
        </TouchableOpacity>
      </View>
    </>
  )
}

export default PostComment
