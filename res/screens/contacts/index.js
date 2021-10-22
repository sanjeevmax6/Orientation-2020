import React from 'react';
import {Layout, Text} from '@ui-kitten/components';
import {SafeAreaView,StyleSheet,View} from 'react-native';
import ContactCard from '../../components/contact-card';
import { scale } from 'react-native-size-matters';
import { paddingLeftMedium, paddingRightMedium } from '../../utils/UIconstants';


const Contacts = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Layout style={{flex:1}}>
      <Text >Contacts</Text>
      <View style={styles.container}>
      <ContactCard/>
      <ContactCard/>
      </View>
      </Layout>
    </SafeAreaView>
  );
};

const styles=StyleSheet.create({
  container:{
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent: 'center',
    paddingRight:scale(paddingRightMedium),
    paddingLeft:scale(paddingLeftMedium)
  },
});

export default Contacts;
