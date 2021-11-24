import React, {useState} from 'react';
import {View} from 'react-native';
import LottieView from 'lottie-react-native';
import loginLottie from '../../assets/lottieFiles/loading2.json';

const Loader = ({navigation}) => {
  const [STATE, setSTATE] = useState(1);
  const toggler = () => {
    //force reload as there is a bug in the LF library
    if (STATE) setSTATE(0);
  };

  setTimeout(toggler, 50);

  return (
    <>
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
    </>
  );
};

export default Loader;
