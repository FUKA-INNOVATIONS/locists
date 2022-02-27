import { Text, Button } from 'react-native';
import useAuthStorage from '../hooks/useAuthStorage';
import useComment from '../hooks/useComment';

const PostComment = ( { onSubmit, file_id } ) => {
  const { user } = useAuthStorage();
  const { postComment } = useComment();

  const content = `Comment for id ${ file_id }`;

  const onSubmitHandler = async () => {
    const token = user.token;
    const comment = await postComment( token, file_id, content );
    console.log( comment );
  };

  return (
      <>
        <Text>Write a comment</Text>
        <Button title={ 'Post comment' } onPress={ onSubmitHandler }/>
      </>
  );
};

export default PostComment;