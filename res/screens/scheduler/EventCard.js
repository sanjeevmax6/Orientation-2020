import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {Text} from '@ui-kitten/components';
import * as Colors from '../../utils/colors';
import LinearGradient from 'react-native-linear-gradient';
import {scale, ScaledSheet} from 'react-native-size-matters';
import {FONT} from '../../utils/UIConstants';

const EventCard = ({item, navigation}) => {
  var d = new Date(item.date);
  let minutes = d.getMinutes();
  if (minutes < 10) {
    minutes = '0' + minutes;
  }
  return (
    <TouchableOpacity
      style={styles.cardcontainer}
      onPress={() => {
        navigation.navigate('Event Description', {data: item});
      }}>
      <LinearGradient
        start={{x: 0.0, y: 0.0}}
        end={{x: 0.0, y: 1.0}}
        colors={['#ff510f', '#f13e44']}
        style={{
          width: scale(6),
          borderRadius: scale(5),
        }}></LinearGradient>

      <View style={styles.eventinfo}>
        <Text style={styles.eventName} numberOfLines={1}>
          {item.Title}
        </Text>
        <Text style={{fontFamily: FONT}}>
          Time: {d.getHours()}:{minutes} | Duration: {item.Duration}
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
    borderColor: '#666666',
    borderWidth: '0.5@s',
    borderRadius: '6@s',
    padding: '5@s',
    marginHorizontal: '10@s',
    backgroundColor: 'white',
    elevation: 3,
    marginVertical: '9@vs',
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
    height: '66@msr',
    width: '66@msr',
    borderRadius: '9@sr',
  },
  eventName: {
    fontSize: '18@s',
    fontWeight: '900',
    fontFamily: FONT,
  },
});

export default EventCard;
