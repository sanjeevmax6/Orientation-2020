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

const Contacts = observer(({navigation}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const getContacts = async () => {
    axios
      .get(API_GET_CONTACTS, {
        headers: {
          'Content-Type': 'application/json',
          token: UserData.token,
        },
      })
      .then(response => {
        contactsStore.setIsOrientationLoading(false);
        contactsStore.setIsAdminLoading(false);
        contactsStore.setOrientationData(response.data.Orientation);
        contactsStore.setAdminData(response.data.Admin);
      })
      .catch(err => {
        Alert.alert(
          'Error occured',
          `An error occred while gathering data:\n ${err.message}`,
          [
            {
              text: 'Ok',
              onPress: () => navigation.goBack(),
            },
          ],
        );
        console.log(err);
      });
  };

  useEffect(() => {
    getContacts();
  }, []);

  return (
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
          <ActivityIndicator style={{height: '100%'}} />
        ) : (
          <Orientation />
        )}
      </Tab>
      <Tab title="ADMIN" style={{height: verticalScale(30)}}>
        {contactsStore.state.isAdminLoading ? (
          <ActivityIndicator style={{height: '100%'}} />
        ) : (
          <Admin />
        )}
      </Tab>
    </TabView>
  );
});

export default Contacts;
