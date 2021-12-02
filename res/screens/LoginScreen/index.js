import React, {useState} from 'react';
import {scale, verticalScale} from 'react-native-size-matters';

import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {TextInput} from 'react-native-element-textinput';

import LottieView from 'lottie-react-native';
import loginLottie from '../../assets/lottieFiles/login.json';
import {Icon} from '@ui-kitten/components';
import LinearGradient from 'react-native-linear-gradient';

import {Black} from '../../utils/colors';
import {
  FONT,
  fontSizeBig,
  fontSizeVeryLarge,
  paddingMedium,
  paddingSmall,
} from '../../utils/UIConstants';
import {studentLogin} from './studentLoginAPI';

const Login = ({navigation}) => {
  const [rollNo, setRollNo] = useState('');
  const [password, setPassword] = useState('');

  const handleAPI_CALL = () => {
    studentLogin(rollNo, password);
    navigation.push('API_Loader');
  };

  return (
    <View>
      <View
        style={{
          height: verticalScale(310),
          width: '100%',
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
          // textError={rollNo.length === 0 ? 'Please enter' : ''}
        />

        <TextInput
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
        />
        <View
          style={{
            height: verticalScale(30),
            alignContent: 'center',
            justifyContent: 'center',
            marginTop: 10,
            marginBottom: 3,
          }}>
          <TouchableOpacity
            onPress={() =>
              navigation.push('Reset', {screenType: 'RESET PASSWORD'})
            }>
            <Text
              style={{
                textAlign: 'center',
                fontSize: scale(12),
                fontFamily: FONT,
              }}>
              Forgot Password?
              <Text
                style={{
                  color: 'darkgreen',
                  fontWeight: 'bold',
                  fontSize: scale(14),
                  fontFamily: FONT,
                }}>
                {' '}
                RESET
              </Text>
            </Text>
          </TouchableOpacity>
          {/* <View style={{h}} /> */}
          <TouchableOpacity
            style={{marginTop: 3}}
            onPress={() => navigation.push('SignUp', {screenType: 'SIGN UP'})}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: scale(12),
                fontFamily: FONT,
              }}>
              Don't have an account?
              <Text
                style={{
                  color: '#f13e4d',
                  fontWeight: 'bold',
                  fontSize: scale(14),
                  fontFamily: FONT,
                }}>
                {' '}
                SIGN UP
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
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
            }}>
            <TouchableOpacity onPress={() => handleAPI_CALL()}>
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

export default Login;
