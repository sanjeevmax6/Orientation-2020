import React from 'react';
import {
  ExpandableCalendar,
  CalendarProvider,
  WeekCalendar,
} from 'react-native-calendars';
import moment from 'moment';
import * as Colors from '../../utils/colors';
import {scale, verticalScale} from 'react-native-size-matters';
import {
  fontSizeBig,
  fontSizeMedium,
  fontSizeSmall,
  iconMedium,
  paddingSmall,
} from '../../utils/UIConstants';
import * as defaultStyle from '../../../node_modules/react-native-calendars/src/style';

const data = {
  //Minimum Date : 1st October 2021
  minDay: new Date(2021, 9, 1),
  //Maximum Date : 30th April 2022
  maxDay: new Date(2022, 3, 30),
  //Current Date :
  currentDay: moment().format('YYYY-MM-DD'),
};

//dots for markedDates
const event1 = {color: Colors.dotColor1};
const event2 = {color: Colors.dotColor2};
const event3 = {color: Colors.dotColor3};

const Scheduler = () => {
  const appStyle = {...defaultStyle};
  return (
    <CalendarProvider date={data.currentDay}>
      <ExpandableCalendar
        minDate={data.minDay}
        maxDate={data.maxDay}
        firstDay={1}
        theme={{
          //arrows
          arrowColor: Colors.Secondary,
          'stylesheet.expandable': {},
          // 'stylesheet.day.basic': {},
          'stylesheet.calendar.header': {
            dayTextAtIndex6: {
              color: Colors.Secondary,
            },
          },
          //days
          textDayHeaderFontSize: scale(fontSizeMedium),
          textSectionTitleColor: Colors.Tertiary,
          //dates
          textDayFontSize: scale(fontSizeMedium),
          selectedDayTextColor: '#FFFFFF',
          selectedDayBackgroundColor: Colors.selectedDayBackgroundColor,
          todayTextColor: Colors.todayTextColor,
          //month
          textMonthFontSize: scale(fontSizeBig + 3),
          // disabled date
          textDisabledColor: Colors.Grey,
          //dotStyle
          dotStyle: {
            width: scale(5.25),
            height: scale(5.25),
          },
        }}
        markingType={'multi-dot'}
        markedDates={{
          '2021-10-14': {
            dots: [event1, event2, event3],
          },
          '2021-10-25': {
            dots: [event1, event2, event3],
          },
          '2021-10-26': {dots: [event1, event2]},
        }}
      />
    </CalendarProvider>
  );
};

export default Scheduler;
