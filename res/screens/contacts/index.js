import React from 'react';
import {Layout} from '@ui-kitten/components';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import ContactCard from '../../components/contact-card';
import {scale} from 'react-native-size-matters';
import {paddingMedium} from '../../utils/UIConstants';

const Contacts = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Layout style={{flex: 1}}>
        <View style={styles.container}>
          <ContactCard />
          <ContactCard />
        </View>
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: scale(paddingMedium),
    paddingLeft: scale(paddingMedium),
  },
});

export default Contacts;
