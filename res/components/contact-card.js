import React from 'react';
import {Text, Card} from '@ui-kitten/components';
import {ImageBackground, StyleSheet, View} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import {
  borderRadiusLarge,
  fontSizeMedium,
  fontSizeBig,
  paddingMedium,
  paddingSmall,
} from '../utils/UIConstants';
import {Black, White} from '../utils/colors';
import LinearGradient from 'react-native-linear-gradient';

const ContactCard = () => {
  return (
    <>
      <Card style={styles.card}>
        <ImageBackground
          source={require('../assets/contact-card.jpg')}
          resizeMode="cover"
          style={styles.image}>
          <LinearGradient
            colors={['transparent', Black]}
            style={styles.linearGradient}
            locations={[0.3, 1.2]}></LinearGradient>
          <View style={styles.textContainer}>
            <Text style={styles.textName}>Maria</Text>
            <Text style={styles.textBody}>Designer</Text>
          </View>
        </ImageBackground>
      </Card>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    height: verticalScale(160),
    width: scale(130),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadiusLarge,
    borderWidth: 0,
    margin: paddingMedium,
  },
  image: {
    height: verticalScale(160),
    width: scale(130),
  },
  linearGradient: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  textContainer: {
    height: verticalScale(40),
    width: scale(120),
    position: 'absolute',
    bottom: 0,
  },
  textName: {
    marginLeft: scale(paddingMedium),
    fontSize: fontSizeBig,
    color: White,
  },
  textBody: {
    marginTop: verticalScale(-3),
    marginLeft: scale(paddingMedium),
    fontSize: fontSizeMedium,
    color: White,
  },
});

export default ContactCard;
