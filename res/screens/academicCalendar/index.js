import React, {useState, useRef} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {Layout, Icon} from '@ui-kitten/components';
import {SafeAreaView, Animated} from 'react-native';
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
  iconSmall,
} from '../../utils/UIConstants';
import moment from 'moment';
import {scale, verticalScale} from 'react-native-size-matters';
import AcademicCalendarCard from '../../components/academicCalendar-card';
import * as academicCalendarNotices from '../../utils/academicCalendarNotices';

function indianTime(date) {
  var adjustedDate =
    new Date(date).getTime() - new Date(date).getTimezoneOffset() * 60000;
  return adjustedDate;
}

const data = {
  //Minimum Date : 1st October 2021
  minDay: new Date(2021, 9, 1),
  //Maximum Date : 30th April 2022
  maxDay: new Date(2022, 3, 30),
  //Current Date :
  currentDay: new Date(),
  //Title:
  title: 'Academic Calendar',
};

//Function to find the current Notice or the upcoming notice
function getCurrentNotice(date, AcademicCalendarNoticeData) {
  var i = 0;

  while (i < AcademicCalendarNoticeData.length) {
    if (AcademicCalendarNoticeData[i].multipleDate) {
      if (AcademicCalendarNoticeData[i].endDate >= date) {
        return i;
      }
    } else {
      if (AcademicCalendarNoticeData[i].date >= date) {
        return i;
      }
    }
    i++;
  }
  return 0;
}

//Function to check if notice is over or not
function checkDeadline(AcademicCalendarNoticeData) {
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
}

function undefinedCheck(MarkedDates, temp) {
  try {
    console.log('TRIED1' + temp);
    return MarkedDates[temp].periods;
  } catch {
    //DONT REMOVE THIS OR PROGRAM BREAKS
    console.log('SUCCESSFULY SKIPPED');
    return [];
  }
}

function undefinedCheck2(MarkedDates, temp) {
  try {
    console.log('TRIED2' + temp);
    return MarkedDates[temp].periods;
  } catch {
    //DONT REMOVE THIS OR PROGRAM BREAKS
    console.log('SUCCESSFULY SKIPPED2');
    return [];
  }
}

function undefinedCheck3(MarkedDates, temp) {
  try {
    console.log('TRIED3' + temp);
    return MarkedDates[temp].periods;
  } catch {
    //DONT REMOVE THIS OR PROGRAM BREAKS
    console.log('SUCCESSFULY SKIPPED3');
    return [];
  }
}

