import React from 'react';
import {Card} from '@ui-kitten/components';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import * as Colors from '../../utils/colors';

import {
  paddingMedium,
  gameCardHeight,
  gameCardWidth,
  squidGameFont,
} from '../../utils/UIConstants';

const gameCard1 = (link, startTime, endTime) => {
  return (
    <Card style={styles.card}>
      <TouchableOpacity activeOpacity={0.5}>
        <ImageBackground
          source={require('../../assets/images/gameImages/card2.jpg')}
          resizeMode="stretch"
          style={{
            width: scale(275),
            height: verticalScale(200),
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
          }}>
          <View
            style={{
              flexDirection: 'row',
              marginBottom: verticalScale(30),
              marginRight: scale(25),
            }}>
            <Text style={styles.cardText}>
              <Text style={{color: Colors.squidGameBlue}}>{'{ '}</Text>
              ROUND 1
            </Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: verticalScale(paddingMedium),
    height: verticalScale(200),
    width: scale(275),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(75),
    borderTopLeftRadius: 0,
    backgroundColor: Colors.squidGamePink,
    borderColor: Colors.White,
    borderWidth: scale(4),
  },
  cardText: {
    color: Colors.White,
    fontSize: scale(22),
    fontFamily: squidGameFont,
    textAlign: 'center',
  },
});

export default gameCard1;
