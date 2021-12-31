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
    <View style={{flex: 1}}>
      <Card style={styles.card}>
        <TouchableOpacity activeOpacity={0.5}>
          <ImageBackground
            source={require('../../assets/images/gameImages/card3.png')}
            resizeMode="stretch"
            style={{
              width: scale(gameCardWidth),
              height: verticalScale(gameCardHeight),
              justifyContent: 'flex-start',
              alignItems: 'flex-end',
            }}>
            <View
              style={{
                marginTop: verticalScale(20),
                marginRight: scale(30),
                flexDirection: 'row',
              }}>
              <Text style={styles.cardText}>
                <Text style={{color: Colors.Black}}>{'{ '}</Text>
                ROUND 3
              </Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      </Card>
    </View>
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
    borderTopRightRadius: 0,
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

export default ClubCard;
