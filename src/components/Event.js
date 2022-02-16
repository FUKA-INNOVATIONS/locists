import {View, Image, Text, StyleSheet} from "react-native";

const Event = ({eventMedia}) => {

    return (
        <View style={styles.event}>
            <View style={styles.text}>
                <Text>{eventMedia.title}</Text>
                <Text numberOfLines={2}>{eventMedia.description}</Text>

                <View style={styles.attendees}>
                    <Text>likes: {eventMedia.attendees}</Text>
                    <Text>Host:</Text>
                </View>

            </View>


            <Image
                source={{uri:"http://placekitten.com/200/300"}}
                style={{width: 100, height: 100}}
            />
        </View>

    )
}

export default Event;

const styles = StyleSheet.create({
    event: {
        flex: 1,
        flexDirection: "row",
        width: '100%',
        borderWidth: 2,
        borderRadius: 10,
        padding: 10,
        position: "relative",
    },
    text: {
        width: '70%',
    },
    attendees: {
        flexDirection: "row",
        position: "absolute",
        bottom: 0,
    }
});