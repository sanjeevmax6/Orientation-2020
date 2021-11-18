import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import LottieView from 'lottie-react-native';
import errorLottie from '../../assets/lottieFiles/error.json';
import LinearGradient from 'react-native-linear-gradient';
import {Icon} from '@ui-kitten/components';

import {scale, verticalScale} from 'react-native-size-matters';

const ErrorScreen = ({
  navigation,
  errorMessage = 'This is a test error message',
}) => {
  const backPress = () => {
    navigation.goBack();
  };
  return (
    <View
      style={{
        height: '100%',
        width: '100%',
        backgroundColor: 'white',
      }}>
      <LottieView
        source={errorLottie}
        style={{position: 'absolute', top: 0, height: verticalScale(350)}}
        speed={0.95}
        resizeMode="contain"
        autoPlay
        loop
      />
      <View
        style={{
          marginTop: verticalScale(350),
          justifyContent: 'space-between',
          alignSelf: 'center',
          alignItems: 'center',
          alignContent: 'center',
          flex: 1,
        }}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: scale(18),
            marginHorizontal: scale(12),
            textTransform: 'uppercase',
            fontWeight: '500',
          }}>
          {errorMessage}
        </Text>

        <LinearGradient
          start={{x: 0.0, y: 0.25}}
          end={{x: 0.5, y: 1.0}}
          locations={[0, 0.6, 0.8]}
          colors={['#f13e4d', '#ff5130', '#ff512f']}
          style={{
            backgroundColor: 'green',
            padding: scale(9),
            paddingRight: scale(18),
            marginTop: verticalScale(10),
            borderRadius: scale(24),
            marginBottom: verticalScale(28),
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
            onPress={backPress}>
            <Icon
              fill="white"
              style={{
                height: verticalScale(30),
                width: verticalScale(30),
                borderRadius: verticalScale(20),
              }}
              name="arrow-ios-back-outline"
            />
            <Text
              style={{
                fontSize: scale(18),
                color: 'white',
                fontWeight: 'bold',
              }}>
              GO BACK
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </View>
  );
};

export default ErrorScreen;
