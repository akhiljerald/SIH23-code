import React, { useState } from 'react';
import { store } from './store';
import { Provider } from 'react-redux';
import { StyleSheet, Image, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { StripeProvider } from '@stripe/stripe-react-native';
import HomeScreen from './Components/HomeScreen';
import DigiWallet from './Components/DigiWallet';
import ImmediateBooking from './Components/ImmediateBooking';
import CustomerCare from './Components/CustomerCare';
import SignUpScreen from './Components/SignUpScreen';
import StudentLogin from './Components/StudentLogin';
import WasteImage from './Components/WasteImages'
import KasaKiosk from './Components/KasaKiosk';
import {CommunityEngage} from './Components/CommunityEngage'
import {Payout} from './Components/Payout';
import {Camera} from './Components/WasteImages';
import {Vouchers} from './Components/Vouchers';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export default function App() {


  return (
    <Provider store={store}>
          <StripeProvider publishableKey='YOUR-STRIPE-API'>
    

      <NavigationContainer>
      
          <Drawer.Navigator initialRouteName="SignUp">
            <Drawer.Screen
       
              name="SignUp"
              component={SignUpScreen}
              options={{
                drawerIcon: ({ color, focused }) => (
                  <Image
                    source={require('./assets/ICONS.png')}
                    style={{ width: 20, height: 20 }}
                  />
                ),
              }}
            
            />
            <Drawer.Screen
              name="HomeScreen"
              component={HomeScreen}
              options={{
                drawerIcon: ({ color, focused }) => (
                  <Image
                    source={require('./assets/ICONS.png')}
                    style={{ width: 20, height: 20 }}
                  />
                ),
              }}
            />
            <Drawer.Screen
              name="DigiWallet"
              component={DigiWallet}
              options={{
                drawerIcon: ({ color, focused }) => (
                  <Image
                    source={require('./assets/ICONS.png')}
                    style={{ width: 20, height: 20 }}
                  />
                ),
              }}
            />
            <Drawer.Screen
              name="ImmediateBooking"
              component={ImmediateBooking}
              options={{
                drawerIcon: ({ color, focused }) => (
                  <Image
                    source={require('./assets/ICONS.png')}
                    style={{ width: 20, height: 20 }}
                  />
                ),
              }}
            />
            <Drawer.Screen
              name="CustomerCare"
              component={CustomerCare}
              options={{
                drawerIcon: ({ color, focused }) => (
                  <Image
                    source={require('./assets/ICONS.png')}
                    style={{ width: 20, height: 20 }}
                  />
                ),
              }}
            />
               <Drawer.Screen
       
       name="Student"
       component={StudentLogin}
       options={{
         drawerIcon: ({ color, focused }) => (
           <Image
             source={require('./assets/ICONS.png')}
             style={{ width: 20, height: 20 }}
           />
         ),
       }}
     
     />
     <Drawer.Screen 
     name="Kiosk"
     component={KasaKiosk}
     options={{
        drawerIcon: ({ color, focused }) => (
          <Image
            source={require('./assets/ICONS.png')}
            style={{ width: 20, height: 20 }}
          />
        ),
     }}
      />
       <Drawer.Screen 
     name="Community"
     component={CommunityEngage}
     options={{
        drawerIcon: ({ color, focused }) => (
          <Image
            source={require('./assets/ICONS.png')}
            style={{ width: 20, height: 20 }}
          />
        ),
     }}
      />
       <Drawer.Screen 
     name="Vouchers"
     component={Vouchers}
     options={{
        drawerIcon: ({ color, focused }) => (
          <Image
            source={require('./assets/ICONS.png')}
            style={{ width: 20, height: 20 }}
          />
        ),
     }}
      />
       <Drawer.Screen 
     name="Payout"
     component={Payout}
     options={{
        drawerIcon: ({ color, focused }) => (
          <Image
            source={require('./assets/ICONS.png')}
            style={{ width: 20, height: 20 }}
          />
        ),
     }}
      />
      <Drawer.Screen 
      name="ImageWaster"
      component = {WasteImage}
      options={{
        drawerIcon: ({ color, focused }) => (
          <Image
            source={require('./assets/ICONS.png')}
            style={{ width: 20, height: 20 }}
          />
        ),
      }}
      />
     
          </Drawer.Navigator>
     
      </NavigationContainer>
   </StripeProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
