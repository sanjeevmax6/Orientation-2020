import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Text, Icon} from '@ui-kitten/components';
import * as Colors from '../utils/colors';
import {
  fontSizeMedium,
  fontSizeSmall,
  paddingSmall,
  paddingMedium,
  borderRadiusLarge,
  academicCalendarCardHeight,
  iconSmall,
  FONT,
} from '../utils/UIConstants';
import {scale, verticalScale} from 'react-native-size-matters';
import moment from 'moment';

const cardHeight = academicCalendarCardHeight;

const AcademicCalendarCard = ({notice}) => {
  const multipleDate = notice.multipleDate;
  if (multipleDate) {
    var startDate = notice.startDate;
    var endDate = notice.endDate;
  } else {
    var date = notice.date;
  }
  if (notice.index % 3 == 0) {
    var dateCardBackground = Colors.dateCardBackground1;
  } else if (notice.index % 3 == 1) {
    var dateCardBackground = Colors.dateCardBackground2;
  } else {
    var dateCardBackground = Colors.dateCardBackground3;
  }

  const noticeTitle = notice.noticeTitle;
  const noticeLineColour = notice.noticeLineColour;
  const deadlineOver = notice.deadlineOver;
  const holiday = notice.holiday;

  return (
    <View style={styles.container}>
      <View style={[styles.dateCard, {backgroundColor: dateCardBackground}]}>
        {/* Date based on single day notice or multiple day notice */}
        {multipleDate ? (
          <Text style={styles.dateText}>
            {moment(startDate).format('DD')}-{moment(endDate).format('DD')}
          </Text>
        ) : (
          <Text style={styles.dateText}>{moment(date).format('DD')}</Text>
        )}
        {/* Month based on single month or multiple month notice */}
        {multipleDate ? (
          moment(startDate).format('MM') == moment(endDate).format('MM') ? (
            <Text style={styles.monthText}>
              {moment(startDate).format('MMM')}
            </Text>
          ) : (
            <Text style={styles.monthText}>
              {moment(startDate).format('MMM')}-{moment(endDate).format('MMM')}
            </Text>
          )
        ) : (
          <Text style={styles.monthText}>{moment(date).format('MMM')}</Text>
        )}
      </View>
      <View style={[styles.noticeContainer]}>
        {/* <ScrollView
          contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}
          showsVerticalScrollIndicator={false}> */}
        <View
          style={[styles.noticeLine, {backgroundColor: noticeLineColour}]}
        />

        {holiday ? (
          <Text
            numberOfLines={2}
            style={[styles.noticeText, {color: Colors.HolidayColor}]}>
            HOLIDAY: {noticeTitle}
          </Text>
        ) : (
          <Text numberOfLines={2} style={styles.noticeText}>
            {noticeTitle}
          </Text>
        )}

        {/* </ScrollView> */}
      </View>
      {/* Tick Mark According to if notice is over or not */}
      {deadlineOver ? (
        <View style={styles.tickIconContainer}>
          <Icon name="check" style={styles.tickIcon} pack="FontAwesome5" />
        </View>
      ) : null}
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
    elevation: 1,
    alignItems: 'center',
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
    fontFamily: FONT,
  },
  monthText: {
    marginTop: verticalScale(-3),
    color: Colors.White,
    fontSize: scale(fontSizeSmall - 2),
    textAlign: 'center',
    fontFamily: FONT,
  },
  noticeContainer: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: Colors.White,
    height: verticalScale(cardHeight - 2 * paddingSmall),
    borderRadius: scale(borderRadiusLarge),
    marginVertical: verticalScale(paddingSmall),
    marginRight: verticalScale(paddingSmall),
    marginLeft: verticalScale(paddingSmall / 2),
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: verticalScale(paddingSmall),
    paddingRight: scale(paddingMedium),
  },
  noticeText: {
    fontWeight: 'bold',
    fontSize: scale(fontSizeSmall),
    textTransform: 'uppercase',
    fontFamily: FONT,
  },
  noticeLine: {
    marginVertical: verticalScale(3),
    height: verticalScale(cardHeight - 2 * paddingSmall - 2 * paddingSmall),
    width: scale(5),
    borderRadius: scale(borderRadiusLarge),
    marginLeft: scale(paddingSmall),
    marginRight: scale(5),
  },
  tickIconContainer: {
    backgroundColor: Colors.White,
    //height: verticalScale(cardHeight - 2 * paddingSmall),
    borderRadius: scale(borderRadiusLarge),
    padding: scale(paddingSmall / 3),
    marginRight: verticalScale(paddingSmall),

    justifyContent: 'center',
    alignItems: 'center',
  },
  tickIcon: {
    //width:verticalScale(iconSmall),
    height: verticalScale(iconSmall),
    color: Colors.tickColor,
  },
});

export default AcademicCalendarCard;
