import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import AuthNavigator from './auth-navigation';
import AppNavigator from './app-navigation';
import Login from '../screens/LoginScreen';
import MainMenu from '../screens/mainMenu';
import {LogBox} from 'react-native';

const RootStack = createNativeStackNavigator();

function Navigator() {
  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);
  const [LoggedIn, setLoggedIn] = useState(false);

  return (
    <NavigationContainer independent={true}>
      <RootStack.Navigator independent={true}>
        {LoggedIn ? (
          <>
            <RootStack.Screen
              name="App"
              component={AppNavigator}
              initialParams={{setLoggedIn}}
              options={{
                headerShown: false,
              }}
            />
          </>
        ) : (
          <>
            <RootStack.Screen
              name="Auth"
              component={AuthNavigator}
              initialParams={{setLoggedIn}}
              options={{
                headerShown: false,
              }}
            />
          </>
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default Navigator;
