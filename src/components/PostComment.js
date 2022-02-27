import { Text, Button, Alert, TextInput, View } from 'react-native';
import useAuthStorage from '../hooks/useAuthStorage';
import useComment from '../hooks/useComment';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import theme from '../theme';

const PostComment = ( { file_id, display } ) => {
  const { user } = useAuthStorage();
  const { postComment } = useComment();

  const CommentSchema = Yup.object().shape( {
    content: Yup.string().
        min( 5, 'Too Short!' ).
        max( 50, 'Too Long!' ).
        required( 'Comment is required: 5-50 characters' ),
  } );

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm( {
    resolver: yupResolver( CommentSchema ), mode: 'onBlur',
  } );

  // const content = `Comment for id ${ file_id }`;

  const onSubmit = async ( data ) => {
    const { content } = data;
    const token = user.token;
    const comment = await postComment( token, file_id, content );
     if ( comment.comment_id ) {
     Alert.alert( 'Comment added' );
     reset();
     display( false );
     } else {
     Alert.alert( 'Comment not added' );
     }
     console.log( comment );
  };

  return (
      <>
        <Text>Write a comment</Text>
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
        <View>
          <Button
              // disabled={ !imageSelected }
              // loading={ loadingMediaUpload }
              title="Post comment"
              onPress={ handleSubmit( onSubmit ) }
          />
          <Button title="Clear" onPress={ () => reset() }/>
        </View>
      </>
  );
};

export default PostComment;