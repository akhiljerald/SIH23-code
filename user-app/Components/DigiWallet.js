import React, { useEffect } from "react";
import { View, Text, Image, StyleSheet, StatusBar,TouchableOpacity } from "react-native";
import {useSelector,useDispatch} from 'react-redux';
import { selectPoints,selectStreaks,setPoints } from "../slices/navSlice";

export default function DigiWallet({ navigation }) {
  const points= useSelector(selectPoints);
  const streaks = useSelector(selectStreaks);
  const dispatch = useDispatch();
  useEffect
  (()=>{
    if(streaks>1)
    {
      dispatch(setPoints(streaks*5))
    }
  },[])
  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="#fff"
        barStyle="dark-content"
      />
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/community_points.png')}
          style={styles.image}
        />
        <View style={styles.gap}></View>
        <Image
          source={require('../assets/Trash_icon.png')}
          style={styles.image}
        />
      </View>
      <View style={styles.textContainer}>
        <View>
          <Text style={styles.title}>Streaks</Text>
          <Text style={styles.number}>{streaks}</Text>
        </View>
        <View>
          <Text style={styles.title}>Points</Text>
          <Text style={styles.number}>{points}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.cardContainer}
        onPress={() => navigation.navigate("Vouchers")}
      >
        <Text style={styles.cardText}>Vouchers</Text>
      </TouchableOpacity>
      {/* Card view for Payout */}
      <TouchableOpacity
        style={styles.cardContainer}
        onPress={() => navigation.navigate("Payout")}
      >
        <Text style={styles.cardText}>Payout</Text>
      </TouchableOpacity>
      <Text style={styles.tac}>**Every 55  points is 1 rupee and every streak is 5 points </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight, // Adjust for status bar height
    backgroundColor: "#fff",
    marginTop:20,
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 100,
    height: 100,
  },
  gap: {
    width: 99, // Adjust the gap width as needed
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingHorizontal: 20, // Add horizontal padding
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10, // Add margin bottom for spacing between titles
  },
  number: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#000",
  },
  cardContainer: {
    backgroundColor: "#E8E8E8",
    borderRadius: 8,
    padding: 16,
    marginHorizontal: 20,
    marginVertical: 10,
    alignItems: "center",
  },
  cardText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  tac:{
    fontSize: 10,
    fontWeight: "bold",
    color: "grey",
    textAlign:'center',
    marginTop:10
  }
});
