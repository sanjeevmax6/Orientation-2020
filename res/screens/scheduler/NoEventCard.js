import React from 'react';
import {Dimensions, Text, View} from 'react-native';
import * as colors from '../../utils/colors';
import {scale} from 'react-native-size-matters';
import {fontSizeBig} from '../../utils/UIConstants';
const NoEventCard = () => {
  return (
    <View
      style={{
        flex: 1,
        width: '100%',
        height: '100%',
        paddingTop: Dimensions.get('window').height * (3 / 8),
        paddingBottom: Dimensions.get('window').height * 0.3,
      }}>
      <Text
        style={{
          alignSelf: 'center',
          textAlignVertical: 'center',
          color: colors.Primary,
          fontSize: scale(fontSizeBig),
        }}>
        No events scheduled
      </Text>
    </View>
  );
};

export default NoEventCard;
