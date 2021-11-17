import React from 'react';
import {Dimensions, Image, Text, StyleSheet, View} from 'react-native';
import {styles} from 'react-native-element-textinput/src/TextInput/styles';
import {scale, verticalScale} from 'react-native-size-matters';
import {White} from '../../utils/colors';
import {
  borderRadius,
  fontSizeBig,
  fontSizeMedium,
  fontSizeVeryLarge,
} from '../../utils/UIConstants';

export const SLIDER_WIDTH = Dimensions.get('window').width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

const CarouselCardItem = ({item, index}) => {
  return (
    <View style={styless.container} key={index}>
      <Image
        source={{uri: item.imgUrl}}
        resizeMode="stretch"
        style={styless.image}
      />
      <Text style={styless.header}>{item.title}</Text>
      <Text style={styless.body}>{item.body}</Text>
    </View>
  );
};

const styless = StyleSheet.create({
  container: {
    backgroundColor: White,
    borderRadius: borderRadius,
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
    width: ITEM_WIDTH,
    height: verticalScale(300),
    borderTopLeftRadius: borderRadius,
    borderTopRightRadius: borderRadius,
  },
  header: {
    color: '#222',
    fontSize: fontSizeVeryLarge,
    fontWeight: 'bold',
    paddingTop: scale(5),
    textAlign: 'center',
  },
  body: {
    color: '#222',
    fontSize: fontSizeBig,
    paddingHorizontal: scale(5),
    paddingVertical: scale(10),
  },
});

export default CarouselCardItem;
