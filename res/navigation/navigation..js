import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainMenu from '../screens/mainMenu';
import Scheduler from '../screens/scheduler';
import Contacts from '../screens/contacts';
import VirtualMap from '../screens/virtualMap';
import MagazineAndSymposium from '../screens/magazineAndSymposium';
import ClubsAndFests from '../screens/clubsAndFests';
import Timetable from '../screens/timetable';

const {Navigator, Screen} = createNativeStackNavigator();

const HomeNavigator = () => (
  <Navigator headerMode="none">
    <Screen
      name="MainMenu"
      component={MainMenu}
      options={{headerShown: false}}
    />
    <Screen
      name="Scheduler"
      component={Scheduler}
      options={{headerShown: false}}
    />
    <Screen
      name="VirtualMap"
      component={VirtualMap}
      options={{headerShown: false}}
    />
    <Screen
      name="Contacts"
      component={Contacts}
      options={{headerShown: false}}
    />
    <Screen
      name="ClubsAndFests"
      component={ClubsAndFests}
      options={{headerShown: false}}
    />
    <Screen
      name="MagazineAndSymposium"
      component={MagazineAndSymposium}
      options={{headerShown: false}}
    />
    <Screen
      name="Timetable"
      component={Timetable}
      options={{headerShown: false}}
    />
  </Navigator>
);

export const AppNavigator = () => (
  <NavigationContainer>
    <HomeNavigator />
  </NavigationContainer>
);
