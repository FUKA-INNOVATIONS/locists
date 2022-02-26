import { View, Text, Button, Image } from 'react-native';
import Post from '../components/Post';
import useMedia from '../hooks/useMedia';
import { useEffect } from 'react';
import {uploadsUrl} from "../../config";
import theme from "../theme";

const SinglePost = ( { navigation, route } ) => {
    const { postId } = route.params;
    const { getMediaById, singleMedia, loadingSingleMedia } = useMedia();

    if (singleMedia) {
        let description = singleMedia.description;
        description = JSON.parse(description);
    }


    useEffect(async () => {
        await getMediaById(postId);
    }, [postId]);

    if(loadingSingleMedia) return <View><Text>Loading..</Text></View>

    const onModalCloseHandler = () => {
        navigation.goBack();
    }
    console.log('singlePost', singleMedia);
    return (
        <>
            {singleMedia !== undefined &&
            <View>
                <Text>{description.owner}</Text>
                <Image
                    source={ { uri: uploadsUrl + singleMedia.filename } }
                    style={ theme.postImage }
                />
                <Text>{description.description}</Text>
            </View>
            }
            <Button title={'Go back'} onPress={onModalCloseHandler} />

        </>
    );
};

export default SinglePost;