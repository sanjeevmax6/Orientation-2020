import React from 'react';
import {scale, verticalScale} from 'react-native-size-matters';
import {StyleSheet, Text, View} from 'react-native';
import {TextInput} from 'react-native-element-textinput';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
import {
  API_STUDENT_LYNX_OTP,
  API_VERIFY_OTP,
  SUBSCRIBE_NOTIFICATION,
} from '../../utils/APIConstants';
import axios from 'axios';
import Button from '../signUp/button';
import {API_SCREEN_Store} from '../../mobx/apiCallScreenStore';
import {Platform} from 'react-native';
import * as KEYS from '../../utils/STORAGE_KEYS';
import {observer} from 'mobx-react';
import {Coral, GRAY_LIGHT, Primary, Tertiary} from '../../utils/colors';

const OTPScreenlynx = observer(({navigation}) => {
  const backHandler = () => {
    // API_SCREEN_Store.setSuccess(false);
    navigation.push('Login', {screenType: 'LOGIN'});
    // navigation.push('LynxLogin', {screenType: 'LYNX LOGIN'})
    API_SCREEN_Store.reset();
  };

  const nextHandler = () => {
    handleAPI_CALL();
  };

  const instruction = {
    message:
      'Open your Lynx App -> Go to your profile -> \n Click on Spider Security/Lynx Authenticator-> Allow and copy the OTP',
  };

  const handleAPI_CALL = () => {
    var url = UserData.getBaseUrl + API_STUDENT_LYNX_OTP;
    var scrburl = UserData.getBaseUrl + SUBSCRIBE_NOTIFICATION;
    NetInfo.fetch().then(state => {
      if (state.isConnected === true) {
        console.log('logging In');
        API_SCREEN_Store.setIsLoading(true);
        var otp = API_SCREEN_Store.getOtp;
        var rollNo = API_SCREEN_Store.getRollNo;
        console.log(otp);
        console.log(url);
        if (otp.trim() === '') {
          API_SCREEN_Store.setErrorText(ERRORS.SIGN_UP_FILL_ALL);
          API_SCREEN_Store.setError(true);
          API_SCREEN_Store.setIsLoading(false);
        } else if (otp.replace(/[^0-9]/g, '').length !== 6) {
          API_SCREEN_Store.setErrorText(ERRORS.INVALID_OTP);
          API_SCREEN_Store.setError(true);
          API_SCREEN_Store.setIsLoading(false);
        } else {
          rollNo = Number.parseInt(rollNo, 10);
          otp = Number.parseInt(otp, 10);
          axios
            .post(url, {
              rollNo,
              otp,
            })
            .then(response => {
              if (response.status === 200) {
                if (Platform.OS === 'ios') {
                  console.log(response.data.token);
                  AsyncStorage.setItem(KEYS.USER_TOKEN, response.data.token);
                  AsyncStorage.setItem(KEYS.USER_NAME, response.data.name);
                  AsyncStorage.setItem(
                    KEYS.USER_ROLL_NO,
                    response.data.rollNo + '',
                  );
                  AsyncStorage.setItem(
                    KEYS.USER_DEPARTMENT,
                    response.data.department,
                  );
                  AsyncStorage.setItem(
                    KEYS.IS_USER_ADMIN,
                    response.data.isAdmin + '',
                  ); //Async can't handle bool or numbers

                  UserData.setName(response.data.name);
                  UserData.setDepartment(response.data.department);
                  UserData.setRollNo(response.data.rollNo + '');
                  UserData.setAdmin(response.data.isAdmin);
                  //once the token is set it will go to DASHBOARD
                  UserData.setToken(response.data.token); // only token is coming in response as of now
                } else {
                  console.log('Subscribing');
                  console.log(response.data.token);
                  console.log('firebase token ' + UserData.getFireBaseToken);
                  axios
                    .post(
                      scrburl,
                      {},
                      {
                        headers: {
                          firebaseToken: UserData.getFireBaseToken,
                          token: response.data.token,
                        },
                      },
                    )
                    .then(subscribe => {
                      if (subscribe.status === 200) {
                        console.log(subscribe.data.message + ' hello');
                        AsyncStorage.setItem(
                          KEYS.USER_TOKEN,
                          response.data.token,
                        );
                        AsyncStorage.setItem(
                          KEYS.USER_NAME,
                          response.data.name,
                        );
                        AsyncStorage.setItem(
                          KEYS.USER_ROLL_NO,
                          response.data.rollNo + '',
                        );
                        AsyncStorage.setItem(
                          KEYS.USER_DEPARTMENT,
                          response.data.department,
                        );
                        AsyncStorage.setItem(
                          KEYS.IS_USER_ADMIN,
                          response.data.isAdmin + '',
                        ); //Async can't handle bool or numbers

                        UserData.setName(response.data.name);
                        UserData.setDepartment(response.data.department);
                        UserData.setRollNo(response.data.rollNo + '');
                        UserData.setAdmin(response.data.isAdmin);
                        //once the token is set it will go to DASHBOARD

                        UserData.setToken(response.data.token);

                        // only token is coming in response as of now
                      } else {
                        API_SCREEN_Store.setErrorText(ERRORS.UNEXPECTED);
                        API_SCREEN_Store.setError(true);
                        API_SCREEN_Store.setIsLoading(false);
                      }
                    })
                    .catch(error => {
                      if (error.response) {
                        // The request was made and the server responded with a status code
                        // that falls out of the range of 2xx

                        API_SCREEN_Store.setErrorText(ERRORS.UNEXPECTED);
                      } else if (error.request) {
                        // The request was made but no response was received
                        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                        // http.ClientRequest in node.js

                        API_SCREEN_Store.setErrorText(ERRORS.TIME_OUT);
                      } else {
                        // Something happened in setting up the request that triggered an Error
                        API_SCREEN_Store.setErrorText(ERRORS.UNEXPECTED);
                      }

                      API_SCREEN_Store.setError(true);
                      API_SCREEN_Store.setIsLoading(false);
                    });
                }

                API_SCREEN_Store.setError(false);
                // API_SCREEN_Store.setIsLoading(false);
              }
            })
            .catch(error => {
              if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if(error.response.status === 400 ) {
                  API_SCREEN_Store.setErrorText(ERRORS.INVALID_OTP);
                } else { 
                API_SCREEN_Store.setErrorText(error.response.data.message);
                }
              } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                API_SCREEN_Store.setErrorText(ERRORS.TIME_OUT);
              } else {
                // Something happened in setting up the request that triggered an Error
                API_SCREEN_Store.setErrorText(ERRORS.UNEXPECTED);
              }

              API_SCREEN_Store.setError(true);
              API_SCREEN_Store.setIsLoading(false);
            });
        }
      } else {
        API_SCREEN_Store.setIsLoading(false);
        API_SCREEN_Store.setError(true);
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
          value={SIGN_UP_STORE.getOTP}
          onChangeText={OTP => {
            API_SCREEN_Store.setOtp(OTP);
          }}
          // textError={rollNo.length === 0 ? 'Please enter' : ''}
        />
        <View
          style={{
            height: verticalScale(50),
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
          <Text
            style={{
              textAlign: 'center',
              fontSize: scale(11),
              fontFamily: FONT,
              color: Coral,
            }}>
            {instruction.message}
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
});

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
