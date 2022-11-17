import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../../screens/LoginScreen';
import SignUp from '../../screens/signUp';
import API_LoaderPage from '../../screens/apiCallScreen';
import Reset from '../../screens/Reset';
import LynxLogin from '../../screens/lynxAuthScreen';
const stack = createNativeStackNavigator();

function AuthNavigator() {
  return (
    <stack.Navigator>
      <stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false, gestureEnabled: false}}
      />
      <stack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          headerShown: false,
          animation: 'slide_from_right',
          gestureEnabled: false,
        }}
      />
      <stack.Screen
        name="Reset"
        component={Reset}
        options={{
          headerShown: false,
          animation: 'slide_from_right',
          gestureEnabled: false,
        }}
      />
      <stack.Screen
        name="LynxLogin"
        component={LynxLogin}
        options={{
          headerShown: false,
          animation: 'slide_from_right',
          gestureEnabled: false,
        }}
      />
      <stack.Screen
        name="API_Loader"
        component={API_LoaderPage}
        options={{headerShown: false, gestureEnabled: false}}
      />
    </stack.Navigator>
  );
}

export default AuthNavigator;
