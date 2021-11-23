import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {MenuGroup} from '@ui-kitten/components';
import AdminCard from './admin-card';
import {contactsStore} from '../mobx/contactsStore';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import {paddingSmall} from '../utils/UIConstants';

const GroupCard = ({category}) => {
  const data = contactsStore.state.adminData;
  const contacts = data.filter(contact => {
    return contact.category === category;
  });
  return (
    <View>
      <MenuGroup style={styles.menuGroup} title={category}>
        <FlatList
          data={contacts}
          renderItem={({item}) => <AdminCard data={item} />}
        />
      </MenuGroup>
    </View>
  );
};

const styles = StyleSheet.create({
  menuGroup: {
    marginHorizontal: scale(paddingSmall),
    marginVertical: verticalScale(paddingSmall),
    backgroundColor: 'whitesmoke',
    height: verticalScale(60),
    elevation: moderateScale(5),
  },
});

export default GroupCard;
