import Orientation from './orientationContacts';
import Admin from './adminContacts';
import React from 'react';

import {Tab, TabView, Text} from '@ui-kitten/components';
const Contacts = ({navigation}) => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  return (
    <TabView
      selectedIndex={selectedIndex}
      indicatorStyle={{
        color: '#f13e4d',
        backgroundColor: 'red',
      }}
      onSelect={index => setSelectedIndex(index)}>
      <Tab
        title={evaProps => <Text {...evaProps}>ORIENTATION TEAM</Text>}
        color="red">
        <Orientation />
      </Tab>
      <Tab title="ADMIN">
        <Admin />
      </Tab>
    </TabView>
  );
};

export default Contacts;
