import React, {useState} from 'react';
import {View} from 'react-native';
import LottieView from 'lottie-react-native';
import externalLottie from '../../assets/lottieFiles/loading2.json';
import internalLottie from '../../assets/lottieFiles/loadingInside.json';
import {LOADING_EXTERNAL, LOADING_INTERNAL} from '../../utils/LOADING_TYPES';

const LoaderPage = ({navigation, LoaderType = LOADING_INTERNAL}) => {
  const [STATE, setSTATE] = useState(1);
  const toggler = () => {
    //force reload as there is a bug in the LF library
    if (STATE) {
      setSTATE(0);
    }
  };

  setTimeout(toggler, 50);
  const getLottie = () => {
    if (LoaderType === LOADING_INTERNAL) return internalLottie;
    else if (LoaderType === LOADING_EXTERNAL) return externalLottie;
  };
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
          source={getLottie()}
          speed={1}
          resizeMode="contain"
          autoPlay={true}
          loop
        />
      </View>
    </>
  );
};

export default LoaderPage;
