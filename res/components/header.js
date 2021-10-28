import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import LinearGradient from 'react-native-linear-gradient';

import {Icon} from '@ui-kitten/components';
import {fontSizeBig, paddingSmall} from '../utils/UIConstants';

const Header = ({props, title = 'HEADER'}) => {
  return (
    <LinearGradient
      start={{x: 0.0, y: 0.0}}
      end={{x: 1.0, y: 0.0}}
      colors={['#f13e4d', '#ff5130', '#ff512f']}
      style={styles.header}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => props.navigation.goBack()}>
        {Platform.OS === 'ios' ? (
          <Icon
            fill="white"
            style={{width: verticalScale(30), height: verticalScale(30)}}
            name="arrow-ios-back-outline"
          />
        ) : (
          <Icon
            fill="white"
            style={{width: verticalScale(30), height: verticalScale(30)}}
            name="arrow-back-outline"
          />
        )}
      </TouchableOpacity>
      <View style={styles.textView}>
        <Text numberOfLines={1} style={styles.headerText}>
          {title}
        </Text>
      </View>
    </LinearGradient>
  );
};
const style = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#2980b9',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    height: verticalScale(45),
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 10,
    elevation: 6,
    zIndex: 6,
    paddingHorizontal: scale(paddingSmall),
  },
  textView: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  },
  headerText: {
    alignSelf: 'center',
    fontSize: scale(fontSizeBig),
    fontWeight: 'bold',
    width: '65%',
    textAlign: 'center',
    color: 'white',
  },
  button: {
    justifyContent: 'center',
    elevation: 1,
    zIndex: 1,
  },
});

export default Header;
