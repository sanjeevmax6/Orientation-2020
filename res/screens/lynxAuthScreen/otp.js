import React from 'react';
import {scale, verticalScale} from 'react-native-size-matters';
import {StyleSheet, Text, View} from 'react-native';
import {TextInput} from 'react-native-element-textinput';

import LottieView from 'lottie-react-native';
import loginLottie from '../../assets/lottieFiles/signup.json';
import {UserData} from '../../mobx/userStore';

import Header from '../signUp/header';
import * as ERRORS from '../../utils/ERROR_MESSAGES';
import {SIGN_UP_STORE} from '../../mobx/signUpStore';

import {
  FONT,
  fontSizeBig,
  paddingMedium,
  paddingSmall,
} from '../../utils/UIConstants';
import NetInfo from '@react-native-community/netinfo';
import {API_VERIFY_OTP} from '../../utils/APIConstants';
import axios from 'axios';
import Button from '../signUp/button';

const OTPScreenlynx = () => {
  const backHandler = () => {
    
  };

  const nextHandler = () => {
    SIGN_UP_STORE.setDoingApiCall(true);
    handleAPI_CALL();
  };

  React.useEffect(() => {
    if (SIGN_UP_STORE.getToken != '') {
      console.log(SIGN_UP_STORE.getToken);
    }
  }, [SIGN_UP_STORE.getToken]);

  function validData() {
    if (SIGN_UP_STORE.getOTP == '') {
      return false;
    } else {
      return true;
    }
  }
  const maskEmail = email => {
    let rollLength = email.length;
    email = email + '@nitt.edu';
    let length = email.length;
    let temp = 'x'.repeat(rollLength) + '@nitt.edu';
    let x = length / 4;
    let masked = email.slice(0, x) + temp.slice(x);
    return masked;
  };

  const handleAPI_CALL = () => {
    var url = UserData.getBaseUrl + API_VERIFY_OTP;
    NetInfo.fetch().then(state => {
      if (state.isConnected == true) {
        if (validData()) {
          axios
            .post(url, {
              email: SIGN_UP_STORE.getEmail + '@nitt.edu',
              otp: SIGN_UP_STORE.getOTP,
            })
            .then(response => {
              if (response.status === 200) {
                SIGN_UP_STORE.setToken(response.data.token);
                setIndex(index + 1);
              } else {
                SIGN_UP_STORE.setErrorText(response.data.message);
                SIGN_UP_STORE.setFailState(true);
              }
              SIGN_UP_STORE.setDoingApiCall(false);
            })
            .catch(error => {
              if (error.response) {
                SIGN_UP_STORE.setErrorText(error.response.data.message);
              } else if (error.request) {
                SIGN_UP_STORE.setErrorText(ERRORS.TIME_OUT);
              } else {
                SIGN_UP_STORE.setErrorText(ERRORS.UNEXPECTED);
              }
              SIGN_UP_STORE.setFailState(true);
              SIGN_UP_STORE.setDoingApiCall(false);
            });
        } else {
          SIGN_UP_STORE.setErrorText(ERRORS.SIGN_UP_FILL_ALL);

          SIGN_UP_STORE.setFailState(true);
          SIGN_UP_STORE.setDoingApiCall(false);
        }
      } else {
        SIGN_UP_STORE.setErrorText(ERRORS.NO_NETWORK);

        SIGN_UP_STORE.setFailState(true);
        SIGN_UP_STORE.setDoingApiCall(false);
      }
    });
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
          value={SIGN_UP_STORE.getOTP}
          onChangeText={OTP => {
            SIGN_UP_STORE.setOTP(OTP);
          }}
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
              fontFamily: FONT,
            }}>
            An OTP has been sent to your Lynx app.
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
    fontFamily: FONT,
  },
});

export default OTPScreenlynx;
