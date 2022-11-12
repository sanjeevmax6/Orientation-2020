import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  ScrollView,
  Pressable,
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
  FONT,
  fontSizeVeryLarge,
} from '../../utils/UIConstants';
import moment from 'moment';
import {scale, verticalScale} from 'react-native-size-matters';
import AcademicCalendarCard from '../../components/academicCalendar-card';
import CustomAlert from '../../components/customAlert';
import {API_GET_NOTICE} from '../../utils/APIConstants';
import NetInfo from '@react-native-community/netinfo';
import ErrorScreen from '../../components/errorScreen';
import {UserData} from '../../mobx/userStore';
import * as ERRORS from '../../utils/ERROR_MESSAGES';
import LoaderPage from '../LoadingScreen';
import axios from 'axios';
import {Platform} from 'react-native';

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
    notice.index = i;
    notice.noticeTitle = noticeObject.eventName;
    notice.holiday = noticeObject.holiday;
    var startDate = indianTime(new Date(noticeObject.startDate));
    var endDate = indianTime(new Date(noticeObject.endDate));
    if (startDate.getTime() == endDate.getTime()) {
      notice.multipleDate = false;
    } else {
      notice.multipleDate = true;
    }
    if (notice.multipleDate) {
      notice.startDate = startDate;
      notice.endDate = endDate;
    } else {
      notice.date = startDate;
    }
    notice.deadlineOver = false;
    if (notice.holiday) {
      notice.noticeLineColour = Colors.HolidayColor;
    } else {
      if (notice.index % 3 == 0) {
        notice.noticeLineColour = Colors.notice1Color;
      } else if (notice.index % 3 == 1) {
        notice.noticeLineColour = Colors.notice2Color;
      } else {
        notice.noticeLineColour = Colors.notice3Color;
      }
    }
    noticesData[i] = notice;
    i++;
  });
  return noticesData;
}

