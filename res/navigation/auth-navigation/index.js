import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../../screens/LoginScreen';
import SignUp from '../../screens/signUp';
import API_LoaderPage from '../../screens/apiCallScreen';
const stack = createNativeStackNavigator();

function AuthNavigator() {
  return (
    <stack.Navigator>
      <stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <stack.Screen
        name="SignUp"
        component={SignUp}
        options={{headerShown: false, animation: 'slide_from_right'}}
      />
      <stack.Screen
        name="API_Loader"
        component={API_LoaderPage}
        options={{headerShown: false}}
      />
    </stack.Navigator>
  );
}

export default AuthNavigator;