function markDates(AcademicCalendarNoticeData, MarkedDates) {
  for (var i = 0; i < AcademicCalendarNoticeData.length; i++) {
    //Marking Holidays
    if (AcademicCalendarNoticeData[i].holiday) {
      if (AcademicCalendarNoticeData[i].multipleDate) {
        var temp = new Date(AcademicCalendarNoticeData[i].startDate);
        while (temp <= AcademicCalendarNoticeData[i].endDate) {
          MarkedDates[moment(temp).format('YYYY-MM-DD')] = {
            selected: true,
            selectedColor: Colors.HolidayColor,
          };
          temp.setDate(temp.getDate() + 1);
        }
      } else {
        MarkedDates[
          moment(AcademicCalendarNoticeData[i].date).format('YYYY-MM-DD')
        ] = {
          selected: true,
          selectedColor: Colors.HolidayColor,
        };
      }
    } else {
      //Marking Notice Lines
      if (AcademicCalendarNoticeData[i].multipleDate) {
        var temp = new Date(AcademicCalendarNoticeData[i].startDate);
        while (temp <= AcademicCalendarNoticeData[i].endDate) {
          if (
            temp.getTime() == AcademicCalendarNoticeData[i].startDate.getTime()
          ) {
            MarkedDates[moment(temp).format('YYYY-MM-DD')] = {
              ...MarkedDates[moment(temp).format('YYYY-MM-DD')],
              periods: [
                ...undefinedCheck(
                  MarkedDates,
                  moment(temp).format('YYYY-MM-DD'),
                ),
                {
                  startingDay: true,
                  endingDay: false,
                  color: AcademicCalendarNoticeData[i].noticeLineColour,
                },
              ],
            };
          } else if (
            temp.getTime() == AcademicCalendarNoticeData[i].endDate.getTime()
          ) {
            MarkedDates[moment(temp).format('YYYY-MM-DD')] = {
              ...MarkedDates[moment(temp).format('YYYY-MM-DD')],
              periods: [
                ...undefinedCheck2(
                  MarkedDates,
                  moment(temp).format('YYYY-MM-DD'),
                ),
                {
                  startingDay: false,
                  endingDay: true,
                  color: AcademicCalendarNoticeData[i].noticeLineColour,
                },
              ],
            };
          } else {
            MarkedDates[moment(temp).format('YYYY-MM-DD')] = {
              ...MarkedDates[moment(temp).format('YYYY-MM-DD')],
              periods: [
                ...undefinedCheck3(
                  MarkedDates,
                  moment(temp).format('YYYY-MM-DD'),
                ),
                {
                  startingDay: false,
                  endingDay: false,
                  color: AcademicCalendarNoticeData[i].noticeLineColour,
                },
              ],
            };
          }
          temp.setDate(temp.getDate() + 1);
        }
      } else {
        MarkedDates[
          moment(AcademicCalendarNoticeData[i].date).format('YYYY-MM-DD')
        ] = {
          ...MarkedDates[
            moment(AcademicCalendarNoticeData[i].date).format('YYYY-MM-DD')
          ],
          periods: [
            ...undefinedCheck(
              MarkedDates,
              moment(AcademicCalendarNoticeData[i].date).format('YYYY-MM-DD'),
            ),
            {
              startingDay: true,
              endingDay: true,
              color: AcademicCalendarNoticeData[i].noticeLineColour,
            },
          ],
        };
      }
    }
  }

  //Marking Sundays
  var current = new Date(data.minDay);
  current.setDate(current.getDate() + ((0 - current.getDay() + 7) % 7));
  while (current < data.maxDay) {
    MarkedDates[moment(+current).format('YYYY-MM-DD')] = {
      ...MarkedDates[moment(+current).format('YYYY-MM-DD')],
      selected: true,
      selectedColor: Colors.HolidayColor,
    };
    current.setDate(current.getDate() + 7);
  }

  return MarkedDates;
}

