import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, ActivityIndicator } from 'react-native';
import { Camera } from 'expo-camera';
import * as Location from 'expo-location';
import * as FileSystem from 'expo-file-system';
import FormData from 'form-data';
import axios from 'axios';

export default function App() {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasLocationPermission, setHasLocationPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [location, setLocation] = useState(null);
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);

  useEffect(() => {
    (async () => {
      const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus === 'granted');

      const { status: locationStatus } = await Location.requestForegroundPermissionsAsync();
      setHasLocationPermission(locationStatus === 'granted');
    })();
  }, []);

  const takePictureAndSend = async () => {
    if (!camera || !hasLocationPermission) {
      console.log('Camera or location permission not granted.');
      return;
    }

    setIsFetchingLocation(true);

    try {
      const currentLocation = await Location.getCurrentPositionAsync({});
      console.log('Location:', currentLocation);

      // Create a FormData object to send the image and location as multipart/form-data
      const photo = await camera.takePictureAsync();
      const formData = new FormData();
      formData.append('image', {
        uri: photo.uri,
        type: 'image/jpeg', // Adjust the type if the image format is different
        name: 'image.jpg',
      });
      formData.append('latitude', currentLocation.coords.latitude.toString());
      formData.append('longitude', currentLocation.coords.longitude.toString());

      // Send the data to the server using Axios (you can use any HTTP client)
    //   const response = await axios.post('http://192.168.43.217:3000/tagged/image', formData, {
    //     headers: {
    //       'Content-Type': 'multipart/form-data',
    //     },
    //   });
    //   console.log('Server response:', response.data);
    // } 
    }
    catch (error) {
      console.error('Error sending data to server:', error);
    } finally {
      setIsFetchingLocation(false);
    }
  };

  return (
    <View style={styles.container}>
      {hasCameraPermission === false || hasLocationPermission === false ? (
        <Text>Please grant camera and location permissions.</Text>
      ) : (
        <View>
          <Camera
            style={styles.camera}
            type={Camera.Constants.Type.back}
            ref={(ref) => setCamera(ref)}
          />

          <Button
            title="Take Picture of Waste"
            onPress={takePictureAndSend}
            disabled={isFetchingLocation} // Disable the button while fetching location
          />

          {isFetchingLocation && (
            <ActivityIndicator size="large" color="blue" />
          )}

        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  camera: {
    width: 300,
    height: 300,
    borderWidth: 2,
    borderColor: 'black',
  },
});
