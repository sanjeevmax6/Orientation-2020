import React, {useState} from 'react';
import {View} from 'react-native';
import LottieView from 'lottie-react-native';
import loginLottie from '../../assets/lottieFiles/loading.json';
import {Login_Store} from '../../mobx/loginStore';

const LoaderPage = ({navigation}) => {
  const pressHandler = () => {
    Login_Store.logIn('Login TOKEN ');
  };

  const [STATE, setSTATE] = useState(1);
  const toggler = () => {
    //force reload as there is a bug in the LF library
    if (STATE) setSTATE(0);
  };
  setTimeout(toggler, 50);
  setTimeout(pressHandler, 3000); //simulation of network call
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
        speed={0.95}
        resizeMode="contain"
        autoPlay
        loop
      />
    </View>
  );
};

export default LoaderPage;
