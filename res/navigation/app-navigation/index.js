import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import MainMenu from '../../screens/mainMenu';
import Scheduler from '../../screens/scheduler';
import Contacts from '../../screens/contacts';
import VirtualMap from '../../screens/virtualMap';
import MagazineAndSymposium from '../../screens/magazineAndSymposium';
import ClubsAndFests from '../../screens/clubsAndFests';
import Timetable from '../../screens/timetable';
import Header from '../../components/header';
const stack = createNativeStackNavigator();

function AppNavigator({params}) {
  return (
    <stack.Navigator>
      <stack.Screen
        name="MainMenu"
        component={MainMenu}
        options={{headerShown: false}}
      />
      <stack.Screen
        name="Scheduler"
        component={Scheduler}
        options={{headerShown: false}}
      />
      <stack.Screen
        name="VirtualMap"
        component={VirtualMap}
        options={{headerShown: false}}
      />
      <stack.Screen
        name="Contacts"
        component={Contacts}
        options={{headerShown: false}}
      />
      <stack.Screen
        name="MagazineAndSymposium"
        component={MagazineAndSymposium}
        options={{headerShown: false}}
      />
      <stack.Screen
        name="ClubsAndFests"
        component={ClubsAndFests}
        // options={{headerShown: true}}
        options={{
          headerShown: true,
          header: props => <Header props={props} title="Clubs and Fests" />,
        }}
      />
      <stack.Screen
        name="Timetable"
        component={Timetable}
        options={{headerShown: false}}
      />
    </stack.Navigator>
  );
}

export default AppNavigator;
