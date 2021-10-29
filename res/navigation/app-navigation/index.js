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

function AppNavigator() {
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
        options={{
          headerShown: true,
          animation: 'slide_from_right',
          header: props => <Header props={props} title="Scheduler" />,
        }}
      />
      <stack.Screen
        name="VirtualMap"
        component={VirtualMap}
        options={{
          animation: 'slide_from_right',
          headerShown: true,
          header: props => <Header props={props} title="Virtual Map" />,
        }}
      />
      <stack.Screen
        name="Contacts"
        component={Contacts}
        options={{
          animation: 'slide_from_right',
          headerShown: true,
          header: props => <Header props={props} title="Contacts" />,
        }}
      />
      <stack.Screen
        name="MagazineAndSymposium"
        component={MagazineAndSymposium}
        options={{
          animation: 'slide_from_right',
          headerShown: true,
          header: props => (
            <Header props={props} title="Magazine and Symposium" />
          ),
        }}
      />
      <stack.Screen
        name="ClubsAndFests"
        component={ClubsAndFests}
        // options={{headerShown: true}}
        options={{
          headerShown: true,
          animation: 'slide_from_right',
          header: props => <Header props={props} title="Clubs and Fests" />,
        }}
      />
      <stack.Screen
        name="Timetable"
        component={Timetable}
        options={{
          animation: 'slide_from_right',
          headerShown: true,
          header: props => <Header props={props} title="Academic Calendar" />,
        }}
      />
    </stack.Navigator>
  );
}

export default AppNavigator;
