import React, {useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Card, Text, Icon} from '@ui-kitten/components';
import * as Colors from '../utils/colors';
import {
  fontSizeBig,
  fontSizeMedium,
  fontSizeSmall,
  iconMedium,
  paddingSmall,
  paddingMedium,
  paddingLarge,
  borderRadiusMedium,
  borderRadiusLarge,
  borderRadiusBig,
  paddingBig,
} from '../utils/UIConstants';
import {scale, verticalScale} from 'react-native-size-matters';
import moment from 'moment';

const cardHeight = 75;

const AcademicCalendarCard = ({notice}) => {
  if (notice.multipleDate) {
    var startDate = notice.startDate;
    var endDate = notice.endDate;
  } else {
    var date = notice.date;
  }
  if (notice.key % 3 == 0) {
    var dateCardBackground = Colors.dateCardBackground1;
  } else if (notice.key % 3 == 1) {
    var dateCardBackground = Colors.dateCardBackground2;
  } else {
    var dateCardBackground = Colors.dateCardBackground3;
  }
  const noticeTitle = notice.noticeTitle;
  const noticeLineColour = notice.noticeLineColour;

  return (
    <View style={styles.container}>
      <View style={[styles.dateCard, {backgroundColor: dateCardBackground}]}>
        {notice.multipleDate ? (
          <Text style={styles.dateText}>
            {moment(startDate).format('DD')}-{moment(endDate).format('DD')}
          </Text>
        ) : (
          <Text style={styles.dateText}>{moment(date).format('DD')}</Text>
        )}

        <View
          style={[styles.noticeLine, {backgroundColor: noticeLineColour}]}
        />
      </View>
      <View style={styles.noticeContainer}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}
          showsVerticalScrollIndicator={false}>
          <Text style={styles.noticeText}>{noticeTitle}</Text>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: verticalScale(paddingMedium / 4),
    marginHorizontal: scale(paddingMedium),
    backgroundColor: Colors.Grey,
    height: verticalScale(cardHeight),
    borderRadius: scale(borderRadiusLarge),
  },
  dateCard: {
    height: verticalScale(cardHeight - 2 * paddingSmall),
    width: verticalScale(cardHeight - 2 * paddingSmall),
    borderRadius: scale(borderRadiusLarge),
    marginVertical: verticalScale(paddingSmall),
    marginLeft: verticalScale(paddingSmall),
    marginRight: verticalScale(paddingSmall / 2),
    justifyContent: 'center',
    alignItems: 'center',
    padding: scale(3),
  },
  dateText: {
    color: Colors.White,
    fontSize: scale(fontSizeMedium),
    textAlign: 'center',
  },
  noticeContainer: {
    flex: 1,
    backgroundColor: Colors.White,
    height: verticalScale(cardHeight - 2 * paddingSmall),
    borderRadius: scale(borderRadiusLarge),
    marginVertical: verticalScale(paddingSmall),
    marginRight: verticalScale(paddingSmall),
    marginLeft: verticalScale(paddingSmall / 2),
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: scale(paddingSmall),
  },
  noticeText: {
    fontWeight: 'bold',
    fontSize: scale(fontSizeSmall),
    textAlign: 'center',
  },
  noticeLine: {
    marginVertical: verticalScale(3),
    height: verticalScale(3),
    width: scale(40),
    borderRadius: scale(borderRadiusLarge),
  },
});

export default AcademicCalendarCard;
