import { FlatList } from "react-native";
import Post from "./Post";
import Event from "./Event";


const HomeList = () => {

    const dummyData = [
        {
            typePost: true,
            photo: true,
            title: 'test',
            description: "this is a test of how the card will look",
            likes: 50,
            comments: 4,
            id: 1,
        },
        {
            typePost: true,
            photo: false,
            title: 'test',
            description: "this is a test of how the card will look",
            likes: 33,
            comments: 7,
            id: 2,
        },
        {
            typePost: false,
            photo: false,
            title: 'event',
            description: 'testing events in home page',
            attendees: 5,
            id: 3,
        },
        {
            typePost: false,
            photo: true,
            title: 'event',
            description: 'testing events in home page',
            attendees: 5,
            id: 4,
        },{
            typePost: true,
            photo: true,
            title: 'test',
            description: "this is a test of how the card will look",
            likes: 50,
            comments: 4,
            id: 5,
        },
        {
            typePost: true,
            photo: false,
            title: 'test',
            description: "this is a test of how the card will look",
            likes: 33,
            comments: 7,
            id: 6,
        },
    ]
    return (
        <FlatList
            data={dummyData}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => {
                return (
                    item.typePost ?
                        <Post
                        postMedia={item}/>
                        :
                        <Event
                        eventMedia={item}/>
                )}
            }
        />
    )
}

export default HomeList;