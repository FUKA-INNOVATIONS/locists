import { Text, Alert, TextInput, View, TouchableOpacity } from 'react-native'
import useAuthStorage from '../hooks/useAuthStorage'
import useComment from '../hooks/useComment'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import theme from '../theme'

const PostComment = ( { file_id, display } ) => { // eslint-disable-line
  const { user } = useAuthStorage() // eslint-disable-line
  const { postComment } = useComment()

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
    const { content } = data
    const comment = await postComment( file_id, content )
    if ( comment.comment_id ) {
      Alert.alert( 'Comment added' )
      reset()
      display( false )
    } else {
      Alert.alert( 'Comment not added' )
    }
    console.log( comment )
  }

  return (
      <>
        <View style={ theme.inputContainer }>
          <Controller
            control={ control }
            render={ ( { field: { onChange, onBlur, value } } ) => (
              <TextInput
                style={ theme.input }
                onBlur={ onBlur }
                onChangeText={ onChange }
                value={ value }
                placeholder="Your comment"
              />
            ) }
            name="content"
          />
          { errors.content && <Text>{ errors.content.message }</Text> }
        </View>
        <View style={ theme.addCommentButtons }>
          <TouchableOpacity style={ theme.generalBtn } onPress={ handleSubmit( onSubmit ) }>
            <Text style={ theme.loginButtonText }>Post</Text>
          </TouchableOpacity>
          <TouchableOpacity style={ theme.generalBtn } title="Clear" onPress={ () => reset() }>
            <Text style={ theme.loginButtonText }>Clear</Text>
          </TouchableOpacity>
        </View>
      </>
  )
}

export default PostComment
