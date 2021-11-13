import React from 'react';
import {scale, verticalScale} from 'react-native-size-matters';

import {StyleSheet, Text, View} from 'react-native';
import {TextInput} from 'react-native-element-textinput';

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
          inputStyle={{fontSize: scale(fontSizeBig), color: 'black'}}
          labelStyle={{fontSize: scale(fontSizeBig)}}
          placeholder="Enter OTP"
          keyboardType="numeric"
          placeholderTextColor="gray"
          autoFocus={true}
          focusColor="black"
          // textError={rollNo.length === 0 ? 'Please enter' : ''}
        />
        <View
          style={{
            height: verticalScale(30),
            alignContent: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: scale(12),
            }}>
            An OTP has been sent to your respective Webmail!
          </Text>
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
    marginHorizontal: paddingMedium,
    marginTop: paddingSmall,
    borderWidth: scale(1),
    height: verticalScale(55),
    paddingHorizontal: scale(8),
    borderRadius: scale(8),
  },
});

export default OTPScreen;
