import Orientation from './orientationContacts';
import Admin from './adminContacts';
import React, {useState, useEffect} from 'react';
import {Tab, TabView, Text} from '@ui-kitten/components';
import axios from 'axios';
import {API_GET_CONTACTS} from '../../utils/APIConstants';
import {UserData} from '../../mobx/userStore';
import {ActivityIndicator, Alert} from 'react-native';
import {contactsStore} from '../../mobx/contactsStore';
import {observer} from 'mobx-react';
import {verticalScale} from 'react-native-size-matters';
import LoaderPage from '../LoadingScreen';
import {getContacts} from './API_CALLS';
import ErrorScreen from '../../components/errorScreen';
import {SafeAreaView} from 'react-native-safe-area-context';

const Contacts = observer(({navigation}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isConnected, setConnectivity] = useState(false);
  const [errorText, setErrorText] = useState(null);
  useEffect(() => {
    getContacts(navigation, setErrorText, setConnectivity);
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      {isConnected == false ? (
        <ErrorScreen
          errorMessage={errorText}
          navigation={navigation}
          buttonText="GO BACK"
          showIconInButton={true}
        />
      ) : (
        <>
          <TabView
            selectedIndex={selectedIndex}
            swipeEnabled={false}
            indicatorStyle={{
              color: '#f13e4d',
              backgroundColor: 'red',
            }}
            onSelect={index => setSelectedIndex(index)}>
            <Tab
              title={evaProps => <Text {...evaProps}>ORIENTATION TEAM</Text>}
              style={{height: verticalScale(30)}}>
              {contactsStore.state.isOrientationLoading ? (
                <LoaderPage navigation={navigation} />
              ) : (
                <Orientation navigation={navigation} />
              )}
            </Tab>
            <Tab title="ADMIN" style={{height: verticalScale(30)}}>
              {contactsStore.state.isAdminLoading ? (
                <LoaderPage navigation={navigation} />
              ) : (
                <Admin navigation={navigation} />
              )}
            </Tab>
          </TabView>
        </>
      )}
    </SafeAreaView>
  );
});

export default Contacts;
