import { View, Text, Button } from 'react-native';
import Post from '../components/Post';
import useMedia from '../hooks/useMedia';
import { useEffect } from 'react';

const SinglePost = ( { navigation, route } ) => {
    const { postId } = route.params;
    const { getMediaById, singleMedia, loadingSingleMedia } = useMedia();

    useEffect(async () => {
        await getMediaById(postId);
    }, [postId]);

    if(loadingSingleMedia) return <View><Text>Loading..</Text></View>

    const onModalCloseHandler = () => {
        navigation.goBack();
    }

    return (
        <>
            <Button title={'Go back'} onPress={onModalCloseHandler} />
            { singleMedia !== undefined && <Post postMedia={ singleMedia }/> }
        </>
    );
};

export default SinglePost;