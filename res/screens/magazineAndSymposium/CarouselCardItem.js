import React from 'react';
import {
  Dimensions,
  Image,
  Text,
  StyleSheet,
  View,
  ScrollView,
} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import {White} from '../../utils/colors';
import {
  borderRadius,
  borderRadiusMedium,
  fontSizeBig,
  fontSizeMedium,
  fontSizeVeryLarge,
} from '../../utils/UIConstants';

export const SLIDER_WIDTH = Dimensions.get('window').width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.75);

const CarouselCardItem = ({item, index}) => {
  return (
    <ScrollView style={styless.container} key={index}>
      <Image
        source={{uri: item.imgUrl}}
        resizeMode="cover"
        style={styless.image}
      />

      <Text style={styless.header}>{item.title}</Text>
      <Text style={styless.body}>{item.body}</Text>
      <View style={{height: 100, width: 52}} />
    </ScrollView>
  );
};

const styless = StyleSheet.create({
  container: {
    backgroundColor: White,
    borderRadius: borderRadiusMedium,
    width: ITEM_WIDTH,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  image: {
    width: '100%',
    height: verticalScale(ITEM_WIDTH),
    borderRadius: borderRadiusMedium,
  },
  header: {
    color: 'black',
    fontSize: fontSizeVeryLarge,
    fontWeight: 'bold',
    paddingVertical: scale(5),
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  body: {
    color: '#222',
    fontSize: fontSizeBig,
    paddingHorizontal: scale(5),
    paddingVertical: scale(10),
  },
});

export default CarouselCardItem;
