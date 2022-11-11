import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainMenu from '../../screens/mainMenu';
import Scheduler from '../../screens/scheduler';
import Contacts from '../../screens/contacts';
import VirtualMap from '../../screens/virtualMap';
import MagazineAndSymposium from '../../screens/magazineAndSymposium';
import ClubsAndFests from '../../screens/clubsAndFests';
import Timetable from '../../screens/academicCalendar';
import ClubCallingQuiz from "../../screens/clubCallingQuiz";
import FeedbackScreen from "../../screens/feedbackScreen";
import Header from '../../components/header';
import Admin from '../../screens/contacts/adminContacts';
import Orientation from '../../screens/contacts/orientationContacts';
import EventDescription from '../../screens/scheduler/EventDescription';
import {UserData} from '../../mobx/userStore';
import AdminScreen from '../../screens/adminScreen';
import {observer} from 'mobx-react';
import AdminHeader from '../../components/adminHeader';
import GameNavigator from '../game-navigation';

const stack = createNativeStackNavigator();

const AppNavigator = observer(() => {
  return (
    <stack.Navigator>
      {UserData.getIsAdmin ? (
        <>
          <stack.Screen
            name="Admin"
            component={AdminScreen}
            options={{
              headerShown: true,
              header: props => <AdminHeader props={props} title="Admin" />,
            }}
          />
        </>
      ) : (
        <>
          <stack.Screen
            name="MainMenu"
            component={MainMenu}
            options={{headerShown: false}}
          />
          <stack.Screen
            name="Scheduler"
            component={Scheduler}
            options={{
              headerShown: false,
              animation: 'slide_from_right',
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
            name="Orientation"
            component={Orientation}
            options={{
              headerShown: true,
              animation: 'slide_from_right',
              header: props => <Header props={props} title="Orientation" />,
            }}
          />
          <stack.Screen
            name="Admin"
            component={Admin}
            options={{
              headerShown: true,
              animation: 'slide_from_right',
              header: props => <Header props={props} title="Admin" />,
            }}
          />
          <stack.Screen
            name="MagazineAndSymposium"
            component={MagazineAndSymposium}
            options={{
              animation: 'slide_from_right',
              headerShown: true,
              header: props => <Header props={props} title="Symposiums" />,
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
              header: props => (
                <Header props={props} title="Academic Calendar" />
              ),
            }}
          />
          <stack.Screen
            name="ClubCallingQuiz"
            component={ClubCallingQuiz}
            options={{
              animation: 'slide_from_right',
              headerShown: true,
              header: props => (
                <Header props={props} title="What's your club calling?" />
              ),
            }}
          />
          <stack.Screen
            name="FeedbackScreen"
            component={FeedbackScreen}
            options={{
              animation: 'slide_from_right',
              headerShown: true,
              header: props => (
                <Header props={props} title="Feedback" />
              ),
            }}
          />
          <stack.Screen
            name="GameNavigator"
            component={GameNavigator}
            options={{
              animation: 'slide_from_right',
              headerShown: false,
            }}
          />
          <stack.Screen
            name="Event Description"
            component={EventDescription}
            options={{
              animation: 'slide_from_right',
              headerShown: true,
              header: props => (
                <Header props={props} title="Event Description" />
              ),
            }}
          />
        </>
      )}
    </stack.Navigator>
  );
});

export default AppNavigator;
