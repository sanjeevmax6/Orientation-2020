import React, { useState } from 'react';
import {Layout, MenuGroup, Text} from '@ui-kitten/components';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import ContactCard from '../../components/contact-card';
import { borderRadiusLarge, paddingMedium, paddingSmall } from '../../utils/UIConstants';
import { Yellow } from '../../utils/colors';
import { ScrollView } from 'react-native-gesture-handler';
import AdminCard from '../../components/admin-card';
import { verticalScale } from 'react-native-size-matters';

const Admin = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Layout style={styles.container}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <MenuGroup title="Dean Office (Academic)" style={styles.menuGroup}>
          <AdminCard name='Dr. S. Shanmugam' post='Dean' phone='+91 34500 34500' email='dean@nitt.edu'/>
          <AdminCard name='Dr. V. Mariapan' post='Associate Dean' phone='0431 250 3418' email='vmari@nitt.edu'/>
          <AdminCard name='Dr. C .Mala' post='Associate Dean' phone='+91 23400 23400' email='phdacad@nitt.edu'/>
        </MenuGroup>
        <MenuGroup title="Dean Office(Student Welfare)" style={styles.menuGroup}>
        <AdminCard name='Dr. N Kumaresan' post='Dean' phone='+91 0431 2503160' email='deansw@nitt.edu'/>
        <AdminCard name='Mrs. R. Manjula' post='Associate Dean' phone='+91 51600 51600' email='manju@nitt.edu'/>
        </MenuGroup>
        <MenuGroup title="Dean Office(Institue Development)" style={styles.menuGroup}>
        <AdminCard name='Dr. S. Raman' post='Dean' phone='+91 34500 34500' email='deanid@nitt.edu'/>
        </MenuGroup>
        </ScrollView>
      </Layout>
    </SafeAreaView>
  );
};

const styles=StyleSheet.create(
  {
    menuGroup:{
      marginLeft:paddingMedium,
      marginRight:paddingMedium,
      marginTop:paddingMedium,
      marginBottom:paddingSmall,
      borderRadius:borderRadiusLarge,
      padding:paddingMedium,
      backgroundColor:Yellow,
      height:verticalScale(40),
    },
    container:{
      flex:1,
    },
  }
)

export default Admin;
