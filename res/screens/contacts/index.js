import Orientation from './orientationContacts';
import Admin from './adminContacts';
import React, {useState, useEffect} from 'react';
import {Text} from '@ui-kitten/components';
import {contactsStore} from '../../mobx/contactsStore';
import {observer} from 'mobx-react';
import {verticalScale} from 'react-native-size-matters';

import {getContacts} from './API_CALLS';
import ErrorScreen from '../../components/errorScreen';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FONT} from '../../utils/UIConstants';
import {scale} from 'react-native-size-matters';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

const Contacts = observer(({navigation}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    contactsStore.setError(false);
    contactsStore.setErrorText('');
    getContacts(navigation);
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      {contactsStore.ErrorStatus ? (
        <ErrorScreen
          errorMessage={contactsStore.getErrorText}
          navigation={navigation}
          buttonText="GO BACK"
          showIconInButton={true}
        />
      ) : (
        <>
          <Tab.Navigator
            screenOptions={{
              tabBarLabelStyle: {
                fontSize: scale(12),
                fontFamily: FONT,
              },
              tabBarIndicatorStyle: {backgroundColor: 'red'},
              tabBarStyle: {backgroundColor: 'white'},
            }}>
            <Tab.Screen name="Orientation Team" component={Orientation} />
            <Tab.Screen name="Admin" component={Admin} />
          </Tab.Navigator>
        </>
      )}
    </SafeAreaView>
  );
});

export default Contacts;
