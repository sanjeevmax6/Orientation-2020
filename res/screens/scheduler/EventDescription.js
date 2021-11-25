import React from 'react';
import {View, Image, Text, Dimensions} from 'react-native';
import {Divider, Icon} from '@ui-kitten/components';
import {
  moderateScale,
  scale,
  ScaledSheet,
  verticalScale,
} from 'react-native-size-matters';
import {paddingSmall, fontSizeMedium, FONT} from '../../utils/UIConstants';

import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView} from 'react-native-gesture-handler';
import Links from './Links';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
const WIDTH = Dimensions.get('window').width;

const EventDescription = ({route}) => {
  const {data} = route.params;
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView showsVerticalScrollIndicator={false}>
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
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingBottom: verticalScale(9),
              }}>
              <Icon
                name="calendar-outline"
                fill="#f27d00"
                style={{
                  height: verticalScale(15),
                  width: scale(15),
                }}
              />
              <Text style={styles.eventDate}>
                {moment(data.date).format('DD/MM/YY')} | {data.Time} |{' '}
                {data.Duration}
              </Text>
            </View>
          </View>
          <LinearGradient
            start={{x: 0.0, y: 0.25}}
            end={{x: 0.5, y: 1.0}}
            locations={[0, 0.6, 0.8]}
            colors={['#f13e4d', '#ff5130', '#ff512f']}
            style={{
              height: verticalScale(1),
              backgroundColor: '#eaeaea',
              marginHorizontal: scale(3),
              marginVertical: verticalScale(6),
              opacity: 0.8,
            }}
          />
          <View
            style={{
              paddingHorizontal: paddingSmall,
              marginBottom: verticalScale(7),
            }}>
            <Links link={data.Link} />
          </View>
          <LinearGradient
            start={{x: 0.0, y: 0.25}}
            end={{x: 0.5, y: 1.0}}
            locations={[0, 0.6, 0.8]}
            colors={['#f13e4d', '#ff5130', '#ff512f']}
            style={{
              height: verticalScale(1),
              backgroundColor: '#eaeaea',
              marginHorizontal: scale(3),
              marginVertical: verticalScale(6),
              opacity: 0.8,
            }}
          />
          <View
            style={{
              paddingHorizontal: paddingSmall,
              paddingBottom: verticalScale(20),
            }}>
            <Text style={styles.title}>Contact Details</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icon
                name="phone-call-outline"
                fill="#f27d00"
                style={{height: verticalScale(15), width: scale(15)}}
              />
              <Text
                selectable={true}
                selectionColor={'#f13e4d'}
                style={{
                  ...styles.description,
                  marginLeft: scale(5),
                  marginBottom: 0,
                }}>
                {data.ContactName1} - {data.ContactNumber1}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Icon
                name="phone-call-outline"
                fill="#f27d00"
                style={{height: verticalScale(15), width: scale(15)}}
              />
              <Text
                selectable={true}
                selectionColor={'#f13e4d'}
                style={{
                  ...styles.description,
                  marginLeft: scale(5),
                  marginBottom: 0,
                }}>
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
    fontSize: scale(18),
    fontWeight: '600',
    marginVertical: verticalScale(7),
    backgroundColor: 'white',
    fontFamily: FONT,
    textTransform: 'uppercase',
  },
  description: {
    fontSize: scale(fontSizeMedium),
    marginBottom: verticalScale(7),
    backgroundColor: 'white',
    lineHeight: verticalScale(25),
    fontFamily: FONT,
  },
  eventDate: {
    fontSize: '16@s',
    marginHorizontal: '10@s',

    color: 'black',
    fontFamily: FONT,
  },
});
export default EventDescription;