const Timetable = () => {
  const _flatlist = useRef();
  const [selectedDate, setSelectedDate] = useState(data.currentDay);
  const [AcademicCalendarNoticeData, setAcademicCalendarNotices] = useState(
    academicCalendarNotices.notices,
  );
  checkDeadline(AcademicCalendarNoticeData);
  const intialIndex = getCurrentNotice(
    indianTime(new Date()),
    AcademicCalendarNoticeData,
  );

  var MarkedDates = {};
  const [showCalendar, setShowCalendar] = useState(true);
  const maxHeight = verticalScale(400);
  const animation = useRef(new Animated.Value(maxHeight)).current;
  const [icon, setIcon] = useState('eye-slash');

  const toggle = () => {
    var ht = 0;
    setIcon('eye');
    if (!showCalendar) {
      ht = maxHeight;
      setIcon('eye-slash');
    }

    Animated.spring(animation, {
      toValue: ht,
      useNativeDriver: false,
    }).start();
    setShowCalendar(!showCalendar);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.Grey}}>
      <Layout style={{flex: 1}}>
        <Animated.View style={[{height: animation}]}>
          <View
            onLayout={event => {
              console.log(event.nativeEvent.layout.height);
              var ht = event.nativeEvent.layout.height;
              Animated.spring(animation, {
                toValue: ht,
                useNativeDriver: false,
              }).start();
            }}>
            {showCalendar ? (
              <>
                <Calendar
                  style={{marginTop: verticalScale(-paddingSmall / 2)}}
                  minDate={data.minDay}
                  maxDate={data.maxDay}
                  onDayPress={day => {
                    setSelectedDate(day.dateString),
                      _flatlist.current.scrollToIndex({
                        index: getCurrentNotice(
                          new Date(day.dateString),
                          AcademicCalendarNoticeData,
                        ),
                      });
                  }}
                  hideExtraDays={true}
                  firstDay={1}
                  showWeekNumbers={true}
                  enableSwipeMonths={true}
                  markingType="multi-period"
                  markedDates={{
                    ...markDates(AcademicCalendarNoticeData, MarkedDates),
                    [selectedDate]: {
                      ...MarkedDates[selectedDate],
                      selected: true,
                      selectedColor: Colors.selectedDayBackgroundColor,
                    },
                  }}
                  theme={{
                    arrowColor: Colors.Secondary,
                    todayTextColor: Colors.todayTextColor,
                    textSectionTitleColor: Colors.Tertiary,
                    textMonthFontSize: scale(fontSizeBig + 2),
                    textDayHeaderFontSize: scale(fontSizeMedium),
                    textDayFontSize: scale(fontSizeMedium),
                    selectedDayBackgroundColor:
                      Colors.selectedDayBackgroundColor,
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
                      <View
                        style={[
                          styles.line,
                          {backgroundColor: Colors.notice1Color},
                        ]}
                      />
                      <View
                        style={[
                          styles.line,
                          {backgroundColor: Colors.Transparent},
                        ]}
                      />
                      <View
                        style={[
                          styles.line,
                          {backgroundColor: Colors.notice2Color},
                        ]}
                      />
                      <View
                        style={[
                          styles.line,
                          {backgroundColor: Colors.Transparent},
                        ]}
                      />
                      <View
                        style={[
                          styles.line,
                          {backgroundColor: Colors.notice3Color},
                        ]}
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
              </>
            ) : null}
          </View>
        </Animated.View>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <TouchableOpacity
            style={styles.todayTextandDropDownContainer}
            onPress={toggle}>
            <View style={styles.todayTextContainer}>
              <Text style={styles.todayTitleText}>Today : </Text>
              <Text style={styles.todayText}>{moment().format('MMM Do')}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Icon
                name="calendar-alt"
                style={styles.hideCalendarIcons}
                pack="FontAwesome5"
              />
              <Text> : </Text>
              <TouchableOpacity onPress={toggle}>
                <Icon
                  name={icon}
                  style={styles.hideCalendarIcons}
                  pack="FontAwesome5"
                />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
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
                marginBottom: verticalScale(paddingSmall),
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
    marginTop: verticalScale(7),
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
  todayTextandDropDownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: verticalScale(paddingSmall),
    marginHorizontal: scale(paddingMedium + paddingSmall),
  },
  todayTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: scale(paddingMedium),
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
  hideCalendarIcons: {
    height: verticalScale(iconSmall),
    marginHorizontal: scale(paddingSmall / 2),
  },
});

export default Timetable;

// //Function to get holidays and mark on calendar
// function markHoliday() {
//   var holiday = {};
//   var result = [];
//   for (var i = 0; i < AcademicCalendarNoticeData.length; i++) {
//     if (AcademicCalendarNoticeData[i].holiday) {
//       if (AcademicCalendarNoticeData[i].multipleDate) {
//         var temp = new Date(AcademicCalendarNoticeData[i].startDate);
//         while (temp <= AcademicCalendarNoticeData[i].endDate) {
//           result.push(moment(+temp).format('YYYY-MM-DD'));
//           temp.setDate(temp.getDate() + 1);
//         }
//       } else {
//         result.push(
//           moment(+AcademicCalendarNoticeData[i].date).format('YYYY-MM-DD'),
//         );
//       }
//     }
//   }
//   result.forEach(date => {
//     holiday[date] = {
//       selected: true,
//       selectedColor: Colors.HolidayColor,
//     };
//   });
//   return holiday;
// }

//Function to find all Sundays between Min Day and Max Day
// function getDaysBetweenDates(start, end, dayName) {
//   var sundayHoliday = {};
//   var result = [];
//   var days = {sun: 0, mon: 1, tue: 2, wed: 3, thu: 4, fri: 5, sat: 6};
//   var day = days[dayName.toLowerCase().substr(0, 3)];
//   var current = new Date(start);
//   current.setDate(current.getDate() + ((day - current.getDay() + 7) % 7));
//   while (current < end) {
//     result.push(moment(+current).format('YYYY-MM-DD'));
//     current.setDate(current.getDate() + 7);
//   }
//   result.forEach(date => {
//     sundayHoliday[date] = {
//       selected: true,
//       selectedColor: Colors.HolidayColor,
//     };
//   });
//   return sundayHoliday;
// }
