import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Icon} from '@ui-kitten/components';
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
} from '../../utils/UIConstants';
import moment from 'moment';
import {scale, verticalScale} from 'react-native-size-matters';
import AcademicCalendarCard from '../../components/academicCalendar-card';
import * as academicCalendarNotices from '../../utils/academicCalendarNotices';

const data = {
  //Minimum Date : 1st October 2021
  minDay: new Date(2021, 9, 1),
  //Maximum Date : 30th April 2022
  maxDay: new Date(2022, 3, 30),
  //Current Date :
  currentDay: moment().format('YYYY-MM-DD'),
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

const Timetable = () => {
  const [selectedDate, setSelectedDate] = useState(data.currentDay);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.White}}>
      <ScrollView>
        <Calendar
          style={{marginTop: verticalScale(-paddingSmall / 2)}}
          minDate={data.minDay}
          maxDate={data.maxDay}
          onDayPress={day => setSelectedDate(day.dateString)}
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
                {startingDay: true, endingDay: true, color: Colors.Black},

                {color: Colors.Transparent},
                {startingDay: true, endingDay: false, color: Colors.Accent},
              ],
            },
            '2021-11-12': {
              selectedColor: Colors.selectedDayBackgroundColor,
              periods: [
                {
                  startingDay: false,
                  endingDay: false,
                  color: Colors.Accent,
                },
              ],
            },
            '2021-11-13': {
              selectedColor: Colors.selectedDayBackgroundColor,
              periods: [
                {
                  startingDay: false,
                  endingDay: true,
                  color: Colors.Accent,
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
              <View style={[styles.line, {backgroundColor: Colors.Accent}]} />
              <View
                style={[styles.line, {backgroundColor: Colors.Transparent}]}
              />
              <View style={[styles.line, {backgroundColor: Colors.Black}]} />
              <View
                style={[styles.line, {backgroundColor: Colors.Transparent}]}
              />
              <View
                style={[styles.line, {backgroundColor: Colors.Secondary}]}
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
        <View style={{flex: 1}}>
          <View style={styles.todayTextContainer}>
            <Text style={styles.todayTitleText}>Today : </Text>
            <Text style={styles.todayText}>{moment().format('MMM D')}</Text>
          </View>

          {academicCalendarNotices.notices.map(notice => (
            <AcademicCalendarCard notice={notice} />
          ))}
        </View>
      </ScrollView>
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
