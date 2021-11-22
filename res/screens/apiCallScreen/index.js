import React, {useState, useEffect} from 'react';
import {View, BackHandler} from 'react-native';
import LottieView from 'lottie-react-native';
import loginLottie from '../../assets/lottieFiles/loading.json';
import ErrorScreen from '../../components/errorScreen';
import {observer} from 'mobx-react';
import {API_SCREEN_Store} from '../../mobx/apiCallScreenStore';

const API_LoaderPage = observer(({navigation}) => {
  const [STATE, setSTATE] = useState(1);
  const toggler = () => {
    //force reload as there is a bug in the LF library
    if (STATE) setSTATE(0);
  };
  setTimeout(toggler, 50);

  const reset = () => {
    API_SCREEN_Store.reset();
  };

  useEffect(() => {
    const backAction = () => {
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  return (
    <>
      {API_SCREEN_Store.errorStatus ? (
        <ErrorScreen
          navigation={navigation}
          errorMessage={API_SCREEN_Store.errorText}
          buttonText="TRY AGAIN"
          fn={() => {
            reset();
          }}
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
});

export default API_LoaderPage;
