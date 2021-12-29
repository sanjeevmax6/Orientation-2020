import React from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  _View,
} from 'react-native';
import {Layout, Card} from '@ui-kitten/components';
import {SafeAreaView} from 'react-native-safe-area-context';
import {verticalScale, scale} from 'react-native-size-matters';
import * as Colors from '../../utils/colors';
import {
  borderRadiusLarge,
  squidGameFont,
  fontSizeVeryLarge,
  fontSizeBig,
  paddingSmall,
  paddingMedium,
  paddingBig,
} from '../../utils/UIConstants';

const questionScreen = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Layout style={{flex: 1, backgroundColor: Colors.Black}}>
        <View style={styles.headingContainer}>
          <Text style={styles.headingText}>MYSTERY HUNT : .........</Text>
        </View>
        <ScrollView>
          <View style={styles.cardsContainer}>
            <Card style={styles.card1}></Card>
            <Card style={styles.card2}></Card>
            <Card style={styles.card3}></Card>
            <Card style={styles.card4}></Card>
            <Card style={styles.card5}></Card>
          </View>
        </ScrollView>
        <View style={styles.leaderboardContainer}>
          <Text style={styles.leaderboardText}>LEADERBOARDS : .......</Text>
        </View>
      </Layout>
    </SafeAreaView>
  );
};

export default questionScreen;
const styles = StyleSheet.create({
  headingContainer: {
    marginVertical: scale(paddingMedium),
  },
  headingText: {
    color: Colors.squidGameGreen,
    fontSize: scale(20),
    fontFamily: squidGameFont,
    textAlign: 'center',
  },
  cardsContainer: {
    alignItems: 'center',
  },
  card1: {
    marginBottom: verticalScale(paddingMedium),
    height: verticalScale(300),
    width: scale(300),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(75),
    borderTopLeftRadius: 0,
    backgroundColor: Colors.squidGamePink,
    borderWidth: 0,
  },
  card2: {
    marginBottom: verticalScale(paddingMedium),
    height: verticalScale(300),
    width: scale(300),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(75),
    borderBottomRightRadius: 0,
    backgroundColor: Colors.squidGamePink,
    borderWidth: 0,
  },
  card3: {
    marginBottom: verticalScale(paddingMedium),
    height: verticalScale(300),
    width: scale(300),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(75),
    borderTopRightRadius: 0,
    backgroundColor: Colors.squidGamePink,
    borderWidth: 0,
  },
  card4: {
    marginBottom: verticalScale(paddingMedium),
    height: verticalScale(300),
    width: scale(300),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(75),
    borderBottomLeftRadius: 0,
    backgroundColor: Colors.squidGameBlue,
    borderWidth: 0,
  },
  card5: {
    marginBottom: verticalScale(paddingMedium),
    height: verticalScale(300),
    width: scale(300),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(75),
    borderTopLeftRadius: 0,
    backgroundColor: Colors.squidGameBlue,
    borderWidth: 0,
  },
  leaderboardContainer: {
    marginVertical: scale(paddingMedium),
  },
  leaderboardText: {
    color: Colors.squidGameGreen,
    fontSize: scale(20),
    fontFamily: squidGameFont,
    textAlign: 'center',
  },
});
