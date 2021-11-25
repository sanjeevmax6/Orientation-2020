import React, {Suspense, useState} from 'react';
import {scale, verticalScale} from 'react-native-size-matters';
import {observer} from 'mobx-react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';
import {TextInput} from 'react-native-element-textinput';

import LottieView from 'lottie-react-native';
import loginLottie from '../../assets/lottieFiles/signup.json';
import {API_SEND_OTP} from '../../utils/APIConstants';
import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';
import * as color from '../../utils/colors';
import * as ERRORS from '../../utils/ERROR_MESSAGES';

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
  ({index, setIndex, navigation, heading = 'SIGN UP'}) => {
    const nextHandler = () => {
      SIGN_UP_STORE.setDoingApiCall(true);
      handleAPI_CALL();
    };

    const [ModalVisibility, setModalVisibility] = useState(false);

    const DATA = [
      {key: 'Architecture'},
      {key: 'Chemical Engineering'},
      {key: 'Civil Engineering'},
      {key: 'Computer Science and Engineering'},
      {key: 'Electrical and Electronics Engineering'},
      {key: 'Electronics and Communication Engineering'},
      {key: 'Instrumentation and Control Engineering'},
      {key: 'Mechanical Engineering'},
      {key: 'Metallurgical and Materials Engineering'},
      {key: 'Production Engineering'},
    ];

    function validData() {
      if (
        SIGN_UP_STORE.getName === '' ||
        SIGN_UP_STORE.getDepartment === '' ||
        SIGN_UP_STORE.getEmail === ''
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
                email: SIGN_UP_STORE.getEmail + '@nitt.edu',
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

    const ListHeaderComponent = () => {
      return <View style={{height: verticalScale(12)}} />;
    };
    return (
      <View>
        <Modal
          visible={ModalVisibility}
          animationType="fade"
          transparent={true}
          onRequestClose={() => {
            setModalVisibility(false);
          }}>
          <View
            style={{
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(204, 198, 204, 0.8)',
            }}>
            <View
              style={{
                width: '90%',
                height: '80%',
                backgroundColor: 'white',
                borderRadius: scale(10),
              }}>
              <FlatList
                data={DATA}
                ListHeaderComponent={ListHeaderComponent}
                keyExtractor={item => item.key}
                renderItem={({item}) => (
                  <TouchableOpacity
                    onPress={() => {
                      SIGN_UP_STORE.setDepartment(item.key);
                      setModalVisibility(false);
                    }}>
                    <Text
                      numberOfLines={1}
                      style={{
                        margin: 10,
                        padding: 5,
                        fontFamily: FONT,
                        fontSize: scale(16),
                        color: 'grey',
                        borderColor: 'black',
                        borderRadius: 10,
                        borderWidth: scale(1),
                      }}>
                      {item.key}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </Modal>
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
            inputStyle={{
              fontSize: scale(fontSizeBig),
              color: 'black',
              fontFamily: FONT,
            }}
            labelStyle={{fontSize: scale(fontSizeBig)}}
            placeholder="Enter your Name"
            placeholderTextColor="gray"
            focusColor="black"
            value={SIGN_UP_STORE.getName}
            onChangeText={username => {
              SIGN_UP_STORE.setName(username);
            }}
          />

          <TouchableOpacity
            onPress={() => {
              setModalVisibility(true);
            }}
            style={{
              marginHorizontal: paddingMedium,
              marginTop: paddingSmall,
              borderWidth: scale(1),
              height: verticalScale(55),

              paddingHorizontal: scale(8),
              borderRadius: scale(8),

              justifyContent: 'center',
            }}>
            <Text
              numberOfLines={1}
              style={{
                fontFamily: FONT,
                fontSize: scale(16),
                color: 'grey',
              }}>
              {SIGN_UP_STORE.getDepartment}
            </Text>
          </TouchableOpacity>
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
            inputStyle={{
              fontSize: scale(fontSizeBig),
              color: 'black',
              fontFamily: FONT,
            }}
            labelStyle={{fontSize: scale(fontSizeBig), fontFamily: FONT}}
            placeholder="Enter your Roll Number"
            keyboardType="number-pad"
            placeholderTextColor="gray"
            focusColor="black"
            value={SIGN_UP_STORE.getEmail}
            onChangeText={emailId => {
              SIGN_UP_STORE.setEmail(emailId);
            }}
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
