import React from 'react';
import {scale, verticalScale} from 'react-native-size-matters';

import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {TextInput} from 'react-native-element-textinput';

import LottieView from 'lottie-react-native';
import loginLottie from '../../assets/lottieFiles/signup.json';

import {Black} from '../../utils/colors';
import {
  borderRadius,
  borderWidth,
  fontSizeBig,
  fontSizeVeryLarge,
  paddingMedium,
  paddingSmall,
} from '../../utils/UIConstants';
import Button from './button';

const EmailScreen = ({index, setIndex, navigation, heading = 'SIGN UP'}) => {
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
        <Text style={styles.title}>{heading}</Text>

        <TextInput
          style={{
            marginHorizontal: paddingMedium,
            marginTop: paddingSmall,
            borderWidth: scale(1),
            height: verticalScale(55),
            paddingHorizontal: scale(8),
            borderRadius: scale(8),
          }}
          autoCapitalize="none"
          inputStyle={{fontSize: scale(fontSizeBig), color: 'black'}}
          labelStyle={{fontSize: scale(fontSizeBig)}}
          placeholder="Enter your Webmail!"
          keyboardType="email-address"
          placeholderTextColor="gray"
          focusColor="black"
          // textError={rollNo.length === 0 ? 'Please enter' : ''}
        />

        {heading === 'RESET PASSWORD' ? (
          <View
            style={{
              height: verticalScale(15),
              alignContent: 'center',
              justifyContent: 'center',
            }}
          />
        ) : (
          <>
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
                  Already have an account?
                  <Text
                    style={{
                      color: '#f13e4d',
                      fontWeight: 'bold',
                      fontSize: scale(14),
                    }}>
                    {' '}
                    LOG IN!
                  </Text>
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}

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

  title: {
    marginTop: verticalScale(paddingSmall),
    paddingVertical: scale(paddingSmall),
    color: Black,
    paddingLeft: scale(paddingMedium),
    fontSize: scale(fontSizeVeryLarge),
    fontWeight: 'bold',
  },
});

export default EmailScreen;
