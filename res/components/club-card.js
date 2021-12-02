import React from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {scale, verticalScale} from 'react-native-size-matters';

import {Yellow} from '../utils/colors';
import {Icon} from '@ui-kitten/components';
import {
  paddingMedium,
  borderRadiusMedium,
  FONT,
  fontSizeMedium,
  fontSizeBig,
} from '../utils/UIConstants';

import {Club_Modal_Store} from '../mobx/clubModalStore';
const ClubCard = ({
  clubName,
  url,
  description,
  website,
  LinkedIn,
  Youtube,
  Instagram,
  Medium,
  Facebook,
}) => {
  const onPressHandler = () => {
    Club_Modal_Store.openModal();
    Club_Modal_Store.setUrl(url);
    Club_Modal_Store.setClubName(clubName);
    Club_Modal_Store.setDescription(description);
    Club_Modal_Store.setWebsite(website);
    Club_Modal_Store.setLinkedIn(LinkedIn);
    Club_Modal_Store.setInstagram(Instagram);
    Club_Modal_Store.setFacebook(Facebook);
    Club_Modal_Store.setMedium(Medium);
    Club_Modal_Store.setYoutube(Youtube);
  };
  return (
    <TouchableOpacity onPress={onPressHandler}>
      <LinearGradient
        start={{x: 0.0, y: 0.0}}
        end={{x: 1.0, y: 0.0}}
        colors={['#ff512f', '#ff5130', '#f13e4d']}
        style={styles.card}>
        <Image
          style={{
            backgroundColor: 'pink',
            width: '100%',
            height: verticalScale(160),
            borderTopLeftRadius: scale(9),
            borderTopRightRadius: scale(9),
          }}
          resizeMode="cover"
          source={{
            uri: url,
          }}
        />

        <View
          style={{
            flex: 1,
            alignItems: 'center',
            flexDirection: 'row',
            paddingHorizontal: scale(10),
          }}>
          <Text
            numberOfLines={1}
            allowFontScaling={false}
            style={{
              fontSize: scale(fontSizeMedium),
              color: 'white',
              flex: 1,
              fontFamily: FONT,
            }}>
            {clubName}
          </Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Yellow,
    marginTop: verticalScale(0),
    height: verticalScale(200),
    width: scale(150),
    elevation: 5,
    borderRadius: scale(borderRadiusMedium),
    marginBottom: verticalScale(6),
    //marginHorizontal: scale(3),
  },
});

export default ClubCard;
