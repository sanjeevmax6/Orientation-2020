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
import Gamecard1 from './gameCard1';
import Gamecard2 from './gameCard2';
import Gamecard3 from './gameCard3';
import Gamecard4 from './gameCard4';
import Gamecard5 from './gameCard5';

const questionScreen = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Layout style={{flex: 1, backgroundColor: Colors.Black}}>
        <View style={styles.headingContainer}>
          <Text style={styles.headingText}>MYSTERY HUNT : .........</Text>
        </View>
        <ScrollView>
          <View style={styles.cardsContainer}>
            <Gamecard1 />

            <Gamecard2 />
            <Gamecard3 />
            <Gamecard4 />
            <Gamecard5 />
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
