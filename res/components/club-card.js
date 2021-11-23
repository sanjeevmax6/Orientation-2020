import React from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {scale, verticalScale} from 'react-native-size-matters';

import {Yellow} from '../utils/colors';
import {Icon} from '@ui-kitten/components';
import {paddingMedium, borderRadiusMedium} from '../utils/UIConstants';

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
    <>
      <LinearGradient
        start={{x: 0.0, y: 0.0}}
        end={{x: 1.0, y: 0.0}}
        colors={['#ff512f', '#ff5130', '#f13e4d']}
        style={styles.card}>
        <TouchableOpacity onPress={onPressHandler}>
          <Image
            style={{
              backgroundColor: 'pink',
              width: '100%',
              height: verticalScale(200),
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}
            resizeMode="cover"
            source={{
              uri: url,
            }}
          />
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            flexDirection: 'row',
            paddingHorizontal: 10,
          }}>
          <Text
            numberOfLines={1}
            style={{
              fontSize: 24,
              paddingRight: 9,
              color: 'white',
              textTransform: 'uppercase',
              flex: 1,
            }}>
            {clubName}
          </Text>
          <TouchableOpacity onPress={onPressHandler}>
            <Icon
              style={{
                width: 24,
                height: 24,
                backgroundColor: 'white',
                borderRadius: 24,
                elevation: 5,
              }}
              fill="black"
              name="diagonal-arrow-right-up-outline"
            />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: borderRadiusMedium,
    backgroundColor: Yellow,
    marginTop: verticalScale(0),
    height: verticalScale(250),
    width: scale(200),
    elevation: 5,
    marginBottom: verticalScale(6),
    //marginHorizontal: scale(3),
  },
});

export default ClubCard;
