import React from 'react';
import {View, FlatList, StyleSheet, ScrollView} from 'react-native';
import {MenuGroup} from '@ui-kitten/components';
import Food from './food-card';
import {contactsStore} from '../mobx/contactsStore';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import {borderRadiusMedium, paddingSmall} from '../utils/UIConstants';
const footer = () => {
  return <View style={{height: verticalScale(10)}} />;
};
const FoodCard = () => {
  const data = contactsStore.state.foodData;
  return (
    <View>
      <MenuGroup style={styles.menuGroup} title={'Food'}>
        <FlatList
          removeClippedSubviews={false}
          data={data}
          renderItem={({item}) => <Food data={item} />}
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
    elevation: 3,
    borderRadius: scale(borderRadiusMedium),
  },
});

export default FoodCard;
