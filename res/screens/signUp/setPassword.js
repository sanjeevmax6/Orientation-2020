import React, {useEffect} from 'react';
import {scale, verticalScale} from 'react-native-size-matters';

import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {TextInput} from 'react-native-element-textinput';

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
import {BackHandler} from 'react-native';

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
          inputStyle={{fontSize: scale(fontSizeBig), color: 'black'}}
          labelStyle={{fontSize: scale(fontSizeBig)}}
          placeholder="Enter Your Password"
          autoFocus={true}
          secureTextEntry
          placeholderTextColor="gray"
          focusColor="black"
          autoCapitalize="none"
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
