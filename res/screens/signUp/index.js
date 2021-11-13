import React, {useState} from 'react';
import {ViewPager} from '@ui-kitten/components';
import {Text} from 'react-native';
import EmailScreen from './email';
import OTPScreen from './otp';
import PasswordScreen from './setPassword';
const SignUp = ({route, navigation}) => {
  const [index, setIndex] = useState(0);
  const shouldLoadComponent = curr => curr === index;
  return (
    <ViewPager
      selectedIndex={index}
      swipeEnabled={false}
      shouldLoadComponent={shouldLoadComponent}
      onSelect={index => setIndex(index)}>
      <EmailScreen index={index} setIndex={setIndex} navigation={navigation} />
      <OTPScreen index={index} setIndex={setIndex} />
      <PasswordScreen
        index={index}
        setIndex={setIndex}
        navigation={navigation}
      />
    </ViewPager>
  );
};

export default SignUp;
