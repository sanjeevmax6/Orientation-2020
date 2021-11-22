import React, {useState} from 'react';
import {View, Image, Text, Dimensions} from 'react-native';
import {Divider, Icon} from '@ui-kitten/components';
import {
  moderateScale,
  scale,
  ScaledSheet,
  verticalScale,
} from 'react-native-size-matters';
import {paddingSmall, fontSizeMedium} from '../../utils/UIConstants';
// import Icon from 'react-native-vector-icons/FontAwesome';
import * as Colors from '../../utils/colors';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView} from 'react-native-gesture-handler';
import Links from './Links';
import moment from 'moment';
const WIDTH = Dimensions.get('window').width;

const EventDescription = ({route}) => {
  const {data} = route.params;
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView>
        <View style={{flex: 1, backgroundColor: 'white'}}>
          <View style={{backgroundColor: '#f8faf9'}}>
            <Image
              style={styles.img}
              source={{
                uri: data.Image,
              }}
            />
          </View>
          <Divider />
          <View style={{paddingHorizontal: paddingSmall}}>
            <Text style={styles.title}>{data.Title}</Text>
            <Text style={styles.description}>{data.Description}</Text>
            <View style={{flexDirection: 'row'}}>
              <Icon
                name="calendar-outline"
                fill="black"
                style={{height: verticalScale(15), width: scale(15)}}
              />
              <Text style={styles.eventDate}>
                {moment(data.date).format('DD/MM/YY')} | {data.Time} |{' '}
                {data.Duration}
              </Text>
            </View>
          </View>
          <Divider />
          <View
            style={{
              paddingHorizontal: paddingSmall,
              marginBottom: verticalScale(7),
            }}>
            <Links link={data.Link} />
          </View>
          <Divider />
          <View
            style={{
              paddingHorizontal: paddingSmall,
              paddingBottom: verticalScale(20),
            }}>
            <Text style={styles.title}>Contact Details</Text>
            <View style={{flexDirection: 'row'}}>
              <Icon
                name="phone-call-outline"
                fill="black"
                style={{height: verticalScale(15), width: scale(15)}}
              />
              <Text style={{...styles.description, marginLeft: scale(5)}}>
                {data.ContactName1} - {data.ContactNumber1}
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Icon
                name="phone-call-outline"
                fill="black"
                style={{height: verticalScale(15), width: scale(15)}}
              />
              <Text style={{...styles.description, marginLeft: scale(5)}}>
                {data.ContactName2} - {data.ContactNumber2}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = ScaledSheet.create({
  img: {
    height: WIDTH - moderateScale(30),
    width: WIDTH - moderateScale(30),
    marginTop: moderateScale(20),
    marginBottom: moderateScale(20),
    alignSelf: 'center',
  },
  title: {
    fontSize: scale(17),
    fontWeight: '500',
    marginVertical: verticalScale(7),
    backgroundColor: 'white',
  },
  description: {
    fontSize: fontSizeMedium,
    marginBottom: verticalScale(7),
    backgroundColor: 'white',
    lineHeight: 22,
  },
  eventDate: {
    fontSize: '14@s',
    marginHorizontal: '10@s',
    fontWeight: 'bold',
    marginBottom: verticalScale(7),
  },
});
export default EventDescription;
