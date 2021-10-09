import React from 'react';
import {Layout, Text} from '@ui-kitten/components';
import {SafeAreaView} from 'react-native';

const Contacts = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Layout>
        <Text>Contacts</Text>
      </Layout>
    </SafeAreaView>
  );
};

export default Contacts;
