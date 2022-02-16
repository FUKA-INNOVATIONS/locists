import { useState } from "react";
import { Button, Image, Text, TextInput, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import theme from "../theme";

export const AddPost = () => {
  const [post, setPost] = useState({});

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setPost({ ...post, image: result.uri });
      console.log("Post", post);
    }
  };

  const handleTitleChange = (text) => {
    setPost({ ...post, title: text });
  };

  const handleContentChange = (text) => {
    setPost({ ...post, content: text });
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button title="Pick Image" onPress={pickImage} />
      {/* <Button title="Use Camera" onPress={useCamera} /> */}
      {post.image && (
        <Image
          source={{ uri: post.image }}
          style={{ width: 200, height: 200 }}
        />
      )}
      <Text>Title of Post:</Text>
      <TextInput
        onChangeText={handleTitleChange}
        style={theme.input}
      ></TextInput>
      <Text>Content:</Text>
      <TextInput
        onChangeText={handleContentChange}
        style={theme.input}
      ></TextInput>
      <Button
        title="Add Post"
        onPress={() => console.log("Button Clicked", post)}
      />
    </View>
  );
};
