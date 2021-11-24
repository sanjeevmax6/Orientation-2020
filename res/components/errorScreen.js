import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import LottieView from 'lottie-react-native';
import errorLottie from '../assets/lottieFiles/err.json';
import LinearGradient from 'react-native-linear-gradient';
import {Icon} from '@ui-kitten/components';

import {scale, verticalScale} from 'react-native-size-matters';
import {FONT} from '../utils/UIConstants';

// you need to pass the navigation if you want to show the goBack button
// you can change the button text as well

const ErrorScreen = ({
  navigation = '',
  errorMessage = 'An Error Has Occurred!',
  buttonText = 'GO BACK',
  showIconInButton = true,
  icon = 'arrow-ios-back-outline',
  fn = () => {},
  useOnlyFn = false,
}) => {
  const backPress = () => {
    if (useOnlyFn) {
      fn();
    } else {
      navigation.goBack();
      fn();
    }
  };

  const [STATE, setSTATE] = useState(1);
  const toggler = () => {
    //force reload as there is a bug in the LF library
    if (STATE) setSTATE(0);
  };

  setTimeout(toggler, 50);

  return (
    <View
      style={{
        height: '100%',
        width: '100%',
        alignSelf: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: 'white',
      }}>
      <LottieView
        style={{marginBottom: verticalScale(50)}}
        source={errorLottie}
        speed={0.95}
        resizeMode="contain"
        autoPlay
        loop
      />
      <Text
        style={{
          textAlign: 'center',
          fontSize: scale(18),
          marginHorizontal: scale(12),
          textTransform: 'uppercase',
          fontWeight: '500',
          fontFamily: FONT,
          marginTop: verticalScale(150),
        }}>
        {errorMessage}
      </Text>
      {navigation ? (
        <LinearGradient
          colors={['#f13e4d', '#ff5130', '#ff512f']}
          style={{
            backgroundColor: 'green',
            padding: scale(9),
            paddingRight: scale(18),
            borderRadius: scale(24),
            alignSelf: 'center',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: '50%',
            position: 'absolute',
            bottom: verticalScale(50),
          }}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
            onPress={backPress}>
            {showIconInButton ? (
              <Icon
                fill="white"
                style={{
                  height: verticalScale(30),
                  width: verticalScale(30),
                  borderRadius: verticalScale(20),
                }}
                name={icon}
              />
            ) : (
              <View style={{width: scale(9)}} />
            )}

            <Text
              style={{
                fontSize: scale(18),
                color: 'white',
                fontWeight: 'bold',
                fontFamily: FONT,
              }}>
              {buttonText}
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      ) : (
        <></>
      )}
    </View>
  );
};

export default ErrorScreen;
