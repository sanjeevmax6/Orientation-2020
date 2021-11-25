import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';

import {Icon} from '@ui-kitten/components';
import {FONT, fontSizeVeryLarge, paddingSmall} from '../../utils/UIConstants';

const Header = ({backHandler, title = 'HEADER', showBackIcon = true}) => {
  return (
    <View style={styles.header}>
      {showBackIcon ? (
        <TouchableOpacity style={styles.button} onPress={() => backHandler()}>
          {Platform.OS === 'ios' ? (
            <Icon
              fill="white"
              style={{width: verticalScale(30), height: verticalScale(30)}}
              name="arrow-ios-back-outline"
            />
          ) : (
            <Icon
              fill="red"
              style={{width: verticalScale(30), height: verticalScale(30)}}
              name="arrow-back-outline"
            />
          )}
        </TouchableOpacity>
      ) : (
        <></>
      )}

      <View style={styles.textView}>
        <Text numberOfLines={1} style={styles.headerText}>
          {title}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    height: verticalScale(45),
    backgroundColor: 'transparent',
    paddingHorizontal: scale(paddingSmall),
    marginTop: verticalScale(paddingSmall),
    paddingVertical: scale(paddingSmall),
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
    fontSize: scale(fontSizeVeryLarge),
    fontWeight: 'bold',
    width: '65%',
    textAlign: 'center',
    color: 'black',
    fontFamily: FONT,
  },
  button: {
    justifyContent: 'center',
    elevation: 1,
    zIndex: 1,
  },
});

export default Header;
