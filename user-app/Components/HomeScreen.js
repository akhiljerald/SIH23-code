import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text,TouchableOpacity } from 'react-native';
import ImmediateBooking from './ImmediateBooking';
import Constants from 'expo-constants';
import { useDispatch } from 'react-redux';
import MainMap from './MainMap';
import {setHome} from '../slices/navSlice'
import { GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

export default function HomeScreen({ navigation }) {
  const apiKey = Constants.expoConfig.extra?.GOOGLE_API_KEY || 'YOUR_GOOGLE_API_KEY';
const dispatch = useDispatch();
  const targetTime = new Date();
  targetTime.setHours(7, 0, 0, 0);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());
 
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);

      if (now > targetTime) {
        // Reset the timer at 7 AM
        targetTime.setDate(targetTime.getDate() + 1);
      }

      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  function calculateTimeRemaining() {
    const timeDiff = targetTime - currentTime;
    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    return { hours, minutes, seconds };
  }

  return (
    <View style={styles.container}>
      <View style={styles.topPane}>
      <GooglePlacesAutocomplete
        placeholder = 'Enter Home Address'
        styles={{

          container:{ 
              flex:0,
          },
          textInput:{
              fontSize:18,

           } }}
           fetchDetails={true}
           returnKeyType={"search"}
           enablePoweredByContainer={false}
  minLength={2}
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          console.log(data, details);
          dispatch(setHome({
            latitude:details.geometry.location.lat,
            longitude:details.geometry.location.lng,
          }))
      
        }}
        query={{
          key: apiKey,
          language: 'en',
        }}
      />
     {/* Use the MainMap component */}
     <MainMap apiKey={apiKey} />
      </View>
      <View style={styles.bottomPane}>
        {/* Display the remaining time */}
 

        <Text>
          Remaining Time: {timeRemaining.hours}hr {timeRemaining.minutes}min {timeRemaining.seconds}sec
        </Text>
        <TouchableOpacity 
        onPress={
          () => navigation.navigate("ImmediateBooking")
        }
        > 
          <Text> 
            Immediate Garbage Disposal 
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
 
});
