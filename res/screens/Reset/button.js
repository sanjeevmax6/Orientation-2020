import React from 'react';
import {TouchableOpacity} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import LinearGradient from 'react-native-linear-gradient';

import {Icon} from '@ui-kitten/components';
import {paddingMedium} from '../../utils/UIConstants';

const Button = ({pressHandler}) => {
  return (
    <TouchableOpacity onPress={() => pressHandler()}>
      <LinearGradient
        start={{x: 0.0, y: 0.25}}
        end={{x: 0.5, y: 1.0}}
        locations={[0, 0.6, 0.8]}
        colors={['#f13e4d', '#ff5130', '#ff512f']}
        style={{
          backgroundColor: 'red',
          height: verticalScale(40),
          width: verticalScale(40),
          borderRadius: verticalScale(20),
          marginRight: scale(paddingMedium),
        }}>
        <Icon
          fill="white"
          style={{
            height: verticalScale(40),
            width: verticalScale(40),
            borderRadius: verticalScale(20),
          }}
          name="arrow-ios-forward-outline"
        />
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default Button;
