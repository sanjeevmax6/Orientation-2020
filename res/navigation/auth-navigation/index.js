import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../../screens/LoginScreen';
import SignUp from '../../screens/signUp';
import LoaderPage from '../../screens/LoadingScreen';

const stack = createNativeStackNavigator();

function AuthNavigator({route}) {
  const LoggedIn = route.params.setLoggedIn;
  return (
    <stack.Navigator>
      <stack.Screen
        name="Login"
        component={Login}
        initialParams={{LoggedIn}}
        options={{headerShown: false, animation: 'slide_from_left'}}
      />
      <stack.Screen
        name="SignUp"
        component={SignUp}
        options={{headerShown: false, animation: 'slide_from_right'}}
      />
      <stack.Screen
        name="Loader"
        component={LoaderPage}
        initialParams={{LoggedIn}}
        options={{headerShown: false}}
      />
    </stack.Navigator>
  );
}

export default AuthNavigator;
