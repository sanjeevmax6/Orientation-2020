import React, {useState, useRef} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {Layout, Icon} from '@ui-kitten/components';
import {SafeAreaView} from 'react-native';
import * as Colors from '../../utils/colors';
import {Calendar} from 'react-native-calendars';
import {
  fontSizeBig,
  fontSizeMedium,
  fontSizeSmall,
  iconMedium,
  paddingSmall,
  paddingMedium,
  paddingBig,
  borderRadiusLarge,
  academicCalendarCardHeight,
} from '../../utils/UIConstants';
import moment from 'moment';
import {scale, verticalScale} from 'react-native-size-matters';
import AcademicCalendarCard from '../../components/academicCalendar-card';
import * as academicCalendarNotices from '../../utils/academicCalendarNotices';
import {toComputedKey} from '@babel/types';

function indianTime(date) {
  var adjustedDate =
    new Date(date).getTime() - new Date(date).getTimezoneOffset() * 60000;
  return adjustedDate;
}

const data = {
  //Minimum Date : 1st October 2021
  minDay: indianTime(new Date(2021, 9, 1)),
  //Maximum Date : 30th April 2022
  maxDay: indianTime(new Date(2022, 3, 30)),
  //Current Date :
  currentDay: moment(indianTime(new Date())).format('YYYY-MM-DD'),
  //Title:
  title: 'Academic Calendar',
};

//Function to find all Sundays between Min Day and Max Day
function getDaysBetweenDates(start, end, dayName) {
  var sundayHoliday = {};
  var result = [];
  var days = {sun: 0, mon: 1, tue: 2, wed: 3, thu: 4, fri: 5, sat: 6};
  var day = days[dayName.toLowerCase().substr(0, 3)];
  var current = new Date(start);
  current.setDate(current.getDate() + ((day - current.getDay() + 7) % 7));
  while (current < end) {
    result.push(moment(+current).format('YYYY-MM-DD'));
    current.setDate(current.getDate() + 7);
  }
  result.forEach(date => {
    sundayHoliday[date] = {
      selected: true,
      selectedColor: Colors.HolidayColor,
    };
  });
  return sundayHoliday;
}

//Function to find the current Notice or the upcoming notice
function getCurrentNotice(date) {
  var i = 0;

  while (i < academicCalendarNotices.notices.length) {
    if (academicCalendarNotices.notices[i].multipleDate) {
      if (academicCalendarNotices.notices[i].endDate >= date) {
        console.log('1' + academicCalendarNotices.notices[i].endDate);
        console.log('2' + date);
        return i;
      }
    } else {
      if (academicCalendarNotices.notices[i].date >= date) {
        console.log('1' + academicCalendarNotices.notices[i].date);
        console.log('2' + date);
        return i;
      }
    }
    i++;
  }
  return 0;
}

