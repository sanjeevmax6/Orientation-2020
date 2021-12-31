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
} from '../../utils/UIConstants';

const ClubCard = () => {
  return <Card style={styles.card}></Card>;
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
    backgroundColor: Colors.squidGamePink,
    borderWidth: 0,
  },
});

export default ClubCard;
