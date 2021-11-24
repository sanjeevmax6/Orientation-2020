import React, {useEffect, useState} from 'react';
import {scale, verticalScale} from 'react-native-size-matters';

import {StyleSheet, Text, View, TouchableOpacity, Icon} from 'react-native';
import {TextInput} from 'react-native-element-textinput';

import LottieView from 'lottie-react-native';
import loginLottie from '../../assets/lottieFiles/signup.json';

import * as color from '../../utils/colors';

import {
  borderRadius,
  borderWidth,
  fontSizeBig,
  paddingMedium,
  paddingSmall,
} from '../../utils/UIConstants';
import Header from './header';
import Button from './button';
import {BackHandler} from 'react-native';
import {UserData} from '../../mobx/userStore';
import NetInfo from '@react-native-community/netinfo';
import {API_REGISTER} from '../../utils/APIConstants';
import axios from 'axios';
import {API_SCREEN_Store} from '../../mobx/apiCallScreenStore';
import * as KEYS from '../../utils/STORAGE_KEYS';
import * as ERRORS from '../../utils/ERROR_MESSAGES';

const PasswordScreen = ({index, setIndex, navigation, inputStates}) => {
  //disable back button once the user has verified email as he has to set password mandatorily
  const [error, setError] = useState('');

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
    if (inputStates.password1 == '' || inputStates.password2 == '') {
      API_SCREEN_Store.setErrorText(ERRORS.SIGN_UP_FILL_ALL);
      return false;
    } else if (inputStates.password1 != inputStates.password2) {
      API_SCREEN_Store.setErrorText(ERRORS.SIGN_UP_PASSWORD_NO_MATCH);
      return false;
    } else {
      return true;
    }
  }

  const nextHandler = () => {
    handleAPICALL();
    navigation.push('API_Loader');
  };
  //Validate
  //call API
  const handleAPICALL = () => {
    NetInfo.fetch().then(state => {
      if (state.isConnected == true) {
        if (validData()) {
          axios
            .post(
              API_REGISTER,
              {
                name: inputStates.Name,
                department: inputStates.dept,
                new_password: inputStates.password1,
                confirm_password: inputStates.password2,
              },
              {
                headers: {
                  //Remove hard coded
                  token: inputStates.token,
                },
              },
            )
            .then(response => {
              if (response.data.message == 'Success, User Registered') {
                UserData.setName(inputStates.Name);
                UserData.setDepartment(inputStates.department);
                //once the token is set it will go to DASHBOARD

                UserData.setToken(inputStates.token);
                AsyncStorage.setItem(KEYS.USER_TOKEN, inputStates.token);
              } else {
                console.log(response.data.message);
                API_SCREEN_Store.setErrorText(response.data.message);
                API_SCREEN_Store.setError();
                alert(response.data.message);
              }
            })
            .catch(error => {
              if (error.response) {
                API_SCREEN_Store.setErrorText(error.response.data.message);
              } else if (error.request) {
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
          value={inputStates.password1}
          onChangeText={npwd1 => {
            inputStates.setPassword1(npwd1);
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
          value={inputStates.password2}
          onChangeText={npwd2 => {
            inputStates.setPassword2(npwd2);
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
              }}>
              Set the password of your account
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
  },
  textInput: {
    marginHorizontal: paddingMedium,
    marginTop: paddingSmall,
    borderWidth: scale(1),
    height: verticalScale(55),
    paddingHorizontal: scale(8),
    borderRadius: scale(8),
  },
});

export default PasswordScreen;
