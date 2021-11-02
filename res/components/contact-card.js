import React from 'react';
import {Card} from '@ui-kitten/components';
import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  PixelRatio,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import {scale, verticalScale} from 'react-native-size-matters';

import {
  borderRadiusLarge,
  fontSizeMedium,
  paddingMedium,
} from '../utils/UIConstants';
import {Black, White} from '../utils/colors';

let cardHeight = 200;
let cardWidth = 150;
const ContactCard = () => {
  return (
    <>
      <Card style={styles.card}>
        <ImageBackground
          source={{
            uri: 'https://i.pinimg.com/736x/51/62/1b/51621b2f3f79d8b25ddb8bccbbf366ca--north-india-smiling-faces.jpg',
          }}
          resizeMode="cover"
          style={styles.image}>
          <LinearGradient
            colors={['transparent', 'rgba(10, 10, 10, 0.75)', Black]}
            style={styles.linearGradient}
            locations={[0.5, 0.75, 1.0]}
          />
          <View style={styles.textContainer}>
            <Text numberOfLines={1} style={styles.textName}>
              KANTI
            </Text>
            <Text numberOfLines={1} style={styles.textBody}>
              BEIN
            </Text>
          </View>
        </ImageBackground>
      </Card>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    height: verticalScale(cardHeight),
    width: scale(cardWidth),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: scale(borderRadiusLarge),
    borderWidth: 0,
    //margin: paddingMedium,
  },
  image: {
    height: verticalScale(cardHeight),
    width: scale(cardWidth),
  },
  linearGradient: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    height: verticalScale(cardHeight),
    width: scale(cardWidth),
  },
  textContainer: {
    height: verticalScale(40),
    width: scale(120),
    position: 'absolute',
    bottom: 0,
  },
  textName: {
    marginLeft: scale(paddingMedium),
    fontSize: scale(fontSizeMedium) / PixelRatio.getFontScale(),
    color: White,
  },
  textBody: {
    marginLeft: scale(paddingMedium),
    fontSize: scale(fontSizeMedium) / PixelRatio.getFontScale(),
    color: White,
    marginTop: verticalScale(-3),
  },
});

export default ContactCard;
