import React, {useState} from 'react';
import {scale, verticalScale} from 'react-native-size-matters';
import {API_SCREEN_Store} from '../../mobx/apiCallScreenStore';
import {StyleSheet, Text, View} from 'react-native';
import {TextInput} from 'react-native-element-textinput';

import LottieView from 'lottie-react-native';
import loginLottie from '../../assets/lottieFiles/signup.json';

import Button from './button';
import {Black} from '../../utils/colors';
import Header from './header';
import * as ERRORS from '../../utils/ERROR_MESSAGES';

import {
  borderRadius,
  borderWidth,
  fontSizeBig,
  paddingMedium,
  paddingSmall,
} from '../../utils/UIConstants';
import NetInfo from '@react-native-community/netinfo';
import {API_VERIFY_OTP} from '../../utils/APIConstants';
import axios from 'axios';

const OTPScreen = ({index, setIndex, navigation, inputStates}) => {
  const backHandler = () => {
    setIndex(index - 1);
  };
  const [error, setError] = useState('');
  const nextHandler = () => {
    handleAPICALL();
    console.log(API_SCREEN_Store.errorText);
    // if (API_SCREEN_Store.errorText == '') {
    // setIndex(index + 1);
    //  } //else navigation.push('API_Loader');
  };

  React.useEffect(() => {
    if (inputStates.token != '') {
      console.log(inputStates.token);
      setIndex(index + 1);
    }
  }, [inputStates.token]);

  function validData() {
    if (inputStates.otp == '') {
      return false;
    } else {
      return true;
    }
  }

  const handleAPICALL = () => {
    NetInfo.fetch().then(state => {
      if (state.isConnected == true) {
        if (validData()) {
          axios
            .post(API_VERIFY_OTP, {
              email: inputStates.email,
              otp: inputStates.otp,
            })
            .then(response => {
              if (response.data.status == 'success') {
                // console.log(JSON.stringify(response));
                inputStates.setToken(response.data.token);
              } else {
                API_SCREEN_Store.setErrorText(response.data.message);
                API_SCREEN_Store.setError();
                alert(response.data.message);
              }
            })
            .catch(error => {
              if (error.response) {
                console.log(error.response.data.message);
                API_SCREEN_Store.setErrorText(error.response.data.message);
                //  setIndex(index + 1); //remove after testing
              } else if (error.request) {
                console.log(error.request);
                API_SCREEN_Store.setErrorText(ERRORS.TIME_OUT);
              } else {
                API_SCREEN_Store.setErrorText(ERRORS.UNEXPECTED);
              }
              API_SCREEN_Store.setError();
            });
        } else {
          API_SCREEN_Store.setErrorText(ERRORS.SIGN_UP_FILL_ALL);
          API_SCREEN_Store.setError();
        }
      } else {
        API_SCREEN_Store.setError();
        API_SCREEN_Store.setErrorText(ERRORS.NO_NETWORK);
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
          value={inputStates.otp}
          onChangeText={OTP => {
            inputStates.setOtp(OTP);
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
