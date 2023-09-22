import React, { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useSelector } from 'react-redux';
import { selectHome } from '../slices/navSlice';

export default function MainMap({ apiKey }) {
  const home = useSelector(selectHome);
  const defaultCoordinates = {
    latitude: 13.007223775668438,
    longitude: 77.59194999256152,
  };
  const coordinates = home ? { latitude: home.latitude, longitude: home.longitude } : defaultCoordinates;

  useEffect(() => {
    // Use animateToRegion to automatically zoom in and center on the coordinates
    if (coordinates && mapRef) {
      mapRef.animateToRegion({
        ...coordinates,
        latitudeDelta: 0.01, // Adjust this value to control the zoom level
        longitudeDelta: 0.01, // Adjust this value to control the zoom level
      });
    }
  }, [coordinates]);

  let mapRef = null; // Reference to the MapView

  return (
    <View style={styles.container}>
      {/* Google Map */}
      {apiKey ? (
        <MapView
          ref={(ref) => (mapRef = ref)} // Reference to the MapView
          style={styles.map}
          initialRegion={{
            ...coordinates,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          // Add your API key here
          provider={MapView.PROVIDER_GOOGLE} // Use Google Maps provider
          customMapStyle={[]} // Add your custom map styles if needed
          zoomEnabled={true} // Enable zoom gestures
          scrollEnabled={true} // Enable map panning
        >
          {/* Add markers or other map components as needed */}
          <Marker
            coordinate={coordinates}
            title="Marker Title"
            description="Marker Description"
          />
        </MapView>
      ) : (
        <Text>No API key found.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  map: {
    flex: 1,
  },
});
