import React from 'react';
import {Card, Icon, Text} from '@ui-kitten/components';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {paddingSmall} from '../utils/UIConstants';
import {scale, verticalScale} from 'react-native-size-matters';
import {Black} from '../utils/colors';

const AdminCard = ({data}) => {
  return (
    <SafeAreaView>
      <Card style={styles.card}>
        <View style={styles.cardContainer}>
          <Icon style={styles.icon} fill={Black} name="person" />
          <Text style={styles.text}>{data.name}</Text>
        </View>
        <View style={styles.cardContainer}>
          <Icon style={styles.icon} fill={Black} name="home" />
          <Text style={styles.text}>{data.position}</Text>
        </View>
        <View style={styles.cardContainer}>
          <Icon style={styles.icon} fill={Black} name="phone" />
          <Text style={styles.text}>{data.mobile}</Text>
        </View>
        {data.email && (
          <View style={styles.cardContainer}>
            <Icon style={styles.icon} fill={Black} name="email" />
            <Text style={styles.text}>{data.email}</Text>
          </View>
        )}
      </Card>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: verticalScale(5),
    marginHorizontal: scale(paddingSmall),
    backgroundColor: 'coral',
  },
  icon: {
    width: scale(20),
    height: verticalScale(20),
    marginRight: scale(paddingSmall),
  },
  cardContainer: {
    flexDirection: 'row',
  },
  text: {
    color: Black,
    fontStyle: 'normal',
  },
});

export default AdminCard;
