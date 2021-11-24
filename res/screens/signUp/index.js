import React, {useState} from 'react';
import {ViewPager} from '@ui-kitten/components';

import EmailScreen from './email';
import OTPScreen from './otp';
import PasswordScreen from './setPassword';

const SignUp = ({route, navigation}) => {
  const {screenType} = route.params;

  const [index, setIndex] = useState(0);
  const shouldLoadComponent = curr => curr === index;
  const [Name, setName] = useState('');
  const [dept, setDept] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [token, setToken] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const inputStates = {
    dept,
    setDept,
    Name,
    setName,
    otp,
    setOtp,
    password1,
    setPassword1,
    password2,
    token,
    setToken,
    setPassword2,
    email,
    setEmail,
  };

  return (
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
        inputStates={inputStates}
      />
      <OTPScreen index={index} setIndex={setIndex} inputStates={inputStates} />
      <PasswordScreen
        index={index}
        setIndex={setIndex}
        navigation={navigation}
        inputStates={inputStates}
      />
    </ViewPager>
  );
};

export default SignUp;
