import { View, Text, StyleSheet, ActivityIndicator,Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import MapView, { Marker,Polygon } from 'react-native-maps';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import {isPointWithinRadius} from 'geolib';


export default function KasaKiosk({ navigation }) {
  const apiKey = Constants.expoConfig.extra?.GOOGLE_API_KEY || 'YOUR_GOOGLE_API_KEY';
  const coordinates = [
    { latitude: 13.005633659615148, longitude: 77.62498528463847 },
    { latitude: 13.005581391500494, longitude: 77.62500674231062 },
    { latitude: 13.0049541734278, longitude: 77.62516767485151 },
    { latitude: 13.0028738888018, longitude: 77.62684137327679 },
    { latitude: 13.001734429025369, longitude: 77.62772113783366 },
    { latitude: 13.00074131761328, longitude: 77.62869746191508 },
    { latitude: 13.000166356558143, longitude: 77.62979180319316 },
    { latitude: 12.999967733338625, longitude: 77.63051063520913 },
    { latitude: 13.000082725748255, longitude: 77.63157278997903 },
    { latitude: 13.000417248818751, longitude: 77.63217360479837 },
    { latitude: 13.001629891169156, longitude: 77.63446957571509 },
    { latitude: 13.003407028735106, longitude: 77.63513476355078 },
    { latitude: 13.003699732525064, longitude: 77.6350489328623 },
    { latitude: 13.003961074902872, longitude: 77.63471633894447 },
    { latitude: 13.00427468539284, longitude: 77.6323774526835 },
    { latitude: 13.005612752362495, longitude: 77.6275280187846 },
    { latitude: 13.006020443207769, longitude: 77.62531787855633 },
  ];
  const coordinates1 = [
    { latitude: 12.912208309256885, longitude: 77.56730753718372 },
    { latitude: 12.906741310030165, longitude: 77.57194112179572 },
    { latitude: 12.906406661135565, longitude: 77.57301400534281 },
    { latitude: 12.902809157233659, longitude: 77.57322858205224 },
    { latitude: 12.903394800930329, longitude: 77.56653378871827 },
    { latitude: 12.900843057651432, longitude: 77.56528924380363 },
    { latitude: 12.89942076321432, longitude: 77.57249902124022 },
    { latitude: 12.893857004361045, longitude: 77.56803582568423 },
    { latitude: 12.894526335279846, longitude: 77.56142686303404 },
    { latitude: 12.896701648403075, longitude: 77.561813101111 },
    { latitude: 12.897370971713633, longitude: 77.56052564085446 },
    { latitude: 12.897329139059192, longitude: 77.56065438688012 },
    { latitude: 12.899253433925402, longitude: 77.56108354029895 },
    { latitude: 12.902558166658151, longitude: 77.55679200611053 },
    { latitude: 12.899138032755094, longitude: 77.5558032052389 },
    { latitude: 12.900066850729415, longitude: 77.55467256613885 },
    { latitude: 12.900850105004144, longitude: 77.55434546285869 },
    { latitude: 12.901058048203224, longitude: 77.55332148782468 },
    { latitude: 12.901813573704834, longitude: 77.55344237376619 },
    { latitude: 12.902111624421801, longitude: 77.55246106435857 },
    { latitude: 12.903014754918516, longitude: 77.55304206880754 },
    { latitude: 12.903505042957363, longitude: 77.55330346062263 },
    { latitude: 12.903447260513182, longitude: 77.55412259416094 },
    { latitude: 12.903447260529171, longitude: 77.5545806622855 },
    { latitude: 12.906551735419187, longitude: 77.55624587453651 },
    { latitude: 12.906635781595321, longitude: 77.55695722735872 },
    { latitude: 12.908752684973658, longitude: 77.55860627249938 },
    { latitude: 12.908999568318213, longitude: 77.5600559232566 },
    { latitude: 12.908164366235964, longitude: 77.56117684287429 },
    { latitude: 12.90943030039163, longitude: 77.56428092791056 },
    { latitude: 12.909509092759368, longitude: 77.56676527373408 },
    { latitude: 12.912172260262638, longitude: 77.56728262130773 },
  ];
  const kasaKiosksinCoordinate=[
    {latitude:13.001536658058312, longitude: 77.62900408325152},
    {latitude:13.003444238731822, longitude:77.63046479304137},
    {latitude:13.00486030960874, longitude:77.62700210319441},
    {latitude:13.003869186026328, longitude:77.63455520979196},
    {latitude:13.004601840986322, longitude: 77.62495602409464},
    {latitude:12.9034752419323, longitude:77.56368570500597},
    {latitude:12.9033458953048, longitude:77.56181589022904},
    {latitude:12.902316325307574,longitude: 77.55832296685905},
   
    {latitude:12.907772059663431, longitude:77.56493712508184},
    {latitude:12.912056105642886, longitude:77.56725627736876},
    {latitude:12.905289267317336, longitude:77.57005514451747},
    {latitude:12.906118415446995, longitude:77.57278541198129},
    {latitude:12.895249849083578, longitude:77.56831015059831},
    {latitude:12.901601658023795, longitude:77.5596436119778},
   

  ];
  

 
 
 
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      // Check if location services are enabled
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      // Get the user's current location
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  return (
    <>
     
      {apiKey ? (
             <MapView
             style={styles.map}
             initialRegion={{
               latitude: location ? location.coords.latitude : 13.007223775668438,
               longitude: location ? location.coords.longitude : 77.59194999256152,
               latitudeDelta: 0.01,
               longitudeDelta: 0.01,
             }}
             provider={MapView.PROVIDER_GOOGLE}
             customMapStyle={[]}
             zoomEnabled={true}
             scrollEnabled={true}
           >
             <Marker
               coordinate={{
                 latitude: location ? location.coords.latitude : 13.007223775668438,
                 longitude: location ? location.coords.longitude : 77.59194999256152,
               }}
               title="Your Location"
               description="You"
             />
             <Polygon
               coordinates={coordinates}
               strokeColor="#F00"
               fillColor="rgba(255,0,0,0.5)"
             />
             <Polygon
               coordinates={coordinates1}
               strokeColor="#F00"
               fillColor="rgba(255,0,0,0.5)"
             />
             {kasaKiosksinCoordinate.map((kiosk, index) => {
               // Check if the device is within the threshold distance of the kiosk
               const isClose = isPointWithinRadius(
                 {
                   latitude: location ? location.coords.latitude : 13.007223775668438,
                   longitude: location ? location.coords.longitude : 77.59194999256152,
                 },
                 kiosk,
                 700 // 700 meters threshold
               );
   
               // Display the kiosk as a green marker if it's close to the device
               return (
                 <Marker
                   key={index}
                   coordinate={kiosk}
                   pinColor={isClose ? 'green' : 'red'}
                 />
               );
             })}
           </MapView>
              
          ) : (
            <Text>No API key found.</Text>
          )}
  
          {errorMsg && <Text>{errorMsg}</Text>}
       
          {!location && <ActivityIndicator style={styles.loading} />}
 
 <View styles={styles.scanner}>
 <View style={styles.scanner}>
  <Image
    source={require('../assets/kioskscanner.png')}
    style={{ width: 180, height: 180, alignItems: 'center' }}
  />
</View>

 </View>
    
    </>
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black'
  },
  map: {
    flex: 0.82,
  },
  scanner:{
flex:0.39,
alignItems: 'center',
justifyContent: 'center',
backgroundColor: 'black'
  },
  loading: {
    position: 'absolute',
    top: '50%',
    left: '50%',

  },
});
