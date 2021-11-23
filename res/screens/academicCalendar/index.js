import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from 'react-native';
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
  borderRadiusLarge,
  academicCalendarCardHeight,
  iconSmall,
} from '../../utils/UIConstants';
import moment from 'moment';
import {scale, verticalScale} from 'react-native-size-matters';
import AcademicCalendarCard from '../../components/academicCalendar-card';
import {API_GET_NOTICE} from '../../utils/APIConstants';
import NetInfo from '@react-native-community/netinfo';
import ErrorScreen from '../../components/errorScreen';
import {ScrollView} from 'react-native-gesture-handler';
import {UserData} from '../../mobx/userStore';
import * as ERRORS from '../../utils/ERROR_MESSAGES';
import LoaderPage from '../LoadingScreen';
import axios from 'axios';

//To convert UTC to IST
function indianTime(date) {
  var adjustedDate =
    new Date(date).getTime() - new Date(date).getTimezoneOffset() * 60000;
  return new Date(adjustedDate);
}

const data = {
  //Minimum Date : 1st October 2021
  minDay: new Date(2021, 9, 1),
  //Maximum Date : 30th April 2022
  maxDay: new Date(2022, 3, 30),
  //Current Date :
  currentDay: indianTime(new Date()),
  //Title:
  title: 'Academic Calendar',
};

//Function to modify received data
function modifyData(data) {
  var noticesData = [];
  var i = 0;
  data.forEach(noticeObject => {
    var notice = {};
    notice['index'] = i;
    notice['noticeTitle'] = noticeObject.eventName;
    notice['holiday'] = noticeObject.holiday;
    var startDate = indianTime(new Date(noticeObject.startDate));
    var endDate = indianTime(new Date(noticeObject.endDate));
    if (startDate.getTime() == endDate.getTime()) {
      notice['multipleDate'] = false;
    } else {
      notice['multipleDate'] = true;
    }
    if (notice['multipleDate']) {
      notice['startDate'] = startDate;
      notice['endDate'] = endDate;
    } else {
      notice['date'] = startDate;
    }
    notice['deadlineOver'] = false;
    if (notice['holiday']) {
      notice['noticeLineColour'] = Colors.HolidayColor;
    } else {
      if (notice['index'] % 3 == 0) {
        notice['noticeLineColour'] = Colors.notice1Color;
      } else if (notice['index'] % 3 == 1) {
        notice['noticeLineColour'] = Colors.notice2Color;
      } else {
        notice['noticeLineColour'] = Colors.notice3Color;
      }
    }
    noticesData[i] = notice;
    i++;
  });
  return noticesData;
}

//Function to get the current Notice or the upcoming notice
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
  return i - 1;
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
    //console.log('TRIED' + temp);
    return MarkedDates[temp].periods;
  } catch {
    //DONT REMOVE THIS OR PROGRAM BREAKS
    //console.log('SUCCESSFULY SKIPPED');
    return [];
  }
}

//Function to markDates
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
                ...undefinedCheck(
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
                ...undefinedCheck(
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

const Timetable = ({navigation}) => {
  const [isLoading, setLoading] = useState(true);
  const [errorText, setErrorText] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isConnected, setConnectivity] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [data, setData] = useState([]);
  const [showCalendar, setShowCalendar] = useState(true);
  const [icon, setIcon] = useState('eye-slash');
  const [selectedDate, setSelectedDate] = useState(data.currentDay);

  const _flatlist = useRef();
  const maxHeight = verticalScale(400);
  var ht;
  const animation = useRef(new Animated.Value(maxHeight)).current;

  var MarkedDates = {};

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

  const handleAPICALL = () => {
    NetInfo.fetch().then(state => {
      if (state.isConnected == true) {
        setConnectivity(true);
        setLoading(true);
        axios
          .get(
            API_GET_NOTICE,
            // Token from Mobux
            {headers: {token: UserData.token}},
          )
          .then(response => {
            setLoading(false);
            setSuccess(true);
            //console.log('Academic Calendar API Success');
            setData(response.data.academicEvents);
          })
          .catch(error => {
            console.log(error);
            if (error.response) {
              console.log(error.response);
              setLoading(false);
              setSuccess(false);
              setErrorText(error.response.data.message);
            } else if (error.request) {
              console.log(error.request);
              setLoading(false);
              setSuccess(false);
              setErrorText(ERRORS.TIME_OUT);
            } else {
              console.log(error);
              setLoading(false);
              setSuccess(false);
              setErrorText(ERRORS.UNEXPECTED);
            }
          });
      } else {
        setSuccess(false);
        setConnectivity(false);
        setErrorText(ERRORS.NO_NETWORK);
      }
    });
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setLoading(false);
    setSuccess(false);
    handleAPICALL();
    setRefreshing(false);
  }, []);

  useEffect(() => {
    handleAPICALL();
  }, []);

  var AcademicCalendarNoticeData;
  var intialIndex;

  if (isLoading == false) {
    AcademicCalendarNoticeData = modifyData(data);
    checkDeadline(AcademicCalendarNoticeData);
    intialIndex = getCurrentNotice(
      indianTime(new Date()),
      AcademicCalendarNoticeData,
    );
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.Grey}}>
      <Layout style={{flex: 1, justifyContent: 'center'}}>
        {isConnected == false ? (
          //No Internet
          <ErrorScreen errorMessage={errorText} navigation={navigation} />
        ) : isLoading ? (
          <LoaderPage navigation={navigation} />
        ) : success ? (
          <>
            <Animated.View style={[{height: animation}]}>
              <View
                onLayout={event => {
                  //console.log(event.nativeEvent.layout.height);
                  ht = event.nativeEvent.layout.height;
                  Animated.spring(animation, {
                    toValue: ht,
                    useNativeDriver: false,
                  }).start();
                }}>
                {showCalendar ? (
                  <>
                    <ScrollView
                      showsVerticalScrollIndicator={false}
                      style={{maxHeight: ht}}
                      refreshControl={
                        <RefreshControl
                          refreshing={refreshing}
                          onRefresh={onRefresh}
                        />
                      }>
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
                    </ScrollView>
                    <View style={styles.legendContainer}>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
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
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View style={styles.circle} />
                        <Text style={styles.legendText}> : Holiday</Text>
                      </View>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
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
              <View style={styles.todayTextandDropDownContainer}>
                <View style={styles.todayTextContainer}>
                  <Text style={styles.todayTitleText}>Today : </Text>
                  <Text style={styles.todayText}>
                    {moment().format('MMM Do')}
                  </Text>
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
              </View>

              <View style={{flex: 1}}>
                <FlatList
                  ref={ref => (_flatlist.current = ref)}
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                    />
                  }
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
          </>
        ) : (
          <ErrorScreen errorMessage={errorText} navigation={navigation} />
        )}
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
