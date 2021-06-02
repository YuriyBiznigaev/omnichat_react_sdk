/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { Component, ReactNode } from 'react';
import { RNCamera } from 'react-native-camera'
import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker'

import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Alert,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const Section: React.FC<{
  title: string;
}> = ({ children, title }) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

class App extends Component {

  camera: RNCamera | null = null

  backgroundStyle = {
    backgroundColor: Colors.lighter,
  };

  // constructor(props: any) {
  //   super(props)
  //   this.camera;
  // }

  render(): ReactNode {
    return <View style={styles.container}>
        {/* <RNCamera
          type={RNCamera.Constants.Type.back}
          style={{ flex: 1, alignItems: 'center' }}
          ref={ref => {
            this.camera = ref
          }}
        /> */}
        <Button
        title="load"
        onPress={loadFile}
        />
      {/* <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={this.backgroundStyle}>
        <FlatList data={messages()}
          renderItem={({ item }) =>
            <Text style={[
              styles.textStyle,
              {
                textAlign: item.align === "right" ? "right" : "left"
              }]}>{item.key}</Text>} />
      </ScrollView> */}
    </View>
  }
};

const messages = () => {
  return [
    { key: "Hello", aling: 'left' },
    { key: "Nice to meet you", align: 'left' },
    { key: "Me too", align: 'right' },
    { key: "How are you?", align: 'left' }
  ];
}

async function loadFile() {
  try {
    const res = await DocumentPicker.pick({
      type: [DocumentPicker.types.allFiles],
    });
    console.log(
      res.uri,
      res.type, // mime type
      res.name,
      res.size
    );
    uploadImage(res);
  } catch (err) {
    if (DocumentPicker.isCancel(err)) {
      // User cancelled the picker, exit any dialogs or menus and move on
    } else {
      throw err;
    }
  }
}

let uploadImage = async (singleFile: DocumentPickerResponse) => {
  //Check if any file is selected or not
  if (singleFile != null) {
    //If file selected then create FormData
    const fileToUpload = singleFile;
    const data = new FormData();
    data.append('name', fileToUpload.name);
    data.append('file_attachment', fileToUpload);
    let res = await fetch(
      'http://192.168.69.87:8080/upload',
      {
        method: 'post',
        body: data,
        headers: {
          'Content-Type': 'multipart/form-data; ',
        },
      }
    );
    let responseJson = await res.json();
    if (responseJson.status == 1) {
      console.log('Upload Successful');
    }
  } else {
    //if no file selected the show alert
    console.log('Please Select File first');
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  textStyle: {
    padding: 10,
    fontSize: 18,
    height: 44,
    backgroundColor: Colors.white,
  }
});

export default App;
