import { View, Image, Text } from "react-native";
import {uploadsUrl} from "../../config";
import theme from "../theme";

import { AntDesign } from '@expo/vector-icons';

const Post = ({postMedia}) => {
    console.log(postMedia);
    let description = postMedia.description;

    return (
        <>
            <View style={{marginLeft: 20}}>
                {
                    // Todo add user avatar here
                }
                <Text style={{ color: 'white'}}>{description.owner}</Text>
            </View>

            <View style={[theme.generalListPost, theme.post]}>
                {
                    // TODO check if post has image, display post without image if not present
                }
                {postMedia.filename &&
                    <Image
                        source={ { uri: uploadsUrl + postMedia.filename } }
                        style={ theme.postImage }
                    />
                }

                <View style={theme.postInfo}>
                    <View style={theme.postText}>
                        <Text>{description.description}</Text>
                    </View>

                    <View style={theme.postExtra}>
                        <Text style={{marginBottom: 10}}>
                            0
                            <AntDesign name="like2" size={24} color="black" />
                        </Text>

                        <Text>
                            0
                            <AntDesign name="message1" size={24} color="black" />
                        </Text>
                    </View>
                </View>
            </View>
        </>
        /* <View style={styles.info}>
            <View style={styles.allText}>
            <View style={styles.rates}>
                <Text>likes: {postMedia.likes}</Text>
                <Text>comments: {postMedia.comments}</Text>
            </View>
            </View>
        </View> */
    )
}

export default Post;