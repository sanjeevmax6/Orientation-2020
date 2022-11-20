import React, {useState} from 'react';
import {scale, verticalScale} from 'react-native-size-matters';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Keyboard,
  Image,
} from 'react-native';
import {TextInput} from 'react-native-element-textinput';

import LottieView from 'lottie-react-native';
import loginLottie from '../../assets/lottieFiles/login.json';
import {Icon} from '@ui-kitten/components';
import LinearGradient from 'react-native-linear-gradient';
import {lynxLoginAPICall} from '../lynxAuthScreen/lynxauthHandleAPI';

import {Black, Coral, White} from '../../utils/colors';
import {
  FONT,
  fontSizeBig,
  fontSizeVeryLarge,
  paddingMedium,
  paddingSmall,
} from '../../utils/UIConstants';
import {API_SCREEN_Store} from '../../mobx/apiCallScreenStore';
import OTPScreenlynx from '../lynxAuthScreen/otp';
import {observer} from 'mobx-react';
import LoaderPage from '../LoadingScreen';
import API_LoaderPage from '../apiCallScreen';
import ErrorScreen from '../../components/errorScreen';

const Login = observer(({navigation}) => {
  const [rollNo, setRollNo] = useState('');
  // const [password, setPassword] = useState('');

  const handleAPICall = () => {
    console.log(rollNo);
    API_SCREEN_Store.setRollNo(rollNo);
    lynxLoginAPICall(rollNo);
    // navigation.push('API_Loader');
  };

  return (
    <>
      {API_SCREEN_Store.getIsLoading ? (
        <API_LoaderPage navigation={navigation} />
      ) : (
        <>
          {API_SCREEN_Store.errorStatus ? (
            <ErrorScreen
              navigation="show"
              errorMessage={API_SCREEN_Store.errorText}
              //  useOnlyFn={true}
              fn={() => {
                navigation.push('Login', {screenType: 'LOGIN'});
                API_SCREEN_Store.reset();
              }}
            />
          ) : (
            <View>
              {API_SCREEN_Store.successStatus ? (
                <OTPScreenlynx navigation={navigation} />
              ) : (
                <ScrollView
                  style={{
                    height: verticalScale(310),
                    width: '100%',
                  }}
                  onScroll={() => {
                    Keyboard.dismiss();
                  }}>
                  <Text style={styles.title}>LOGIN</Text>
                  <TextInput
                    value={rollNo}
                    style={styles.input1}
                    inputStyle={styles.inputStyle}
                    labelStyle={styles.labelStyle}
                    keyboardType="number-pad"
                    // textErrorStyle={styles.textErrorStyle}
                    placeholder="Roll Number"
                    placeholderTextColor="gray"
                    onChangeText={text => {
                      setRollNo(text);
                    }}
                    focusColor="black"
                    maxLength={9}
                    // textError={rollNo.length === 0 ? 'Please enter' : ''}
                  />

                  {/* <TextInput
            value={password}
            style={styles.input1}
            inputStyle={styles.inputStyle}
            labelStyle={styles.labelStyle}
            // textErrorStyle={styles.textErrorStyle}
            placeholder="Password"
            placeholderTextColor="gray"
            onChangeText={text => {
              setPassword(text);
            }}
            secureTextEntry
            focusColor="black"
            autoCapitalize="none"
            // textError={rollNo.length === 0 ? 'Please enter' : ''}
          /> */}

                  <View
                    style={{
                      alignItems: 'flex-end',
                    }}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => {
                        API_SCREEN_Store.reset();
                        handleAPICall();
                      }}>
                      <Image
                        source={require('../../assets/images/lynxlogo.png')}
                        style={styles.logo}
                      />
                      <Text
                        style={{
                          color: White,
                          fontWeight: 'bold',
                          fontSize: scale(16),
                          fontFamily: FONT,
                          textAlign: 'center',
                          justifyContent: 'center',
                          alignSelf: 'center',
                          marginLeft: scale(25),
                        }}>
                        {' '}
                        Login with Lynx Auth
                      </Text>
                    </TouchableOpacity>
                  </View>
                </ScrollView>
              )}

              <View
                style={{
                  height: verticalScale(350),
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
          )}
        </>
      )}
    </>
  );
});

const styles = StyleSheet.create({
  input1: {
    marginHorizontal: paddingMedium,
    marginTop: paddingSmall,
    borderWidth: scale(1),
    height: verticalScale(55),
    paddingHorizontal: scale(8),
    borderRadius: scale(8),
    fontFamily: FONT,
  },
  inputStyle: {fontSize: scale(fontSizeBig), color: 'black', fontFamily: FONT},
  labelStyle: {fontSize: scale(fontSizeBig)},
  textErrorStyle: {fontSize: 16},
  title: {
    marginTop: verticalScale(paddingSmall),
    paddingVertical: scale(paddingSmall),
    color: Black,
    paddingLeft: scale(paddingMedium),
    fontSize: scale(fontSizeVeryLarge),
    fontWeight: 'bold',
    fontFamily: FONT,
  },
  button: {
    marginTop: verticalScale(100),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignSelf: 'center',
    backgroundColor: Coral,
    height: verticalScale(40),
    width: scale(280),
    borderRadius: scale(4),
  },
  logo: {
    width: scale(45),
    height: verticalScale(40),
    backgroundColor: 'white',
    borderWidth: scale(1.5),
    borderColor: Coral,
    borderRadius: scale(4),
  },
});

export default Login;
