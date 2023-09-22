import React, { useState, useEffect } from 'react';
import Constants from 'expo-constants';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { useSelector } from 'react-redux';
import {
  CardField,
  useStripe,
  useConfirmPayment,
  
} from '@stripe/stripe-react-native';
import { Card } from 'react-native-paper';
import {  setPaymentID, setPoints } from '../slices/navSlice'
import { selectHome } from '../slices/navSlice';
import { useDispatch } from 'react-redux';
import {selectPoints } from '../slices/navSlice';
import {setStreaks,selectStreaks} from '../slices/navSlice';



export default function ImmediateBooking({ navigation }) {
  const [clientSecret, setClientSecret] = useState('');
  const dispatch = useDispatch();
  const streaks = useSelector(selectStreaks);

  const [isScreenInFocus, setIsScreenInFocus] = useState(true);
  const apiKey = Constants.expoConfig.extra?.GOOGLE_API_KEY || 'YOUR_GOOGLE_API_KEY';
  const [destination, setDestination] = useState({
    latitude: 13.007223775668438,
    longitude: 77.59194999256152,
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [paymentSuccessful, setPaymentSuccessful] = useState(false);
  const [name, setName] = useState('');
  const { presentPaymentSheet, initPaymentSheet } = useStripe();
  const home = useSelector(selectHome);
const points = useSelector(selectPoints);
  const defaultCoordinates = {
    latitude: 13.007223775668438,
    longitude: 77.59194999256152,
  };
  const coordinates = home
    ? { latitude: home.latitude, longitude: home.longitude }
    : defaultCoordinates;

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

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

  useEffect(() => {
    const unsubscribeFocus = navigation.addListener('focus', () => {
      setIsScreenInFocus(true);
    });

    const unsubscribeBlur = navigation.addListener('blur', () => {
      setIsScreenInFocus(false);
      setPaymentSuccessful(false);
    });

    return () => {
      unsubscribeFocus();
      unsubscribeBlur();
    };
  }, [navigation]);

  const handleInstantPickup = async () => {
    try {
      // Make a POST request to your server to initiate the payment and get the PaymentIntent client secret
      const response = await fetch('http://192.168.43.217:3000/payments/intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: 10000,
          automatic: true,
        }),
      });

      if (response.ok) {
        const data = await response.json();
     
        if (data.paymentIntent) {
          // Set the client secret for the PaymentSheet
          const clientSecret = data.paymentIntent;
console.log( data.paymentIntent);
dispatch(setPaymentID({id: data.Paymentid}))
          // Initialize PaymentSheet with the SetupIntent
     const initResponse =      await initPaymentSheet({ merchantDisplayName: 'Waste', paymentIntentClientSecret: clientSecret });
if(initResponse.error) {
  console.log(initResponse.error);
  Alert.alert('Something went wrong');
  return; 
}
          // Present the PaymentSheet
          const { error } = await presentPaymentSheet();

          if (error) {
            console.error('Error:', error);
          } else {
            console.log('Payment successful!');
            setPaymentSuccessful(true);
            dispatch(setPoints(points+20))
            dispatch(setStreaks(streaks))
            
          }
        } 
   
      }
    }
      catch (error) {
        console.error('Error:', error);
      }
    }

    


  let mapRef = null; // Reference to the MapView

  return (
    <View style={styles.container}>
      <View style={styles.topPane}>
        {apiKey ? (
          <MapView
            ref={(ref) => (mapRef = ref)} // Reference to the MapView
            style={styles.map}
            initialRegion={{
              ...coordinates,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            provider={MapView.PROVIDER_GOOGLE}
            customMapStyle={[]}
            zoomEnabled={true}
            scrollEnabled={true}
          >
            <MapViewDirections
              origin={coordinates}
              destination={destination}
              apikey={apiKey}
              strokeWidth={3}
              mode={'WALKING'}
            />
            <Marker coordinate={home} title="Starting Point" />
            <Marker coordinate={destination} title="Destination Point" />
          </MapView>
        ) : (
          <Text>No API KEY FOUND!</Text>
        )}
      </View>
      <View style={styles.bottomPane}>
        <TouchableOpacity
          onPress={handleInstantPickup}
          style={{
            backgroundColor: 'lightgreen',
            padding: 10,
            borderRadius: 5,
            alignItems: 'center',
          }}
        >
          <Text style={{ color: 'black', fontSize: 12 }}>
            {paymentSuccessful ? 'Payment Successful' : 'Get Instant PickUp'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  topPane: {
    flex: 2.5,
  },
  bottomPane: {
    flex: 1.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    flex: 1,
  },
  // Add your modal styles and other styles here if needed.
});
