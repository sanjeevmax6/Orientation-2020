import React, {useState} from 'react';
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
import {SafeAreaView} from 'react-native-safe-area-context';
import {FlatList} from 'react-native-gesture-handler';
import {View} from 'react-native-animatable';
import EventCard from './EventCard';

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

const Scheduler = ({navigation}) => {
  const appStyle = {...defaultStyle};
  const [ht, setHt] = useState(verticalScale(402));
  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
      date: '20-02-2021',
      time: '15:00:00',
      duration: '2 hrs',
      links: [
        'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      ],
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
      date: '20-02-2021',
      time: '15:00:00',
      duration: '2 hrs',
      links: [
        'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      ],
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
      date: '20-02-2021',
      time: '15:00:00',
      duration: '2 hrs',
      links: [
        'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      ],
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e2972',
      title: 'Third Item',
      date: '20-02-2021',
      time: '15:00:00',
      duration: '2 hrs',
      links: [
        'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      ],
    },
  ];
  const eventcard = item => {
    return (
      <View>
        <EventCard item={item.item} navigation={navigation} />
      </View>
    );
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, height: ht}}>
        <CalendarProvider date={data.currentDay}>
          <View
            onLayout={event => {
              var h = event.nativeEvent.layout.height;
              setHt(h);
            }}>
            <ExpandableCalendar
              style={{
                marginTop: verticalScale(-paddingSmall / 2),
              }}
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
                  marginTop: verticalScale(-0.25),
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
          </View>
          <FlatList
            data={DATA}
            renderItem={eventcard}
            style={{flex: 1, marginVertical: verticalScale(5)}}
          />
        </CalendarProvider>
      </View>
    </SafeAreaView>
  );
};

export default Scheduler;
