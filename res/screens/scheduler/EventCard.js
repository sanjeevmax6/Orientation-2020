import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {Text, Icon} from '@ui-kitten/components';
import * as Colors from '../../utils/colors';
import {
  fontSizeMedium,
  fontSizeSmall,
  paddingSmall,
  paddingMedium,
  borderRadiusLarge,
  academicCalendarCardHeight,
  iconSmall,
} from '../utils/UIConstants';
import {scale, ScaledSheet, moderateScale} from 'react-native-size-matters';
import {FONT} from '../../utils/UIConstants';

const EventCard = ({item, navigation}) => {
  return (
    <TouchableOpacity
      style={styles.cardcontainer}
      onPress={() => {
        navigation.navigate('Event Description', {data: item});
      }}>
      <View
        style={{
          width: scale(6),
          backgroundColor: Colors.Tertiary,
          borderRadius: scale(5),
        }}
      />
      <View style={styles.eventinfo}>
        <Text style={styles.eventName} numberOfLines={1}>
          {item.Title}
        </Text>
        <Text style={{fontFamily: FONT}}>
          Time: {item.Time} | Duration: {item.Duration}
        </Text>
      </View>
      <Image
        style={styles.Img}
        source={{
          uri: item.Image,
        }}
      />
    </TouchableOpacity>
  );
};

const styles = ScaledSheet.create({
  cardcontainer: {
    flexDirection: 'row',
    borderColor: 'black',
    borderWidth: '1@s',
    borderRadius: '5@s',
    marginTop: '5@vs',
    padding: '5@s',
    marginHorizontal: '10@s',
    backgroundColor: 'white',
  },
  eventinfo: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-around',
    marginLeft: '5@s',
  },
  Img: {
    alignSelf: 'center',
    backgroundColor: 'white',
    marginRight: '5@s',
    height: '60@msr',
    width: '60@msr',
    borderRadius: '2@sr',
  },
  eventName: {
    fontSize: '16@s',
    fontWeight: 'bold',
    fontFamily: FONT,
  },
});

export default EventCard;
