import React, {useEffect} from 'react';
import {scale, verticalScale} from 'react-native-size-matters';

import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {TextInput} from 'react-native-element-textinput';

import LottieView from 'lottie-react-native';
import loginLottie from '../../assets/lottieFiles/signup.json';

import * as color from '../../utils/colors';

import {
  FONT,
  fontSizeBig,
  paddingMedium,
  paddingSmall,
} from '../../utils/UIConstants';
import Header from './header';
import Button from './button';
import {BackHandler} from 'react-native';
import {UserData} from '../../mobx/userStore';
import NetInfo from '@react-native-community/netinfo';
import {API_RESET} from '../../utils/APIConstants';
import axios from 'axios';
import {API_SCREEN_Store} from '../../mobx/apiCallScreenStore';
import * as KEYS from '../../utils/STORAGE_KEYS';
import * as ERRORS from '../../utils/ERROR_MESSAGES';
import {SIGN_UP_STORE} from '../../mobx/signUpStore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PasswordScreen = ({index, setIndex, navigation}) => {
  //disable back button once the user has verified email as he has to set password mandatorily
  function handleBackButtonClick() {
    return true;
  }
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);

  const backHandler = () => {
    setIndex(index - 1);
  };

  function validData() {
    console.log(SIGN_UP_STORE.getPassword, SIGN_UP_STORE.getConfirmPassword);
    if (SIGN_UP_STORE.getPassword !== SIGN_UP_STORE.getConfirmPassword) {
      SIGN_UP_STORE.setErrorText(ERRORS.SIGN_UP_PASSWORD_NO_MATCH);
      return false;
    }
    if (
      SIGN_UP_STORE.getPassword === '' ||
      SIGN_UP_STORE.getConfirmPassword === ''
    ) {
      SIGN_UP_STORE.setErrorText(ERRORS.SIGN_UP_FILL_ALL);
      return false;
    } else {
      return true;
    }
  }

  const nextHandler = () => {
    SIGN_UP_STORE.setDoingApiCall(true);
    handleAPI_CALL();
  };
  //Validate
  //call API

  const handleAPI_CALL = () => {
    var url = UserData.getBaseUrl + API_RESET;
    NetInfo.fetch().then(state => {
      if (state.isConnected === true) {
        if (validData()) {
          axios
            .put(
              url,
              {
                new_password: SIGN_UP_STORE.getPassword,
                confirm_password: SIGN_UP_STORE.getConfirmPassword,
              },
              {
                headers: {
                  token: SIGN_UP_STORE.getToken,
                },
              },
            )
            .then(response => {
              if (response.status === 200) {
                console.log(response.data.message);
                SIGN_UP_STORE.setDoingApiCall(false);
                SIGN_UP_STORE.setFailState(false);
                SIGN_UP_STORE.setErrorText('');
                SIGN_UP_STORE.setDepartment('Select your Department');
                SIGN_UP_STORE.setEmail('');
                SIGN_UP_STORE.setName('');
                SIGN_UP_STORE.setPassword('');
                SIGN_UP_STORE.setConfirmPassword('');
                SIGN_UP_STORE.setOTP('');
                SIGN_UP_STORE.setToken('');
                SIGN_UP_STORE.setSuccessState(true);
              } else {
                console.log('error1: ');

                console.log(response.data.message);

                SIGN_UP_STORE.setErrorText(response.data.message);
                SIGN_UP_STORE.setFailState(true);
                SIGN_UP_STORE.setDoingApiCall(false);
              }
            })
            .catch(error => {
              console.log('error2: ');
              console.log(error);
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
          console.log('error3: ' + ERRORS.SIGN_UP_FILL_ALL);

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
        <Header
          title="Set your Password"
          backHandler={backHandler}
          showBackIcon={false}
        />

        <TextInput
          style={styles.textInput}
          inputStyle={{fontSize: scale(fontSizeBig), color: 'black'}}
          labelStyle={{fontSize: scale(fontSizeBig)}}
          placeholder="Enter Your Password"
          autoFocus={true}
          secureTextEntry
          placeholderTextColor="gray"
          focusColor="black"
          autoCapitalize="none"
          value={SIGN_UP_STORE.getPassword}
          onChangeText={password => {
            SIGN_UP_STORE.setPassword(password);
          }}
          // textError={rollNo.length === 0 ? 'Please enter' : ''}
        />
        <TextInput
          style={styles.textInput}
          inputStyle={{fontSize: scale(fontSizeBig), color: 'black'}}
          labelStyle={{fontSize: scale(fontSizeBig)}}
          placeholder="Confirm Your Password"
          placeholderTextColor="gray"
          focusColor="black"
          autoCapitalize="none"
          secureTextEntry
          value={SIGN_UP_STORE.getConfirmPassword}
          onChangeText={confirmPassword => {
            SIGN_UP_STORE.setConfirmPassword(confirmPassword);
          }}
          // textError={rollNo.length === 0 ? 'Please enter' : ''}
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
                fontFamily: FONT,
              }}>
              Reset the password of your account
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
  container: {
    flexDirection: 'row',
    marginTop: verticalScale(5),
    alignSelf: 'flex-start',
    alignItems: 'center',
  },
  errorText: {
    color: color.Tertiary,
    marginLeft: scale(5),
    fontFamily: FONT,
  },
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

export default PasswordScreen;
