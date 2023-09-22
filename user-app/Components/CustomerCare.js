import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { collection, query, orderBy, addDoc, onSnapshot } from 'firebase/firestore';
import { database } from '../assets/firebase';

export default function CustomerCare() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  // Function to send a new message to Firebase
  const sendMessage = async () => {
    if (message.trim() === '') return;

    const newMessage = {
      text: message,
      timestamp: Date.now(),
    };

    try {
      await addDoc(collection(database, 'messages'), newMessage);
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  useEffect(() => {
    // Function to listen for new messages from Firebase
    const listenForMessages = () => {
      const q = query(collection(database, 'messages'), orderBy('timestamp'));

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const messageData = [];
        snapshot.forEach((doc) => {
          const message = doc.data();
          messageData.push(message);
        });
        setMessages(messageData);
      });

      return () => unsubscribe();
    };

    listenForMessages();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.messageContainer}>
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message"
          value={message}
          onChangeText={(text) => setMessage(text)}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  messageContainer: {
    backgroundColor: '#007AFF', // Change to your chat bubble background color
    borderRadius: 8, // Change to your chat bubble border radius
    padding: 8,
    marginBottom: 8,
    alignSelf: 'flex-end', // Align messages to the right
  },
  messageText: {
    fontSize: 16, // Change to your desired font size
    color: 'white', // Change to your desired text color
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#CCCCCC',
    paddingTop: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    padding: 8,
  },
  sendButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginLeft: 8,
  },
  sendButtonText: {
    color: 'white',
    fontSize: 16,
  },
});
