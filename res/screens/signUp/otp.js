import React from 'react';
import {scale, verticalScale} from 'react-native-size-matters';

import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';

import LottieView from 'lottie-react-native';
import loginLottie from '../../assets/lottieFiles/signup.json';

import Button from './button';
import {Black} from '../../utils/colors';
import Header from './header';

import {
  borderRadius,
  borderWidth,
  fontSizeBig,
  paddingMedium,
  paddingSmall,
} from '../../utils/UIConstants';

const OTPScreen = ({index, setIndex, navigation}) => {
  const backHandler = () => {
    setIndex(index - 1);
  };
  const nextHandler = () => {
    setIndex(index + 1);
  };
  return (
    <View>
      <View
        style={{
          height: verticalScale(310),
          width: '100%',
        }}>
        <Header title="Enter your OTP" backHandler={backHandler} />
        <TextInput
          style={styles.textInput}
          placeholder={'Enter OTP'}
          autoFocus={true}
          keyboardType="numeric"
        />
        <View
          style={{
            height: verticalScale(30),
            alignContent: 'center',
            justifyContent: 'center',
          }}>
          <TouchableOpacity onPress={() => navigation.push('Login')}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: scale(12),
              }}>
              An OTP has been sent to your respective Webmail!
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            alignItems: 'flex-end',
          }}>
          <Button pressHandler={nextHandler} />
        </View>
      </View>
      <View
        style={{
          height: verticalScale(390),
          width: '100%',
          alignSelf: 'center',
          justifyContent: 'center',
        }}>
        <LottieView
          source={loginLottie}
          progress={1}
          autoSize={false}
          resizeMode="contain"
          autoPlay
          loop
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    marginTop: verticalScale(paddingSmall),
    marginHorizontal: scale(paddingMedium),
    fontSize: scale(fontSizeBig),
    alignItems: 'center',
    borderWidth: borderWidth,
    borderRadius: borderRadius,
    color: Black,
  },
});

export default OTPScreen;
