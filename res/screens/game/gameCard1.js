import React from 'react';
import {Card} from '@ui-kitten/components';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  Linking,
} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import * as Colors from '../../utils/colors';

import {
  paddingMedium,
  gameCardHeight,
  gameCardWidth,
  squidGameFont,
} from '../../utils/UIConstants';

const gameCard1 = ({link, isDone, startTime, endTime}) => {
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
          source={require('../../assets/images/gameImages/cardG1.jpg')}
          resizeMode="stretch"
          style={{
            width: scale(275),
            height: verticalScale(200),
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}>
          <View
            style={{
              flexDirection: 'row',
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
    transform: [{rotate: '90deg'}],
  },
});

export default gameCard1;