//Function to get the initial Notice or the upcoming notice
function getInitialNotice(date, AcademicCalendarNoticeData) {
  var i = 0;

  while (i < AcademicCalendarNoticeData.length) {
    if (AcademicCalendarNoticeData[i].multipleDate) {
      if (
        new Date(
          AcademicCalendarNoticeData[i].endDate.valueOf() + 1000 * 3600 * 24,
        ) >= date
      ) {
        return i;
      }
    } else {
      if (
        new Date(
          AcademicCalendarNoticeData[i].date.valueOf() + 1000 * 3600 * 24,
        ) >= date
      ) {
        return i;
      }
    }
    i++;
  }
  return i - 1;
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
      if (
        new Date(
          AcademicCalendarNoticeData[i].endDate.valueOf() + 1000 * 3600 * 24,
        ) < indianTime(new Date())
      ) {
        AcademicCalendarNoticeData[i].deadlineOver = true;
      }
    } else {
      if (
        new Date(
          AcademicCalendarNoticeData[i].date.valueOf() + 1000 * 3600 * 24,
        ) < indianTime(new Date())
      ) {
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
  const [icon, setIcon] = useState('angle-up');
  const [calendarText, setCalendarText] = useState('Close Calendar');
  const [selectedDate, setSelectedDate] = useState(
    moment().format('YYYY-MM-DD'),
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');

  const _flatlist = useRef();
  const maxHeight = verticalScale(400);
  var ht;
  const animation = useRef(new Animated.Value(maxHeight)).current;

  var MarkedDates = {};

  const toggle = () => {
    var ht = 0;
    setIcon('angle-down');
    setCalendarText('Open Calendar');
    if (!showCalendar) {
      ht = maxHeight;
      setIcon('angle-up');
      setCalendarText('Close Calendar');
    }

    Animated.spring(animation, {
      toValue: ht,
      useNativeDriver: false,
    }).start();
    setShowCalendar(!showCalendar);
  };

  const handleAPICALL = () => {
    var url = UserData.getBaseUrl + API_GET_NOTICE;
    NetInfo.fetch().then(state => {
      if (state.isConnected === true) {
        setConnectivity(true);
        setLoading(true);
        axios
          .get(
            url,
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

  const onNoticePress = notice => {
    console.log(notice.date);
    const multipleDate = notice.multipleDate;
    if (multipleDate) {
      var startDate = notice.startDate;
      var endDate = notice.endDate;
    }
    var noticeTitle = multipleDate
      ? moment(startDate).format("Do MMM 'YY") +
        ' - ' +
        moment(endDate).format("Do MMM 'YY")
      : moment(notice.date).format("Do MMM 'YY");
    setModalTitle(noticeTitle);
    var noticeMessage = notice.holiday
      ? 'HOLIDAY: ' + notice.noticeTitle
      : notice.noticeTitle;
    setModalMessage(noticeMessage);
    setModalVisible(true);
  };

  useEffect(() => {
    handleAPICALL();
  }, []);

  var AcademicCalendarNoticeData;
  var intialIndex;

  if (isLoading == false) {
    AcademicCalendarNoticeData = modifyData(data);
    checkDeadline(AcademicCalendarNoticeData);
    intialIndex = getInitialNotice(
      indianTime(new Date()),
      AcademicCalendarNoticeData,
    );
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.Grey}}>
      <CustomAlert
        title={modalTitle}
        message={modalMessage}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        buttons={[
          {
            text: 'CLOSE',
          },
        ]}
      />
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
                        style={{marginTop: verticalScale(-paddingSmall / 3)}}
                        current={selectedDate}
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
                          textDayFontFamily: FONT,
                          textMonthFontFamily: FONT,
                          todayTextColor: Colors.todayTextColor,
                          textSectionTitleColor: Colors.Tertiary,
                          textMonthFontSize: verticalScale(fontSizeBig + 2),
                          textDayHeaderFontSize: verticalScale(fontSizeMedium),
                          textDayFontSize: verticalScale(fontSizeMedium),
                          selectedDayBackgroundColor:
                            Colors.selectedDayBackgroundColor,
                          selectedDayTextColor: Colors.White,
                          'stylesheet.calendar.header': {
                            dayTextAtIndex6: {
                              color: Colors.Secondary,
                            },
                          },
                          'stylesheet.calendar.main': {
                            week: {
                              marginVertical: verticalScale(0.5),
                              flexDirection: 'row',
                              justifyContent: 'center',
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
                            marginTop: verticalScale(0),
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

                              {alignItems: 'center'},
                            ]}
                          />
                          <View
                            style={[
                              styles.line,
                              {backgroundColor: Colors.notice3Color},
                            ]}
                          />
                        </View>
                        <Text style={styles.legendText}> Notices</Text>
                      </View>

                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View style={styles.circle} />
                        <Text style={styles.legendText}> Holiday</Text>
                      </View>
                    </View>
                    <View
                      style={{
                        height: 1,
                        marginTop: verticalScale(6),
                        marginRight: scale(15),
                        marginLeft: scale(15),
                        backgroundColor: '#d3d3d3',
                      }}
                    />
                  </>
                ) : null}
              </View>
            </Animated.View>

            <View style={{flex: 1, justifyContent: 'center'}}>
              <View style={styles.todayTextandDropDownContainer}>
                <View style={styles.todayTextContainer}>
                  <Icon
                    name="calendar-day"
                    style={styles.selectedDateIcon}
                    pack="FontAwesome5"
                  />
                  <Text style={styles.selectedDate}>
                    {moment(selectedDate).format('MMM Do')}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={toggle}
                  style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={styles.calendarText}> {calendarText} </Text>
                  <Icon
                    name={icon}
                    style={styles.hideCalendarIcon}
                    pack="FontAwesome5"
                  />
                </TouchableOpacity>
              </View>

              <View style={{flex: 1}}>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  ref={ref => (_flatlist.current = ref)}
                  refreshControl={
                    !showCalendar ? (
                      <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                      />
                    ) : null
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
                    <>
                      {Platform.OS === 'ios' ? (
                        <Pressable>
                          <AcademicCalendarCard notice={item} />
                        </Pressable>
                      ) : (
                        <Pressable onPress={() => onNoticePress(item)}>
                          <AcademicCalendarCard notice={item} />
                        </Pressable>
                      )}
                    </>
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
    //not scaled on purpose
    width: 25,
    height: 25,
    borderRadius: 25 / 2,
    backgroundColor: Colors.HolidayColor,
  },
  legendText: {
    fontSize: scale(fontSizeSmall),
    color: Colors.Black,
    fontFamily: FONT,
  },
  line: {
    height: verticalScale(2),
    width: scale(25),
    borderRadius: scale(borderRadiusLarge),
  },
  todayTextandDropDownContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: verticalScale(paddingSmall),
    marginHorizontal: scale(paddingMedium),
  },
  todayTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: scale(paddingMedium),
  },
  todayTitleText: {
    fontWeight: '900',
    fontSize: scale(fontSizeMedium),
    alignItems: 'center',
    color: Colors.Black,
    fontFamily: FONT,
  },
  selectedDate: {
    fontSize: scale(fontSizeMedium),
    color: Colors.selectedDayBackgroundColor,
    alignItems: 'center',
    fontFamily: FONT,
    marginLeft: scale(paddingSmall - 2),
  },
  selectedDateIcon: {
    height: scale(fontSizeMedium),
    width: scale(fontSizeMedium),
    color: Colors.selectedDayBackgroundColor,
  },
  calendarText: {
    fontSize: scale(fontSizeMedium),
    marginHorizontal: scale(paddingSmall),
    color: Colors.Black,
    fontFamily: FONT,
  },
  hideCalendarIcon: {
    height: scale(fontSizeMedium),
    width: scale(fontSizeMedium),
  },
});

export default Timetable;
