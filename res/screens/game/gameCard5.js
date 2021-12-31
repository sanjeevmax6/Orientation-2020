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

const ClubCard = () => {
  return (
    <Card style={styles.card}>
      <TouchableOpacity activeOpacity={0.5}>
        <ImageBackground
          source={require('../../assets/images/gameImages/card5.jpg')}
          resizeMode="stretch"
          style={{
            width: scale(gameCardWidth),
            height: verticalScale(gameCardHeight),
            justifyContent: 'flex-end',
            alignItems: 'flex-start',
          }}>
          <View
            style={{
              flexDirection: 'row',
              marginBottom: verticalScale(30),
              marginLeft: scale(25),
            }}>
            <Text style={styles.cardText}>
              <Text style={{color: Colors.Black}}>{'O '}</Text>
              ROUND 5
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
    height: verticalScale(gameCardHeight),
    width: scale(gameCardWidth),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(75),
    borderTopLeftRadius: 0,
    backgroundColor: Colors.squidGameBlue,
    borderColor: Colors.White,
    borderWidth: scale(4),
  },
  cardText: {
    color: Colors.squidGamePink,
    fontSize: scale(22),
    fontFamily: squidGameFont,
    textAlign: 'center',
  },
});

export default ClubCard;
