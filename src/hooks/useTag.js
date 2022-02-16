import axios from "axios";
import {baseUrl} from "../../config";

const useTag = () => {
    const postTag = async (tagData, token) => {
        const URL = `${ baseUrl }tags`;
        const options = {
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token,
            },
            body: JSON.stringify( tagData ),
        };

        try {
            const tag = await axios.post( URL, {} ,options);
            // return tag.data;
        } catch ( error ) {
            console.log( 'post tag error', error);
            return error;
        }
    };

    const getFilesByAppId = async (tag) => {
        const URL = `${ baseUrl }tags/${tag}`
        try {
            const response = await axios.get( URL, tag );
            return response.data;
        } catch (error) {
            console.log('getFilesByTag error', error);
        }
    };

    return { postTag, getFilesByAppId };
};

export default useTag();