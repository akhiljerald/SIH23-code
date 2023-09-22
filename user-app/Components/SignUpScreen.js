import React, { Component } from "react";
import { StatusBar } from "react-native";

import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  Button,
  Alert,
} from "react-native";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  PhoneAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import {
  FirebaseRecaptchaVerifierModal,
  FirebaseRecaptchaBanner,
} from "expo-firebase-recaptcha";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCl_FftsCJCyANJw99vC9pc_INwCSprYJQ",

  authDomain: "sih2023-d8fc1.firebaseapp.com",

  projectId: "sih2023-d8fc1",

  storageBucket: "sih2023-d8fc1.appspot.com",

  messagingSenderId: "294629054772",

  appId: "1:294629054772:web:9e5ece1d2d7a800a4a6d61",

  measurementId: "G-K55X8WQFQ5"
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

class SignUpScreen extends Component {
  componentDidMount() {
    StatusBar.setHidden(true);
  }

  componentWillUnmount() {
    StatusBar.setHidden(true);
  }

  constructor(props) {
    super(props);

    this.recaptchaVerifier = React.createRef();
    this.state = {
      phoneNumber: "",
      verificationId: "",
      verificationCode: "",
      info: "",
      attemptInvisibleVerification: false,
    };
  }

  handleSendVerificationCode = async () => {
    const { phoneNumber } = this.state;

    try {
      const phoneProvider = new PhoneAuthProvider(auth);
      const verificationId = await phoneProvider.verifyPhoneNumber(
        phoneNumber,
        this.recaptchaVerifier.current
      );
      this.setState({
        verificationId,
        info: "Success: Verification code has been sent to your phone",
      });
    } catch (error) {
      this.setState({
        info: `Error: ${error.message}`,
      });
      Alert.alert("Error", `Failed to send verification code. ${error.message}`);
    }
  };

  handleVerifyVerificationCode = async () => {
    const { verificationId, verificationCode } = this.state;

    try {
      const credential = PhoneAuthProvider.credential(
        verificationId,
        verificationCode
      );
      await signInWithCredential(auth, credential);
      this.setState({
        info: "Success: Phone authentication successful",
      });
      this.props.navigation.navigate("HomeScreen");
    } catch (error) {
      this.setState({
        info: `Error: ${error.message}`,
      });
      Alert.alert("Error", `Verification failed. ${error.message}`);
    }
  };

  dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  render() {
    const { info, phoneNumber, verificationId, verificationCode } = this.state;

    return (
      <>
        <StatusBar translucent={true} backgroundColor="transparent" />
        <TouchableWithoutFeedback onPress={this.dismissKeyboard}>
          <View style={styles.container}>
            <FirebaseRecaptchaVerifierModal
              ref={this.recaptchaVerifier}
              app={app}
            />

            {info && <Text style={styles.text}>{info}</Text>}

            {!verificationId && (
              <View>
                <Text style={styles.text}>Enter the phone number</Text>
                <TextInput
                  placeholder="+2547000000"
                  autoFocus
                  autoCompleteType="tel"
                  keyboardType="phone-pad"
                  textContentType="telephoneNumber"
                  onChangeText={(phoneNumber) =>
                    this.setState({ phoneNumber })
                  }
                />
                <Button
                  onPress={this.handleSendVerificationCode}
                  title="Send Verification Code"
                  disabled={!phoneNumber}
                />
              </View>
            )}

            {verificationId && (
              <View>
                <Text style={styles.text}>Enter the verification code</Text>
                <TextInput
                  editable={!!verificationId}
                  placeholder="123456"
                  onChangeText={(verificationCode) =>
                    this.setState({ verificationCode })
                  }
                />
                <Button
                  title="Confirm Verification Code"
                  disabled={!verificationCode}
                  onPress={this.handleVerifyVerificationCode}
                />
              </View>
            )}

            {this.state.attemptInvisibleVerification && (
              <FirebaseRecaptchaBanner />
            )}
          </View>
        </TouchableWithoutFeedback>
      </>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    color: "#aaa",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default SignUpScreen;
