import React from 'react';
import * as eva from '@eva-design/eva';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {FontAwesome5IconsPack} from './assets/icons/fontAwesome5-icons';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import Navigator from './navigation';
import Status_Bar from './components/status_bar';
import {Observer, Provider} from 'mobx-react';
import {UserData} from './mobx/userStore';
import {default as theme} from './utils/custom-theme.json';
import axios from 'axios';

import PushNotification from 'react-native-push-notification';
import firebase from '@react-native-firebase/app';
import {useEffect} from 'react';
import {Linking} from 'react-native';

const App = () => {
  axios.defaults.timeout = 5000;

  useEffect(() => {
    firebase.initializeApp(this);
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function (token) {
        console.log('TOKEN:', token.token);
        UserData.setFireBaseToken(token.token);
      },

      // (required) Called when a remote is received or opened, or local notification is opened
      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);

        if (notification.data.url)
          Linking.openURL(notification.data.url).catch(err =>
            console.error("Couldn't load page", err),
          );

        // process the notification

        // (required) Called when a remote is received or opened, or local notification is opened
        //notification.finish(PushNotificationIOS.FetchResult.NoData);
      },

      // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
      onAction: function (notification) {
        console.log('ACTION:', notification.action);
        console.log('NOTIFICATION:', notification);

        // process the action
      },

      // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
      onRegistrationError: function (err) {
        console.error(err.message, err);
      },

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,

      /**
       * (optional) default: true
       * - Specified if permissions (ios) and token (android and ios) will requested or not,
       * - if not, you must call PushNotificationsHandler.requestPermissions() later
       * - if you are not using remote notification or do not have Firebase installed, use this:
       *     requestPermissions: Platform.OS === 'ios'
       */
      requestPermissions: true,
    });
  });

  return (
    <Observer>
      {() => (
        <>
          <Status_Bar />
          <IconRegistry icons={[EvaIconsPack, FontAwesome5IconsPack]} />
          <ApplicationProvider {...eva} theme={{...eva.light, ...theme}}>
            <Navigator />
          </ApplicationProvider>
        </>
      )}
    </Observer>
  );
};

export default App;