const Timetable = () => {
  const _flatlist = useRef();
  const [selectedDate, setSelectedDate] = useState(data.currentDay);
  const [AcademicCalendarNoticeData, setAcademicCalendarNotices] = useState(
    academicCalendarNotices.notices,
  );
  const notice1Color = Colors.notice1Color;
  const notice2Color = Colors.notice2Color;
  const notice3Color = Colors.notice3Color;
  const intialIndex = getCurrentNotice(indianTime(new Date()));

  //Function to check if notice is over or not
  for (var i = 0; i < AcademicCalendarNoticeData.length; i++) {
    if (AcademicCalendarNoticeData[i].multipleDate) {
      if (AcademicCalendarNoticeData[i].endDate < indianTime(new Date())) {
        AcademicCalendarNoticeData[i].deadlineOver = true;
      }
    } else {
      if (AcademicCalendarNoticeData[i].date < indianTime(new Date())) {
        AcademicCalendarNoticeData[i].deadlineOver = true;
      }
    }
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.Grey}}>
      <Layout style={{flex: 1}}>
        <Calendar
          style={{marginTop: verticalScale(-paddingSmall / 2)}}
          minDate={data.minDay}
          maxDate={data.maxDay}
          onDayPress={day => {
            setSelectedDate(day.dateString),
              _flatlist.current.scrollToIndex({
                index: getCurrentNotice(new Date(day.dateString)),
              });
          }}
          hideExtraDays={true}
          firstDay={1}
          showWeekNumbers={true}
          enableSwipeMonths={true}
          markingType="multi-period"
          markedDates={{
            //Sundays are Marked as Holidays
            ...getDaysBetweenDates(data.minDay, data.maxDay, 'Sun'),
            [selectedDate]: {
              selected: true,
              selectedColor: Colors.selectedDayBackgroundColor,
            },
            '2021-11-11': {
              selectedColor: Colors.selectedDayBackgroundColor,
              periods: [
                {startingDay: true, endingDay: false, color: notice1Color},
                {color: Colors.Transparent},
                {startingDay: true, endingDay: true, color: notice2Color},
              ],
            },
            '2021-11-12': {
              selectedColor: Colors.selectedDayBackgroundColor,
              periods: [
                {
                  startingDay: false,
                  endingDay: false,
                  color: notice1Color,
                },
              ],
            },
            '2021-11-13': {
              selectedColor: Colors.selectedDayBackgroundColor,
              periods: [
                {
                  startingDay: false,
                  endingDay: true,
                  color: notice1Color,
                },
              ],
            },
          }}
          theme={{
            arrowColor: Colors.Secondary,
            todayTextColor: Colors.todayTextColor,
            textSectionTitleColor: Colors.Tertiary,
            textMonthFontSize: scale(fontSizeBig + 2),
            textDayHeaderFontSize: scale(fontSizeMedium),
            textDayFontSize: scale(fontSizeMedium),
            selectedDayBackgroundColor: Colors.selectedDayBackgroundColor,
            selectedDayTextColor: Colors.White,
            'stylesheet.calendar.header': {
              dayTextAtIndex6: {
                color: Colors.Secondary,
              },
            },
            //style
            //disableArrowLeft={true}
            //disableArrowRight={true}
            //onDayPress=
          }}
        />
        <View style={styles.legendContainer}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                marginTop: verticalScale(3),
              }}>
              <View
                style={[styles.line, {backgroundColor: Colors.notice1Color}]}
              />
              <View
                style={[styles.line, {backgroundColor: Colors.Transparent}]}
              />
              <View
                style={[styles.line, {backgroundColor: Colors.notice2Color}]}
              />
              <View
                style={[styles.line, {backgroundColor: Colors.Transparent}]}
              />
              <View
                style={[styles.line, {backgroundColor: Colors.notice3Color}]}
              />
            </View>
            <Text style={styles.legendText}> : Notices</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={styles.circle} />
            <Text style={styles.legendText}> : Holiday</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity>
              <Icon
                style={styles.downloadIcon}
                fill={Colors.Tertiary}
                name="download-outline"
              />
            </TouchableOpacity>
            <Text style={styles.legendText}> : PDF</Text>
          </View>
        </View>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <View style={styles.todayTextContainer}>
            <Text style={styles.todayTitleText}>Today : </Text>
            <Text style={styles.todayText}>{moment().format('MMM Do')}</Text>
          </View>
          <View style={{flex: 1}}>
            <FlatList
              ref={ref => (_flatlist.current = ref)}
              nestedScrollEnable={true}
              data={AcademicCalendarNoticeData}
              getItemLayout={(data, index) => ({
                length: verticalScale(academicCalendarCardHeight),
                // Offset:Length of one card (height+margin)
                offset:
                  verticalScale(
                    academicCalendarCardHeight + paddingMedium / 2,
                  ) * index,
                index,
              })}
              initialScrollIndex={intialIndex}
              keyExtractor={item => item.index}
              style={{
                marginBottom: verticalScale(paddingMedium),
              }}
              bounces={false}
              bouncesZoom={false}
              renderItem={({item, index}) => (
                <View>
                  <AcademicCalendarCard notice={item} />
                </View>
              )}
            />
          </View>
        </View>
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  downloadIcon: {
    width: scale(iconMedium),
    height: verticalScale(iconMedium),
  },
  legendContainer: {
    marginVertical: verticalScale(7),
    paddingBottom: verticalScale(paddingSmall / 2),
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  iconLegend: {
    width: scale(iconMedium),
    height: verticalScale(iconMedium),
  },
  circle: {
    width: scale(25),
    height: scale(25),
    borderRadius: scale(25 / 2),
    backgroundColor: Colors.HolidayColor,
  },
  legendText: {
    fontSize: scale(fontSizeSmall),
    color: Colors.Black,
  },
  line: {
    height: verticalScale(2),
    width: scale(25),
    borderRadius: scale(borderRadiusLarge),
  },
  todayTextContainer: {
    flexDirection: 'row',
    marginHorizontal: scale(paddingBig - paddingSmall),
    alignItems: 'center',
    marginBottom: verticalScale(paddingSmall),
  },
  todayTitleText: {
    fontWeight: 'bold',
    fontSize: scale(fontSizeMedium),
    color: Colors.Black,
  },
  todayText: {
    fontSize: scale(fontSizeMedium),
    color: Colors.Secondary,
  },
});

export default Timetable;
