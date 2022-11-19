import React, {useState} from 'react';
import {scale, verticalScale} from 'react-native-size-matters';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Keyboard,
  Platform,
} from 'react-native';
import {TextInput} from 'react-native-element-textinput';

import LottieView from 'lottie-react-native';
import loginLottie from '../../assets/lottieFiles/login.json';
import {Icon} from '@ui-kitten/components';
import LinearGradient from 'react-native-linear-gradient';
import {lynxLoginAPICall} from './lynxauthHandleAPI';

import {Black} from '../../utils/colors';
import {
  FONT,
  fontSizeBig,
  fontSizeVeryLarge,
  paddingMedium,
  paddingSmall,
} from '../../utils/UIConstants';
import {API_SCREEN_Store} from '../../mobx/apiCallScreenStore';
import OTPScreenlynx from './otp';
import {observer} from 'mobx-react';
import LoaderPage from '../LoadingScreen';
import API_LoaderPage from '../apiCallScreen';
import ErrorScreen from '../../components/errorScreen';

const LynxLogin = observer(({navigation}) => {
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
        <LoaderPage navigation={navigation}/>
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
                  <Text style={styles.title}>LYNX LOGIN</Text>
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
                    <LinearGradient
                      start={{x: 0.0, y: 0.25}}
                      end={{x: 0.5, y: 1.0}}
                      locations={[0, 0.6, 0.8]}
                      colors={['#f13e4d', '#ff5130', '#ff512f']}
                      style={{
                        backgroundColor: 'red',
                        height: verticalScale(40),
                        width: verticalScale(40),
                        borderRadius: verticalScale(20),
                        marginRight: scale(paddingMedium),
                        marginTop: verticalScale(20),
                      }}>
                      <TouchableOpacity onPress={() => handleAPICall()}>
                        <Icon
                          fill="white"
                          style={{
                            height: verticalScale(40),
                            width: verticalScale(40),
                            borderRadius: verticalScale(20),
                          }}
                          name="arrow-ios-forward-outline"
                        />
                      </TouchableOpacity>
                    </LinearGradient>
                  </View>
                </ScrollView>
              )}

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
});

export default LynxLogin;
