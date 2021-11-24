import React, {useState} from 'react';
import {scale, verticalScale} from 'react-native-size-matters';
import {observer} from 'mobx-react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {TextInput} from 'react-native-element-textinput';

import LottieView from 'lottie-react-native';
import loginLottie from '../../assets/lottieFiles/signup.json';
import {API_SEND_OTP} from '../../utils/APIConstants';
import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';
import * as color from '../../utils/colors';
import * as ERRORS from '../../utils/ERROR_MESSAGES';
import DropDownPicker from 'react-native-dropdown-picker';
import {SIGN_UP_STORE} from '../../mobx/signUpStore';

import {
  borderRadius,
  borderWidth,
  FONT,
  fontSizeBig,
  fontSizeVeryLarge,
  paddingMedium,
  paddingSmall,
} from '../../utils/UIConstants';
import Button from './button';

const EmailScreen = observer(
  ({index, setIndex, navigation, heading = 'SIGN UP', inputStates}) => {
    const nextHandler = () => {
      SIGN_UP_STORE.setDoingApiCall(true);
      handleAPI_CALL();
    };

    const [open, setOpen] = useState(false);
    const [department, setDepartment] = useState(null);
    const [items, setItems] = useState([
      {label: 'Civil', value: 'Civil'},
      {label: 'CSE', value: 'CSE'},
      {label: 'ECE', value: 'ECE'},
      {label: 'EEE', value: 'EEE'},
      {label: 'Mechanical', value: 'Mech'},
      {label: 'Instrumentation & Control', value: 'ICE'},
      {label: 'Metallurgy', value: 'Metallurgy'},
      {label: 'Production', value: 'Prod'},
      {label: 'Chemical', value: 'Chem'},
    ]);

    function validData() {
      inputStates.setDept({...inputStates.dept, department});

      if (
        inputStates.Name == '' ||
        inputStates.dept == '' ||
        inputStates.email == ''
      ) {
        return false;
      } else {
        return true;
      }
    }

    const handleAPI_CALL = () => {
      NetInfo.fetch().then(state => {
        if (state.isConnected == true) {
          if (validData()) {
            axios
              .post(API_SEND_OTP, {
                email: inputStates.email,
              })
              .then(response => {
                if (response.data.status === 'success') {
                  console.log('OTP sent from API');
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
                  // Something happened in setting up the request that triggered an Error
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
          <Text style={styles.title}>{heading}</Text>

          <TextInput
            style={{
              marginHorizontal: paddingMedium,
              marginTop: paddingSmall,
              borderWidth: scale(1),
              height: verticalScale(55),
              fontFamily: 'sans-serif-light',
              paddingHorizontal: scale(8),
              borderRadius: scale(8),
            }}
            autoCapitalize="none"
            inputStyle={{fontSize: scale(fontSizeBig), color: 'black'}}
            labelStyle={{fontSize: scale(fontSizeBig)}}
            placeholder="Enter your Name!"
            placeholderTextColor="gray"
            focusColor="black"
            value={inputStates.Name}
            onChangeText={username => {
              inputStates.setName(username);
            }}
          />
          <View style={{marginRight: scale(36)}}>
            <DropDownPicker
              translation={{
                PLACEHOLDER: 'Select your Department',
              }}
              placeholderStyle={{
                color: 'grey',
                fontFamily: 'sans-serif-light',
                fontWeight: 'bold',
              }}
              style={{
                marginHorizontal: paddingMedium,
                marginTop: paddingSmall,
                borderWidth: scale(1),
                height: verticalScale(55),
                paddingHorizontal: scale(8),
                borderRadius: scale(8),
                backgroundColor: '#f2f2f2',
                padding: scale(8),
              }}
              dropDownContainerStyle={{
                backgroundColor: '#f2f2f2',
                marginHorizontal: paddingMedium,
                fontSize: 1,
              }}
              listItemLabelStyle={{
                fontStyle: 'normal',
                fontWeight: 'bold',
                fontFamily: 'sans-serif-light',
                fontSize: scale(14),
              }}
              selectedItemLabelStyle={{
                color: 'grey',
                fontFamily: 'sans-serif-light',
                fontWeight: 'bold',
              }}
              open={open}
              defaultValue={'CSE'}
              value={department}
              items={items}
              setOpen={setOpen}
              setValue={setDepartment}
              setItems={setItems}
            />
          </View>

          <TextInput
            style={{
              marginHorizontal: paddingMedium,
              marginTop: paddingSmall,
              borderWidth: scale(1),
              height: verticalScale(55),
              paddingHorizontal: scale(8),
              fontFamily: 'sans-serif-light',
              borderRadius: scale(8),
            }}
            autoCapitalize="none"
            inputStyle={{fontSize: scale(fontSizeBig), color: 'black'}}
            labelStyle={{fontSize: scale(fontSizeBig)}}
            placeholder="Enter your Webmail!"
            keyboardType="email-address"
            placeholderTextColor="gray"
            focusColor="black"
            value={inputStates.email}
            onChangeText={emailid => {
              inputStates.setEmail(emailid);
            }}
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
                      fontFamily: FONT,
                    }}>
                    Already have an account?
                    <Text
                      style={{
                        color: '#f13e4d',
                        fontWeight: 'bold',
                        fontSize: scale(14),
                        fontFamily: FONT,
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
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: 'center',
  },
  textInput: {
    marginTop: verticalScale(paddingSmall),
    marginHorizontal: scale(paddingMedium),
    fontSize: scale(fontSizeBig),
    alignItems: 'center',
    borderWidth: borderWidth,
    borderRadius: borderRadius,
    color: color.Black,
  },

  title: {
    marginTop: verticalScale(paddingSmall),
    paddingVertical: scale(paddingSmall),
    color: color.Black,
    paddingLeft: scale(paddingMedium),
    fontSize: scale(fontSizeVeryLarge),
    fontWeight: 'bold',
    fontFamily: FONT,
  },
});

export default EmailScreen;
