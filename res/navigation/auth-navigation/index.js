import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../../screens/LoginScreen';
import MainMenu from '../../screens/mainMenu';

const stack = createNativeStackNavigator();

function AuthNavigator({route}) {
  const LoggedIn = route.params.setLoggedIn;
  return (
    <stack.Navigator>
      <stack.Screen
        name="Login"
        component={Login}
        initialParams={{LoggedIn}}
        options={{headerShown: false}}
      />
    </stack.Navigator>
  );
}

export default AuthNavigator;
