import React, {useState} from 'react';
import {scale, verticalScale} from 'react-native-size-matters';
import {observer} from 'mobx-react';
import {StyleSheet, Text, View, TouchableOpacity, Picker} from 'react-native';
import {TextInput} from 'react-native-element-textinput';
import {API_SCREEN_Store} from '../../mobx/apiCallScreenStore';
import LottieView from 'lottie-react-native';
import loginLottie from '../../assets/lottieFiles/signup.json';
import {API_SEND_OTP} from '../../utils/APIConstants';
import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';
import * as color from '../../utils/colors';
import * as ERRORS from '../../utils/ERROR_MESSAGES';
import DropDownPicker from 'react-native-dropdown-picker';

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
    const [error, setError] = useState('');

    const nextHandler = () => {
      handleAPICALL();
      console.log(error);
      // if (API_SCREEN_Store.errorText == '') {
      //setIndex(index + 1);
      //  }
      //else
      //navigation.push('API_Loader');
    };

    const [open, setOpen] = useState(false);
    const [department, setDepartment] = useState(null);
    const [items, setItems] = useState([
      {label: 'Civil', value: 'Civil'},
      {label: 'CSE', value: 'CSE'},
      {label: 'ECE', value: 'ECE'},
      {label: 'EEE', value: 'EEE'},
      {label: 'Mechanical', value: 'Mech'},
      {label: 'Instrumention & Control', value: 'ICE'},
      {label: 'Met', value: 'Met'},
      {label: 'Prodution', value: 'Prod'},
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

    const handleAPICALL = () => {
      NetInfo.fetch().then(state => {
        if (state.isConnected == true) {
          if (validData()) {
            console.log(inputStates.email);
            axios
              .post(API_SEND_OTP, {
                email: inputStates.email,
              })
              .then(response => {
                if (response.data.status == 'success') {
                  console.log('OTP sent from API');
                  setIndex(index + 1);
                } else {
                  API_SCREEN_Store.setErrorText(response.data.message);
                  API_SCREEN_Store.setError();
                  console.log(response.data.message);
                }
              })
              .catch(error => {
                if (error.response) {
                  API_SCREEN_Store.setErrorText(error.response.data.message);
                } else if (error.request) {
                  console.log(error.request);
                  API_SCREEN_Store.setErrorText(ERRORS.TIME_OUT);
                } else {
                  // Something happened in setting up the request that triggered an Error
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
          <Text style={styles.title}>{heading}</Text>

          <TextInput
            style={{
              marginHorizontal: paddingMedium,
              marginTop: paddingSmall,
              borderWidth: scale(1),
              height: verticalScale(55),
              fontFamily: FONT,
              paddingHorizontal: scale(8),
              borderRadius: scale(8),
            }}
            autoCapitalize="none"
            inputStyle={{fontSize: scale(fontSizeBig), color: 'black'}}
            labelStyle={{fontSize: scale(fontSizeBig)}}
            placeholder="Enter your Name!"
            keyboardType="Full Name"
            placeholderTextColor="gray"
            focusColor="black"
            value={inputStates.Name}
            onChangeText={username => {
              inputStates.setName(username);
            }}
            // textError={rollNo.length === 0 ? 'Please enter' : ''}
          />
          <View style={{marginRight: scale(36)}}>
            <DropDownPicker
              style={{
                marginHorizontal: paddingMedium,
                marginTop: paddingSmall,
                borderWidth: scale(1),
                height: verticalScale(55),
                paddingHorizontal: scale(8),
                borderRadius: scale(8),
                padding: scale(8),
              }}
              open={open}
              defaultValue={inputStates.dept}
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
              fontFamily: FONT,
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
