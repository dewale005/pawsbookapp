/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {Layout, Button, Icon} from '@ui-kitten/components';
import ImagePicker from 'react-native-image-picker';
import ImagePickerCrop from 'react-native-image-crop-picker';

const TakePicture = ({ photodata }) => {
  const [recording, setRecording] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  let camera;

  const CamraIcon = props => <Icon {...props} name="camera" />;
  const RecordIcon = props => <Icon {...props} name="radio-button-on" />;

  const takePicture = async function() {
    const options = {quality: 2.5, base64: true};
    const data = await camera.takePictureAsync(options);
    ImagePickerCrop.openCropper({
      multiple: true,
      path: data.uri,
      mediaType: 'photo',
      width: 400,
      height: 400,
    }).then(image => {
      photodata(image);
    });
  };

  const record = async function() {
    setRecording(true);
    const options = {quality: 0.5, base64: true};
    const data = await camera.recordAsync(options);
    photodata(data);
  };

  const stoprecord = () => {
    setRecording(false);
    camera.stopRecording();
  };

  const selectImage = () => {
    ImagePickerCrop.openPicker({
      multiple: true,
      cropping: true,
      includeBase64: true,
      width: 600,
      height: 400,
      forceJpg: true,
      compressImageQuality: 0.5,
      cropperStatusBarColor: '#000',
      maxFiles: 20,
      avoidEmptySpaceAroundImage: true,
    }).then(image => {
      photodata(image);
    });
    // let options = {
    //   title: 'Select Image',
    //   quality: 0.5,
    //   customButtons: [
    //     {name: 'customOptionKey', title: 'Choose Photo from Custom Option'},
    //   ],
    //   storageOptions: {
    //     skipBackup: true,
    //     path: 'images',
    //   },
    // };
    // ImagePicker.launchImageLibrary(options, response => {
    //   if (response.didCancel) {
    //     console.log('User cancelled image picker');
    //   } else if (response.error) {
    //     console.log('ImagePicker Error: ', response.error);
    //   } else if (response.customButton) {
    //     console.log('User tapped custom button: ', response.customButton);
    //   } else {
    //     const source = {uri: response.uri};
    //     ImagePickerCrop.openCropper({
    //       path: response.uri,
    //       width: 600,
    //       height: 400,
    //       avoidEmptySpaceAroundImage: true,
    //     }).then(image => {
    //       photodata(image);
    //     });
    //   }
    // });
  };
  return (
    <View style={{flex: 1}}>
      <View style={styles.container}>
        <RNCamera
          ref={ref => (camera = ref)}
          style={styles.preview}
          focusable
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.auto}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
        />
      </View>
      <Layout style={{flex: 0.5}}>
        <View
          style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}>
          {recording ? (
            <Button
              onPress={() => stoprecord()}
              style={styles.capture}
              accessoryLeft={RecordIcon}
            />
          ) : (
            <Button
              onPress={() => takePicture()}
              style={styles.capture}
              accessoryLeft={CamraIcon}
            />
          )}
          <Button appearance="ghost" onPress={() => selectImage()}>
            Select From library
          </Button>
        </View>
      </Layout>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    borderRadius: 60,
    width: 80,
    height: 80,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});

export default TakePicture;
