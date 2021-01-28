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

  const createFormData = (photo) => {
    const data = new FormData();
    console.log(photo, "path image")
    // data.append('file', photo);
    data.append('file', {
      name: photo.path,
      type: photo.mime,
      uri:
        Platform.OS === 'android' ? photo.path : photo.path.replace('file://', ''),
    });

    console.log(data)
    return data;
  };

  const handleUploadPhoto = async () => {
    let data = createFormData(image)
    try {
      let res = await fetch('https://vnpost.vnit.top/api/api/FileData/InsertFile', {
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'multipart/form-data; '
        },
      });
      let responseJson = await res.json();
      console.log(responseJson, "response")
      alert(responseJson)
    } catch (error) {
      console.log(error, "Loi gi day")
    }
  };
  return (
    <SafeAreaView style={{ alignItems: "center", flex: 1 }}>
      <View style={{ height: 45, backgroundColor: "orange", width: "100%", justifyContent: "space-between", flexDirection: "row" }}>
        <View style={{ justifyContent: "center", alignItems: "center", width: 80 }}></View>
        <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}><Text style={{ fontSize: 18, fontWeight: "bold", color: "white" }}>CAMERA AI</Text></View>
        <View style={{ justifyContent: "center", alignItems: "center", width: 80 }}><Text onPress={handleUploadPhoto} style={{ fontSize: 16, fontWeight: "bold", color: "white" }}>Upload</Text></View>
      </View>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>

        <Image
          style={{
            width: 300,
            height: 300
          }}
          source={{ uri: image ? image.path : "https://reactnative.dev/img/tiny_logo.png" }}
        />
      </View>
      <View style={{ height: 80, width: "100%", justifyContent: "space-between", flexDirection: "row" }}>
        <Text
          style={{ fontSize: 18, fontWeight: "bold", color: "black", margin: 15 }}
          onPress={() => {
            ImagePicker.openPicker({
              cropping: true,
            }).then(image => {
              setImage(image)
              console.log(image);
            });
          }}>Pick Image</Text>
        <Text
          style={{ fontSize: 18, fontWeight: "bold", color: "black", margin: 15 }}
          onPress={() => {
            ImagePicker.openCamera({
              cropping: true,
            }).then(image => {
              setImage(image)
              console.log(image);
            });
          }}>Open Camera</Text>
      </View>

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
