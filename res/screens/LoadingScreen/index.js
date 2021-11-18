import React, {useState} from 'react';
import {View} from 'react-native';
import LottieView from 'lottie-react-native';
import loginLottie from '../../assets/lottieFiles/loading.json';
import {Login_Store} from '../../mobx/loginStore';
import ErrorScreen from './errorScreen';

const LoaderPage = ({navigation}) => {
  const pressHandler = () => {
    Login_Store.logIn('Login TOKEN ');
  };
  const pressHandler1 = () => {
    setErrorStatus(1);
  };

  const [STATE, setSTATE] = useState(1);
  const toggler = () => {
    //force reload as there is a bug in the LF library
    if (STATE) setSTATE(0);
  };

  const [ErrorStatus, setErrorStatus] = useState(0);
  setTimeout(toggler, 50);
  setTimeout(pressHandler1, 1000); //simulation of network call
  setTimeout(pressHandler, 3000); //simulation of network call

  return (
    <>
      {ErrorStatus ? (
        <ErrorScreen
          navigation={navigation}
          errorMessage="oops something went wrong"
        />
      ) : (
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
      )}
    </>
  );
};

export default LoaderPage;
