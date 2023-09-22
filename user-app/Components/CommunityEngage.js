import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Linking,ScrollView } from 'react-native';

export function CommunityEngage() {
  const openInstagram = () => {
    Linking.openURL('https://www.instagram.com/');
  };

  return (
    <>
    <ScrollView>
    <View style={styles.container}>
   
     
      <Image
        source={require('../assets/ICONS.png')}
        style={styles.image}
      />
       <Text style={styles.boldText}> #TrashItWinIt</Text>
      </View>
     
   
    <View>
       
    <Text style={styles.descriptionText}>
    <Text style={styles.highlight}>#TrashItWinIt</Text>  is a community game where every community competes to give us the most amount of wet waste. The winning community will be awarded a grand prize of
          <Text style={styles.highlight}> 1 lakhs!</Text> The game's time period is 8 months, and the rules are simple:
        </Text>
        <Text style={styles.boldText}>Rules</Text>
       

<Text style={styles.descriptionText}>
  1. <Text style={styles.highlightrules}>App Usage and Participants</Text>:To participate, this official app to track your waste management progress. Earn streaks and points for consistent efforts.This event is only open to <Text style={styles.highlightrules}>households </Text>in the locality,commerical businesses cannot participate in the game,However are still welcome to use the facilities of the app.
</Text>

<Text style={styles.descriptionText}>
  2. <Text style={styles.highlightrules}>Waste Segregation</Text>: Properly segregate wet and dry waste at your community's collection points. Incorrect segregation may result in penalties or disqualification.
</Text>

<Text style={styles.descriptionText}>
  3. <Text style={styles.highlightrules}>Social Sharing</Text>: Share your community's waste reduction and segregation efforts on social media platforms (e.g., Facebook, Instagram, Twitter) using the hashtag #100Tonnes. Highlight your positive impact on the environment and inspire others to join.
</Text>

<Text style={styles.descriptionText}>
  4. <Text style={styles.highlightrules}>Documentation:</Text>Keep records of your waste collection and disposal efforts, including photographs or videos as evidence. This documentation may be required for verification.
</Text>

<Text style={styles.descriptionText}>
  5. <Text style={styles.highlightrules}>Random Audits:</Text> Communities may be subject to random audits to verify waste segregation and reporting accuracy. Ensure your waste management practices are always in compliance.
</Text>

<Text style={styles.descriptionText}>
  6. <Text style={styles.highlightrules}>Transparency:</Text>We will provide regular updates on the competition's progress and leaderboards. Transparency is crucial for maintaining trust among participants.
</Text>

<Text style={styles.descriptionText}>
  7. <Text style={styles.highlightrules}>Community Integrity:</Text>Uphold the reputation and integrity of your community. Cheating or misrepresentation of efforts will lead to disqualification.
</Text>

<Text style={styles.descriptionText}>
  8. <Text style={styles.highlightrules}>Disqualification:</Text>Communities caught cheating, misrepresenting data, or violating the rules may face disqualification from the competition. This decision will be final.
</Text>

<Text style={styles.descriptionText}>
  9.  <Text style={styles.highlightrules}>Appeals:</Text>If a community believes it has been unfairly treated or disqualified, they can appeal the decision within a specified timeframe. Appeals will be reviewed by an impartial panel.
</Text>

<Text style={styles.descriptionText}>
  10.  <Text style={styles.highlightrules}>Prize Distribution:</Text> The community with the highest environmental impact, as verified by our independent auditors, will receive the 2 lakhs prize at the end of the 6-month period.
</Text>

<Text style={styles.boldText}>Let's Make a Difference Together!</Text>
      </View>
     
    
    </ScrollView>
     <TouchableOpacity style={styles.button} onPress={openInstagram}>
     <Text style={styles.buttonText}>Join us on Instagram</Text>
   </TouchableOpacity>
  </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 34,
    height: 34,
    marginRight: 10,
    marginTop:10
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
  },
  boldText: {
    fontWeight: 'bold',
    marginTop:10,
    marginRight:5,
    padding:5,
    fontSize:19
  },

  descriptionText: {
  
    padding:10
  },
  button: {
    backgroundColor: 'green',
    padding: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  highlight: {
    fontWeight: 'bold',
    color: 'green',
    fontSize: 15,
  },
  highlightrules: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 14,
  },
});
