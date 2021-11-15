import React from 'react';
import {Card, Icon, Layout, Text} from '@ui-kitten/components';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {borderRadius, paddingMedium, paddingSmall} from '../utils/UIConstants';
import {scale, verticalScale} from 'react-native-size-matters';
import {
  Black,
  BlueNavy,
  Card1Color,
  Card2Color,
  Card3Color,
  Card4Color,
  Card5Color,
  Card6Color,
  Coral,
  White,
} from '../utils/colors';

const AdminCard = props => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Layout>
        <Card style={styles.card}>
          <View style={styles.cardContainer}>
            <Icon style={styles.icon} fill={Black} name="person" />
            <Text style={styles.text}>{props.name}</Text>
          </View>
          <View style={styles.cardContainer}>
            <Icon style={styles.icon} fill={Black} name="home" />
            <Text>{props.post}</Text>
          </View>
          <View style={styles.cardContainer}>
            <Icon style={styles.icon} fill={Black} name="phone" />
            <Text>{props.phone}</Text>
          </View>
          <View style={styles.cardContainer}>
            <Icon style={styles.icon} fill={Black} name="email" />
            <Text>{props.email}</Text>
          </View>
        </Card>
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: borderRadius,
    marginTop: paddingSmall,
    marginLeft: paddingMedium,
    marginRight: paddingMedium,
    backgroundColor: Card5Color,
  },
  icon: {
    width: scale(20),
    height: verticalScale(20),
    marginRight: paddingSmall,
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
