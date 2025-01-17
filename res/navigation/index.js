import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import AuthNavigator from './auth-navigation';
import AppNavigator from './app-navigation';
import {LogBox} from 'react-native';
import {Login_Store} from '../mobx/loginStore';
import {observer} from 'mobx-react';
import SplashScreen from '../screens/splashScreen';
import {UserData} from '../mobx/userStore';
const RootStack = createNativeStackNavigator();

const Navigator = observer(() => {
  LogBox.ignoreLogs(["EventEmitter.removeListener('change', ...)"]);
  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
    'Possible Unhandled Promise Rejection (id: 0)',
  ]);

  return (
    <NavigationContainer independent={true}>
      <RootStack.Navigator independent={true}>
        {Login_Store.showSplash ? (
          <RootStack.Screen
            name="Splash"
            component={SplashScreen}
            options={{
              headerShown: false,
            }}
          />
        ) : // ) : (token && name && rollNo && department) ? (
        UserData.token ? ( //we're getting only token as of now
          <>
            <RootStack.Screen
              name="App"
              component={AppNavigator}
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
              options={{
                headerShown: false,
              }}
            />
          </>
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
});

export default Navigator;
