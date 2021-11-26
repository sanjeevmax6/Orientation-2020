import React, {useState} from 'react';
import {ViewPager} from '@ui-kitten/components';

import EmailScreen from './email';
import OTPScreen from './otp';
import PasswordScreen from './setPassword';
import {SIGN_UP_STORE} from '../../mobx/signUpStore';
import Loader from './loader';
import ErrorScreen from '../../components/errorScreen';
import {observer} from 'mobx-react';
import SuccessScreen from '../../components/successScreen';

const SignUp = observer(({route, navigation}) => {
  const {screenType} = route.params;

  const [index, setIndex] = useState(0);

  const backHandler = () => {
    SIGN_UP_STORE.resetStore();
  };

  const shouldLoadComponent = curr => curr === index;

  return (
    <>
      {SIGN_UP_STORE.getDoingApiCall ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          {SIGN_UP_STORE.getFailState ? (
            <>
              <ErrorScreen
                errorMessage={SIGN_UP_STORE.getErrorText}
                navigation="show"
                useOnlyFn={true}
                fn={backHandler}
              />
            </>
          ) : (
            <>
              {SIGN_UP_STORE.getSucessState ? (
                <>
                  <SuccessScreen
                    navigation="show"
                    useOnlyFn={true}
                    fn={() => {
                      navigation.pop();
                      SIGN_UP_STORE.setSuccessState(false);
                    }}
                  />
                </>
              ) : (
                <>
                  <ViewPager
                    selectedIndex={index}
                    swipeEnabled={false}
                    shouldLoadComponent={shouldLoadComponent}
                    onSelect={index => setIndex(index)}>
                    <EmailScreen
                      index={index}
                      setIndex={setIndex}
                      navigation={navigation}
                      heading={screenType}
                    />

                    <OTPScreen index={index} setIndex={setIndex} />

                    <PasswordScreen
                      index={index}
                      setIndex={setIndex}
                      navigation={navigation}
                    />
                  </ViewPager>
                </>
              )}
            </>
          )}
        </>
      )}
    </>
  );
});

export default SignUp;
