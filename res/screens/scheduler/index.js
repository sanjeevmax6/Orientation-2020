import React, {useState} from 'react';
import {Dimensions} from 'react-native';
import {
  ExpandableCalendar,
  CalendarProvider,
  WeekCalendar,
} from 'react-native-calendars';
import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';
import * as Colors from '../../utils/colors';
import {scale, verticalScale, ScaledSheet} from 'react-native-size-matters';
import {
  fontSizeBig,
  fontSizeMedium,
  fontSizeSmall,
  fontSizeVeryLarge,
  iconMedium,
  paddingSmall,
} from '../../utils/UIConstants';
import * as defaultStyle from '../../../node_modules/react-native-calendars/src/style';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FlatList} from 'react-native-gesture-handler';
import {View} from 'react-native-animatable';
import EventCard from './EventCard';
import Icon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';

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
        <LinearGradient
          start={{x: 0.0, y: 0.0}}
          end={{x: 1.0, y: 0.0}}
          colors={['#f13e4d', '#ff5130', '#ff512f']}>
          <CalendarStrip
            // ref={_calendar}
            scrollable
            calendarAnimation={{type: 'sequence', duration: 3000}}
            daySelectionAnimation={{
              type: 'background',
              duration: 0,
              borderWidth: scale(3),
              borderHighlightColor: Colors.daySelectionAnimationColor,
              borderRadius: scale(20),
            }}
            style={styles.calendarStripContainer}
            calendarHeaderStyle={styles.month}
            calendarColor={Colors.CalendarColor}
            dateNumberStyle={{
              color: Colors.dateNumberStyleColor,
              fontSize: fontSizeBig,
            }}
            dateNameStyle={{
              color: Colors.dateNameStyleColor,
              fontSize: fontSizeMedium,
            }}
            highlightDateNumberStyle={{
              color: Colors.highlightDateNumberStyleColor,
              fontSize: fontSizeBig,
            }}
            highlightDateNameStyle={{
              color: Colors.highlightDateNameStyleColor,
              fontSize: fontSizeSmall,
            }}
            disabledDateNameStyle={{
              color: Colors.disabledDateNameStyleColor,
              fontSize: fontSizeSmall,
            }}
            disabledDateNumberStyle={{
              color: Colors.disabledDateNumberStyleColor,
              fontSize: fontSizeBig,
            }}
            // datesWhitelist={datesWhitelist}
            leftSelector={
              <Icon
                name="chevron-left"
                color={Colors.PRIMARY}
                size={scale(25)}
              />
            }
            rightSelector={
              <Icon
                name="chevron-right"
                color={Colors.PRIMARY}
                size={scale(25)}
              />
            }
            iconContainer={{flex: 0.1}}
            onDateSelected={date => {
              // props.setSelectedDate(date.format('YYYY-MM-DD'));
            }}
          />
        </LinearGradient>
        <FlatList
          data={DATA}
          renderItem={eventcard}
          style={{flex: 1, marginVertical: verticalScale(5)}}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = ScaledSheet.create({
  calendarStripContainer: {
    width: '100%',
    height: Dimensions.get('window').height / 8,
    alignSelf: 'center',
    paddingTop: verticalScale(10),
    backgroundColor: Colors.CalendarStripcontainerColor,
  },
  dateContainer: {
    backgroundColor: Colors.dateContainerColor,
    color: Colors.BLACK,
    elevation: 10,
    borderWidth: scale(1),
    borderRadius: scale(30),
    borderColor: Colors.background_dark,
    fontSize: fontSizeVeryLarge,
    height: verticalScale(35),
    width: scale(35),
    justifyContent: 'center',
    alignItems: 'center',
  },
  month: {
    color: Colors.calendarHeaderStyleColor,
    fontSize: fontSizeMedium,
  },
});

export default Scheduler;
