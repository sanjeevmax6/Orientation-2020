import React from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {scale, verticalScale} from 'react-native-size-matters';

import {Yellow} from '../utils/colors';
import {Icon} from '@ui-kitten/components';
import {paddingMedium, borderRadiusMedium} from '../utils/UIConstants';

import {Symp_Modal_Store} from '../mobx/symposiumModalStore';

const CARD_WIDTH = 300;
const CARD_HEIGHT = 360;
const SympCard = ({
  Name,
  department,
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
    Symp_Modal_Store.openModal();
    Symp_Modal_Store.setUrl(url);
    Symp_Modal_Store.setClubName(Name);
    Symp_Modal_Store.setDescription(description);
    Symp_Modal_Store.setWebsite(website);
    Symp_Modal_Store.setLinkedIn(LinkedIn);
    Symp_Modal_Store.setInstagram(Instagram);
    Symp_Modal_Store.setFacebook(Facebook);
    Symp_Modal_Store.setMedium(Medium);
    Symp_Modal_Store.setYoutube(Youtube);
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
              height: verticalScale(CARD_WIDTH),
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
            style={{
              flex: 1,
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
              {Name}
            </Text>
            <Text>{'\n'}</Text>
            <Text style={{color: 'white', fontSize: scale(12)}}>
              {department}
            </Text>
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
    elevation: 5,
    marginHorizontal: scale(9),
    height: verticalScale(CARD_HEIGHT),
    width: scale(CARD_WIDTH),
  },
});

export default SympCard;
