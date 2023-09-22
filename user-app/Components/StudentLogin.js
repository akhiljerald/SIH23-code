import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  ScrollView, 
  StyleSheet,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
  Linking
} from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { database } from '../assets/firebase';
import { setStuLog,selectStuLog,selectChallenge,selectPoints,selectStreaks } from '../slices/navSlice';
import { useDispatch,useSelector } from 'react-redux';
import { setPoints,setStreaks,setChallenge } from '../slices/navSlice'
export default function StudentLogin({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const challenge = useSelector(selectChallenge)
  const [usn, setUsn] = useState('');
  const [submittedForm, setSubmittedForm] = useState(false);
  const [mobile, setMobile] = useState('');
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const stuLog = useSelector(selectStuLog);
  const [validationErrors, setValidationErrors] = useState({});
  const [data, setData] = useState([
    {
      task: 'Neighborhood Cleanup',
      description: 'Organize a cleanup event in your neighborhood and collect waste from the streets and public areas.',
      pointscore: 100,
    },
    {
      task: 'Kiosk Recycling',
      description: 'Collect recyclables from your community and drop them off at the nearest kiosk.',
      pointscore: 25,
    },
    {
      task: 'Recycling Education',
      description: 'Educate your neighbors about the importance of recycling and how to use the local kiosks effectively.',
      pointscore: 20,
    },
    {
      task: 'Kiosk Ambassador',
      description: 'Volunteer to be a kiosk ambassador and help others in your community learn how to use kiosks.',
      pointscore: 25,
    },
    {
      task: 'Waste Collection Drive',
      description: 'Organize a waste collection drive and encourage your neighbors to donate recyclables to support a local cause.',
      pointscore: 35,
    },
    {
      task: 'Awareness Campaign',
      description: 'Launch an awareness campaign about waste reduction, recycling, and the importance of clean neighborhoods.',
      pointscore: 30,
    },
    {
      task: 'Kiosk Explorer',
      description: 'Visit different kiosks in your area, learn about their recycling facilities, and share your findings online.',
      pointscore: 15,
    },
    {
      task: 'Kiosk Innovation',
      description: 'Propose innovative ideas to improve the functionality and efficiency of local kiosks.',
      pointscore: 20,
    },
    {
      task: 'Recycling Challenge',
      description: 'Challenge your friends and neighbors to a recycling competition and see who can collect the most recyclables.',
      pointscore: 25,
    },
    {
      task: 'Kiosk Art Project',
      description: 'Create an art project using recycled materials from local kiosks and display it in your community.',
      pointscore: 30,
    },
    {
      task: 'Eco-Friendly Gardening',
      description: 'Start a community garden using compost from recycled waste and maintain it sustainably.',
      pointscore: 35,
    },
    {
      task: 'Trash-to-Treasure Workshop',
      description: 'Host workshops on upcycling and turning waste materials into useful items.',
      pointscore: 25,
    },
    {
      task: 'Zero-Waste Picnic',
      description: 'Organize a zero-waste picnic event and encourage participants to minimize waste generation.',
      pointscore: 20,
    },
    {
      task: 'Green Street Art',
      description: 'Create eco-friendly street art using recycled materials to beautify your neighborhood.',
      pointscore: 30,
    },
    {
      task: 'Waste Reduction Challenge',
      description: 'Challenge your community to reduce waste generation and track their progress.',
      pointscore: 25,
    },
    {
      task: 'Recycling Workshops',
      description: 'Conduct educational workshops on recycling and waste management for local schools or groups.',
      pointscore: 30,
    },
    {
      task: 'Eco-Friendly Competitions',
      description: 'Organize eco-friendly competitions like "Best Eco-Balcony" or "Most Sustainable Home."',
      pointscore: 40,
    },
  
  ]);
  const [disabledItems, setDisabledItems] = useState([]);
  // You can use this updated data in your component
  const points = useSelector(selectPoints);
const streaks = useSelector(selectStreaks);

  useEffect(() => {
    // Fetch user data from Firestore and update the state
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(database, 'Users'));
      const userData = [];
      querySnapshot.forEach((doc) => {
        userData.push(doc.data());
      });
      setUsers(userData);
    };

    fetchData();
  }, []);

  const isEmailValid = () => {
    // Use a regex to check if the email ends with .edu.in or .edu
    const emailRegex = /^[a-zA-Z0-9._-]+@([a-zA-Z0-9.-]+\.)+[a-zA-Z]{2,4}$/;
    return emailRegex.test(email.toLowerCase()) && (email.toLowerCase().endsWith('.edu.in') || email.toLowerCase().endsWith('.edu'));
  };
  
  const validateForm = () => {
    const errors = {};
    if (!name) {
      errors.name = 'Name is required';
    }
    if (!email) {
      errors.email = 'Email is required';
    } else if (!isEmailValid()) {
      errors.email = 'Please enter a valid .edu email address';
    }
    if (!usn) {
      errors.usn = 'USN is required';
    }
    if (!mobile) {
      errors.mobile = 'Mobile is required';
    }

    setValidationErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        // Store user data in Firestore
        const newUserData = {
          Name: name,
          Email: email,
          USN: usn,
          Mobile: mobile,
        };

        await addDoc(collection(database, 'Users'), newUserData);

        // Clear form inputs and show the submitted form
        setName('');
        setEmail('');
        setUsn('');
        setMobile('');
        setSubmittedForm(true);
        dispatch(setStuLog(true));
      } catch (error) {
        console.error('Error storing user data:', error);
      }
    }
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        {stuLog ? (
       
      
       <View style={styles.cardContainer}>
        <Text style={{fontSize:20,fontWeight:'bold',marginBottom:5}}>  {challenge} Day Challenge </Text>
         <FlatList
           data={data}

           keyExtractor={(task) => task.task}
           renderItem={({ item }) => (
            <TouchableWithoutFeedback onPress={()=>{
              if (!disabledItems.includes(item.task) && challenge > 0) {
                // Check if the item is not already disabled}
                dispatch(setPoints(points + item.pointscore))
                dispatch(setStreaks(streaks + 1))
                dispatch(setChallenge(challenge - 1))
                Linking.openURL('https://www.instagram.com')
                setDisabledItems([...disabledItems, item.task]);
              
              }
            }}>
          <Card style={[styles.card, { backgroundColor: disabledItems.includes(item.task) ? 'green' : 'white' }]}>
               <Card.Content>
                 <Title style={{fontWeight:'bold'}}>{item.task}</Title>
                 <Paragraph>{item.description}</Paragraph>
                 <View style={{  flexDirection: 'row',
    alignItems: 'center'}}>
                 <Paragraph style={{ fontWeight: 'bold' }}>{item.pointscore}</Paragraph>
  <Image
    source={require('../assets/points.png')}
    style={{ width: 20, height: 20, marginLeft: 5 }} 
  />
  </View>
               </Card.Content>
             </Card>
             </TouchableWithoutFeedback>
           )}
         />
       </View>

     
        ) : (
          <View style={styles.formContainer}>
            {/* Wrap the form inputs in a Card */}
            <Card style={styles.formCard}>
              <TextInput
                label="Name"
                value={name}
                placeholder="Enter Your Name"
                onChangeText={setName}
                error={!!validationErrors.name}
                style={styles.input}
              />
              {validationErrors.name && (
                <Text style={styles.errorText}>{validationErrors.name}</Text>
              )}

              <TextInput
                label="Student Email"
                value={email}
                onChangeText={setEmail}
                placeholder="Enter Your Email"
                error={!!validationErrors.email}
                style={styles.input}
              />
              {validationErrors.email && (
                <Text style={styles.errorText}>{validationErrors.email}</Text>
              )}

              <TextInput
                label="College USN"
                value={usn}
                onChangeText={setUsn}
                error={!!validationErrors.usn}
                placeholder="Enter Your Usn"
                style={styles.input}
              />
              {validationErrors.usn && (
                <Text style={styles.errorText}>{validationErrors.usn}</Text>
              )}

              <TextInput
                label="Mobile"
                value={mobile}
                onChangeText={setMobile}
                placeholder="Enter Your Mobile Number"
                error={!!validationErrors.mobile}
                style={styles.input}
              />
              {validationErrors.mobile && (
                <Text style={styles.errorText}>{validationErrors.mobile}</Text>
              )}
            </Card>

            <Button title="Submit" onPress={handleSubmit} style={styles.button} />
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },

  cardContainer: {

    alignItems: 'center',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    marginBottom: 8,
  },
  errorText: {
    color: 'red',
  },
  button: {
    marginTop: 16,
  },
  card: {
    marginBottom: 12,
    width: '100%', // Adjust the width as needed
  },
});