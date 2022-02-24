import { StyleSheet, View, Image, Text } from "react-native";
import {uploadsUrl} from "../../config";
import theme from "../theme";

import { AntDesign } from '@expo/vector-icons';

const Post = ({postMedia}) => {

    let description = postMedia.description;
    description = JSON.parse(description);
    console.log('xxxxxxxxxxxx', description);

    return (
        <>
            <View style={{marginLeft: 20}}>
                {
                    // Todo add user avatar here
                }
                <Text>{description.owner}</Text>
            </View>

            <View style={theme.post}>
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
                        <Text>
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
        /*<View style={styles.info}>
            <View style={styles.allText}>
            <View style={styles.rates}>
                <Text>likes: {postMedia.likes}</Text>
                <Text>comments: {postMedia.comments}</Text>
            </View>
            </View>
        </View>*/
    )
}

export default Post;

const styles = StyleSheet.create({
    info: {
        flex: 1,
        flexDirection: "column",
        width: '100%',
        borderWidth: 2,
        borderRadius: 10,
        padding: 10,
    },
    allText: {
        flex: 1,
        flexDirection: "row",
    },
    text: {
        width: '70%'
    },
    rates: {
    }
});