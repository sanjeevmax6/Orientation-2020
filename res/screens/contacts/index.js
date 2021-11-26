import Orientation from './orientationContacts';
import Admin from './adminContacts';
import React, {useState, useEffect} from 'react';
import {Tab, TabView, Text} from '@ui-kitten/components';
import {contactsStore} from '../../mobx/contactsStore';
import {observer} from 'mobx-react';
import {verticalScale} from 'react-native-size-matters';
import LoaderPage from '../LoadingScreen';
import {getContacts} from './API_CALLS';
import ErrorScreen from '../../components/errorScreen';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FONT} from '../../utils/UIConstants';

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
          <TabView
            selectedIndex={selectedIndex}
            indicatorStyle={{
              color: '#f13e4d',
              backgroundColor: 'red',
            }}
            onSelect={index => setSelectedIndex(index)}>
            <Tab
              title={evaProps => (
                <Text {...evaProps} style={{fontFamily: FONT}}>
                  ORIENTATION TEAM
                </Text>
              )}
              style={{height: verticalScale(30)}}>
              {contactsStore.state.isOrientationLoading ? (
                <LoaderPage navigation={navigation} />
              ) : (
                <Orientation navigation={navigation} />
              )}
            </Tab>
            <Tab
              title={evaProps => (
                <Text {...evaProps} style={{fontFamily: FONT}}>
                  ADMIN
                </Text>
              )}>
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
