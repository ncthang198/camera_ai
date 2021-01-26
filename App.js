import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import ImagePicker from 'react-native-image-crop-picker';

const App = () => {
  const [image, setImage] = useState("https://reactnative.dev/img/tiny_logo.png");

  const createFormData = (photo, body) => {
    const data = new FormData();

    data.append('photo', {
      name: photo.fileName,
      type: photo.mime,
      uri:
        Platform.OS === 'android' ? photo.path : photo.path.replace('file://', ''),
    });

    Object.keys(body).forEach((key) => {
      data.append(key, body[key]);
    });
    console.log(data)
    return data;
  };

  const handleUploadPhoto = () => {
    fetch('http://172.16.4.127:1999/api/v1/food/single_upload', {
      method: 'POST',
      body: createFormData(image, { name: '123' }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log('upload succes', response);
        alert('Upload success!');
        setImage(null);
      })
      .catch((error) => {
        console.log('upload error', error);
        alert('Upload failed!');
      });
  };
  return (
    <SafeAreaView style={{ alignItems: "center", flex: 1 }}>
      <Text onPress={() => {
        console.log("hello ")
        ImagePicker.openPicker({
          width: 300,
          height: 400,
          cropping: true,
          includeBase64: true
        }).then(image => {
          setImage(image)
          console.log(image.data);
        });
      }}>Pick Image</Text>
      <Text onPress={() => {
        console.log("hello ")
        ImagePicker.openCamera({
          width: 300,
          height: 400,
          cropping: true,
        }).then(image => {
          setImage(image)
          console.log(image);
        });
      }}>Open Camera</Text>
      <Image
        style={{
          width: 300,
          height: 300
        }}
        source={{ uri: image.path }}
      />
      <Text
        onPress={handleUploadPhoto}
      >
        Upload
          </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
