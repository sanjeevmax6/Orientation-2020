import React from 'react';
import {scale, verticalScale} from 'react-native-size-matters';

import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';

import LottieView from 'lottie-react-native';
import loginLottie from '../../assets/lottieFiles/signup.json';

import {Black} from '../../utils/colors';
import {
  borderRadius,
  borderWidth,
  fontSizeBig,
  paddingMedium,
  paddingSmall,
} from '../../utils/UIConstants';
import Header from './header';
import Button from './button';

const PasswordScreen = ({index, setIndex, navigation}) => {
  const backHandler = () => {
    setIndex(index - 1);
  };
  const nextHandler = () => {
    navigation.push('Loader');
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
          placeholder={'Enter Your Password'}
          autoFocus={true}
        />
        <TextInput
          style={styles.textInput}
          placeholder={'Confirm Your Password'}
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
  textInput: {
    marginTop: verticalScale(paddingSmall),
    marginHorizontal: scale(paddingMedium),
    fontSize: scale(fontSizeBig),
    alignItems: 'center',
    borderWidth: borderWidth,
    borderRadius: borderRadius,
    color: Black,
  },
});

export default PasswordScreen;
