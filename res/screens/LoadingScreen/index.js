import React from 'react';
import {View} from 'react-native';
import LottieView from 'lottie-react-native';
import loginLottie from '../../assets/lottieFiles/loading.json';

const LoaderPage = ({route, navigation}) => {
  const LoggedIn = route.params.LoggedIn;
  const pressHandler = () => {
    LoggedIn(true);
  };
  setTimeout(() => {
    console.log('Lottie'), 50;
  });
  setTimeout(pressHandler, 3000);
  return (
    <View
      style={{
        height: '100%',
        width: '100%',
        alignSelf: 'center',
        justifyContent: 'center',
      }}>
      <LottieView
        source={loginLottie}
        // autoSize={false}'
        speed={0.95}
        resizeMode="contain"
        autoPlay
        loop
      />
    </View>
  );
};

export default LoaderPage;
