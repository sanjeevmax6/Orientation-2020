import React from 'react';
import {Card} from '@ui-kitten/components';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  Linking,
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

const ClubCard = ({link, isDone}) => {
  return (
    <Card
      style={{
        ...styles.card,
        borderColor: isDone ? Colors.squidGameGreen : Colors.White,
      }}>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => Linking.openURL(link)}>
        <ImageBackground
          source={require('../../assets/images/gameImages/card4.jpg')}
          resizeMode="cover"
          style={{
            width: scale(gameCardWidth),
            height: verticalScale(gameCardHeight),
            justifyContent: 'center',
            alignItems: 'flex-end',
          }}>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <Text style={styles.cardText}>
              <Text style={{color: Colors.squidGamePink}}>{'} '}</Text>
              ROUND 4
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
    borderBottomLeftRadius: 0,
    backgroundColor: Colors.squidGameBlue,
    borderColor: Colors.White,
    borderWidth: scale(4),
  },
  cardText: {
    color: Colors.White,
    fontSize: scale(22),
    fontFamily: squidGameFont,
    textAlign: 'center',
    transform: [{rotate: '90deg'}],
  },
});

export default ClubCard;
