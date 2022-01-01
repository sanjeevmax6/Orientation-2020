import React from 'react';
import {Card} from '@ui-kitten/components';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import * as Colors from '../../utils/colors';
import {
  paddingMedium,
  borderRadiusMedium,
  fontSizeMedium,
  fontSizeBig,
  gameCardHeight,
  gameCardWidth,
  squidGameFont,
} from '../../utils/UIConstants';

const gameCard2 = () => {
  return (
    <Card style={styles.card}>
      <TouchableOpacity activeOpacity={0.5}>
        <ImageBackground
          source={require('../../assets/images/gameImages/card1.jpg')}
          resizeMode="cover"
          style={{
            width: scale(275),
            height: verticalScale(200),
            justifyContent: 'center',
            alignItems: 'flex-end',
          }}>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <Text style={styles.cardText}>
              <Text style={{color: Colors.squidGamePink, fontWeight: 'bold'}}>
                {'\u2606 '}
              </Text>
              ROUND 2
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
    borderBottomRightRadius: 0,
    backgroundColor: Colors.squidGameBlue,
    borderColor: Colors.White,
    borderWidth: scale(4),
  },
  cardText: {
    color: Colors.Black,
    fontSize: scale(22),
    fontFamily: squidGameFont,
    textAlign: 'center',
    transform: [{rotate: '90deg'}],
  },
});

export default gameCard2;
