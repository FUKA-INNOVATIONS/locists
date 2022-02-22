import { View, Text } from 'react-native';
import UploadMedia from '../components/UploadMedia';

const CreateEvent = props => {
  return (
      <View>
        <UploadMedia mediaType={'event'} />
      </View>
  );
};

export default CreateEvent;