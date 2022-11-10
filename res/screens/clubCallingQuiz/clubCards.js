import React from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {scale, verticalScale} from 'react-native-size-matters';

import {Yellow} from '../../utils/colors';
import {
  borderRadiusMedium,
  FONT,
  fontSizeMedium,
} from '../../utils/UIConstants';

const ClubCard = props => {
  return (
    <TouchableOpacity activeOpacity={1} onPress={() => {}}>
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
            uri: props.img,
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
            {props.clubName}
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
    marginBottom: verticalScale(15),
    //marginHorizontal: scale(3),
  },
});

export default ClubCard;
