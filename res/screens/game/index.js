import {Layout, Card} from '@ui-kitten/components';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {verticalScale, scale} from 'react-native-size-matters';
import {GAME_Store} from '../../mobx/gameStore';
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
import {IS_GAME_START} from '../../utils/STORAGE_KEYS';

const game = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Layout style={{flex: 1, backgroundColor: Colors.Black}}>
        <ImageBackground
          source={require('../../assets/images/gameImages/background.jpg')}
          resizeMode="stretch"
          style={{
            flex: 1,
            width: undefined,
            height: undefined,
          }}>
          <View style={styles.headingContainer}>
            <Text style={styles.heading}>
              <Text style={{color: Colors.White}}>{'} '}</Text>
              Would you like to play a game with me?
              <Text style={{color: Colors.White}}>{' {'}</Text>
            </Text>
          </View>
          <View style={styles.cardContainer}>
            <Card style={styles.card}>
              <TouchableOpacity
                onPress={() => {
                  GAME_Store.setOnPressStartGame(true);
                  AsyncStorage.setItem(IS_GAME_START, 'true');
                }}>
                <ImageBackground
                  source={require('../../assets/images/gameImages/buttonImage.jpg')}
                  resizeMode="contain"
                  style={{
                    width: scale(250),
                    height: verticalScale(75),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={styles.cardText}>
                    <Text style={{color: Colors.White}}>{'    '}</Text>
                    YES
                    <Text style={{color: Colors.White}}>{' }{O'}</Text>
                  </Text>
                </ImageBackground>
              </TouchableOpacity>
            </Card>
          </View>
        </ImageBackground>
      </Layout>
    </SafeAreaView>
  );
};

export default game;

const styles = StyleSheet.create({
  headingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(40),
    paddingHorizontal: scale(paddingMedium),
  },
  heading: {
    color: Colors.squidGamePink,
    fontSize: scale(20),
    fontFamily: squidGameFont,
    textAlign: 'center',
  },
  cardContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scale(paddingMedium),
    marginTop: verticalScale(40),
  },
  card: {
    height: verticalScale(75),
    width: scale(250),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(borderRadiusLarge),
    backgroundColor: Colors.Black,
    borderWidth: scale(6),
    borderColor: Colors.squidGameGreen,
  },
  cardText: {
    color: Colors.squidGameYellow,
    fontSize: scale(20),
    fontFamily: squidGameFont,
    textAlign: 'center',
  },
});
