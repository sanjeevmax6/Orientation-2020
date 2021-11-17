import React, {useState} from 'react';
import {View, Image, Text, Dimensions} from 'react-native';
import {Divider, Icon} from '@ui-kitten/components';
import {
  moderateScale,
  scale,
  ScaledSheet,
  verticalScale,
} from 'react-native-size-matters';
import {
  fontSizeBig,
  fontSizeVeryLarge,
  fontSizeSmall,
  iconMedium,
  paddingSmall,
  fontSizeMedium,
} from '../../utils/UIConstants';
// import Icon from 'react-native-vector-icons/FontAwesome';
import * as Colors from '../../utils/colors';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView} from 'react-native-gesture-handler';
import Links from './Links';

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
                uri: 'https://encrypted-tbn0.gstatic.com/image?q=tbn:ANd9GcRemhwHNljTo4pxynHrc7O3F-ZA6-eLUqzMLg&usqp=CAU',
              }}
            />
          </View>
          <Divider />
          <View style={{paddingHorizontal: paddingSmall}}>
            <Text style={styles.title}>{data.title}</Text>
            <Text style={styles.description}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Icon
                name="calendar-outline"
                fill="black"
                style={{height: verticalScale(15), width: scale(15)}}
              />
              <Text style={styles.eventDate}>
                {data.date} | {data.time} | {data.duration}
              </Text>
            </View>
          </View>
          <Divider />
          <View
            style={{
              paddingHorizontal: paddingSmall,
              marginBottom: verticalScale(7),
            }}>
            <Links links={data.links} />
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
                Ankur Gambir - 6969696969
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Icon
                name="phone-call-outline"
                fill="black"
                style={{height: verticalScale(15), width: scale(15)}}
              />
              <Text style={{...styles.description, marginLeft: scale(5)}}>
                Ankur Gambir - 6969696969
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
