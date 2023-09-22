import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet,Alert,Image } from 'react-native';
import { useSelector,useDispatch } from 'react-redux';
import { useStripe } from '@stripe/stripe-react-native';
import { selectPaymentID } from '../slices/navSlice';
import { setPoint,selectPoints } from '../slices/navSlice';

export function Payout() {
  const dispatch = useDispatch();
  const payment_id =useSelector(selectPaymentID) ||'pi_3NqHgDSDelouaTWa1Epb3J4Q';
  const { stripe } = useStripe();
const points = useSelector(selectPoints)
  const handleRefund = async () => {

    if (points >= 1000)
    {
    try {
      if (!payment_id) {
        Alert.alert('Payment ID is missing');
        return;
      }

      const response = await fetch('http://192.168.43.217:3000/payments/refund', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          payment_intent: payment_id,
          amount: 1000, // Amount to refund, in the smallest currency unit 
        }),
      });

      if (response.ok) {
        const data = await response.json();
        // Handle the refund response from your server as needed
        console.log('Refund Response:', data);
Alert.alert('The money will get debited into your account in 2 to 5 business days')
        // You can update your UI or show a confirmation message here
        dispatch(setPoint(100)); 
      } else {
        const errorData = await response.json();
        console.error('Refund Error:', errorData.error);
        // Handle the error response from your server
        Alert.alert('Refund Error', errorData.error);
      }
    } catch (error) {
      console.error('Refund Error:', error);
      // Handle any errors that occur during the refund process
      Alert.alert('Refund Error', 'An error occurred while processing the refund.');
    }
  }
  else
  {
    Alert.alert('You do not have enough points to redeem')
   
  }
  };

  return (
    <View style={styles.container}>
    <Text style={styles.headings}>Payout</Text>
    <View style={styles.pointsContainer}>

      <View style={styles.pointsRow}>
        <Text style={styles.pointsText}>{points}</Text>
        <Image source={require('../assets/points.png')} style={styles.pointsImage} />
      </View>
    </View>
    {points >= 1000 ? (
      <TouchableOpacity style={styles.button} onPress={handleRefund }>
        <Text style={styles.buttonText}>Redeem</Text>
      </TouchableOpacity>
    ) : (
      <Text style={styles.disabledText}>Points insufficient</Text>
    )}
  </View>
  
  
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  headings: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 20,
  },
  pointsContainer: {
    flexDirection: 'row', // Arrange items horizontally
    alignItems: 'center', // Center items both horizontally and vertically
  },
  pointsText: {
    fontSize: 24,
    fontWeight: 'bold', // Make the points bold
    marginHorizontal: 5, // Add some spacing between points and image
  },
  pointsImage: {
    width: 30, // Adjust the width to your preference
    height: 30, // Adjust the height to your preference
  },
  button: {
    backgroundColor: 'lightgreen',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledText: {
    fontSize: 16,
    color: 'red', 
    marginTop: 20,
  },
  pointsRow:
  {
    flexDirection: 'row', // Arrange items horizontally
    alignItems: 'center', // Center items both horizontally and vertically
  }
});
