import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import LottieView from 'lottie-react-native';
import successLottie from '../assets/lottieFiles/success.json';
import LinearGradient from 'react-native-linear-gradient';
import {Icon} from '@ui-kitten/components';

import {scale, verticalScale} from 'react-native-size-matters';
import {FONT} from '../utils/UIConstants';

// you need to pass the navigation if you want to show the goBack button
// you can change the button text as well

const SuccessScreen = ({
  navigation = '',
  buttonText = 'NEXT',
  showIconInButton = true,
  icon = 'arrow-ios-forward-outline',
  fn = () => {},
  useOnlyFn = false,
}) => {
  const next = () => {
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
        source={successLottie}
        resizeMode="contain"
        autoPlay
        loop={true}
      />
      {navigation ? (
        <LinearGradient
          colors={['#f13e4d', '#ff5130', '#ff512f']}
          style={{
            borderRadius: scale(24),
            alignSelf: 'center',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: scale(9),
            paddingLeft: scale(20),
            paddingRight: scale(10),
            position: 'absolute',
            bottom: verticalScale(50),
          }}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
            onPress={next}>
            <Text
              style={{
                fontSize: scale(18),
                color: 'white',
                fontWeight: 'bold',
                fontFamily: FONT,
              }}>
              {buttonText}
            </Text>
            {showIconInButton ? (
              <Icon
                fill="white"
                style={{
                  height: verticalScale(30),
                  width: verticalScale(30),
                }}
                name={icon}
              />
            ) : (
              <View style={{width: scale(9)}} />
            )}
          </TouchableOpacity>
        </LinearGradient>
      ) : (
        <></>
      )}
    </View>
  );
};

export default SuccessScreen;
