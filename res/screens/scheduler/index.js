import {
  Dimensions,
  RefreshControl,
  Platform,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';
import * as Colors from '../../utils/colors';
import {scale, verticalScale, ScaledSheet} from 'react-native-size-matters';
import {
  fontSizeBig,
  fontSizeMedium,
  fontSizeSmall,
  fontSizeVeryLarge,
} from '../../utils/UIConstants';
import * as defaultStyle from '../../../node_modules/react-native-calendars/src/style';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FlatList, ScrollView} from 'react-native';
import {View} from 'react-native-animatable';
import EventCard from './EventCard';
import Icon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import ErrorScreen from '../../components/errorScreen';
import LoaderPage from '../LoadingScreen';
import NoEventCard from './NoEventCard';
import {apiCall} from './ApiCall';
import {Icon as IC} from '@ui-kitten/components';
import {FONT} from '../../utils/UIConstants';

const data = {
  //Minimum Date : 1st October 2021
  minDay: new Date(2021, 9, 1),
  //Maximum Date : 30th April 2022
  maxDay: new Date(2022, 3, 30),
  //Current Date :
  currentDay: moment().format('YYYY-MM-DD'),
};

const Scheduler = ({navigation}) => {
  const appStyle = {...defaultStyle};
  const [responseState, setResponseState] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [selDate, setSelDate] = useState(new Date());

  const eventCard = item => {
    return (
      <View>
        <EventCard item={item.item} navigation={navigation} />
      </View>
    );
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setLoading(true);
    apiCall(setLoading, setError, setResponseState);
    setRefreshing(false);
  }, []);

  useEffect(() => {
    apiCall(setLoading, setError, setResponseState);
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      {error ? (
        <ErrorScreen navigation={navigation} errorMessage={error} />
      ) : loading ? (
        <LoaderPage navigation={navigation} />
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              colors={[Colors.background_dark]}
              onRefresh={onRefresh}
            />
          }
          ListEmptyComponent={NoEventCard}
          ListHeaderComponent={
            <>
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  paddingLeft: scale(4),
                  marginTop: verticalScale(9),
                  zIndex: 1,
                }}
                onPress={() => navigation.goBack()}>
                {Platform.OS === 'ios' ? (
                  <IC
                    fill="white"
                    style={{
                      width: verticalScale(30),
                      height: verticalScale(30),
                    }}
                    name="arrow-ios-back-outline"
                  />
                ) : (
                  <IC
                    fill="white"
                    style={{
                      width: verticalScale(30),
                      height: verticalScale(30),
                    }}
                    name="arrow-back-outline"
                  />
                )}
              </TouchableOpacity>
              <LinearGradient
                start={{x: 0.0, y: 0.0}}
                end={{x: 1.0, y: 0.0}}
                colors={['#f13e4d', '#ff5130', '#ff512f']}>
                <View style={{height: verticalScale(10)}} />
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
                    fontSize: scale(fontSizeBig - 2),
                    fontFamily: FONT,
                  }}
                  dateNameStyle={{
                    color: Colors.dateNameStyleColor,
                    fontSize: scale(fontSizeMedium - 2),
                    fontFamily: FONT,
                  }}
                  highlightDateNumberStyle={{
                    color: Colors.highlightDateNumberStyleColor,
                    fontSize: scale(fontSizeBig),
                    fontFamily: FONT,
                  }}
                  highlightDateNameStyle={{
                    color: Colors.highlightDateNameStyleColor,
                    fontSize: scale(fontSizeSmall),
                    fontFamily: FONT,
                  }}
                  disabledDateNameStyle={{
                    color: Colors.disabledDateNameStyleColor,
                    fontSize: scale(fontSizeSmall),
                    fontFamily: FONT,
                  }}
                  disabledDateNumberStyle={{
                    color: Colors.disabledDateNumberStyleColor,
                    fontSize: scale(fontSizeBig - 2),
                    fontFamily: FONT,
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
                    setSelDate(new Date(date));
                  }}
                  selectedDate={selDate}
                />
              </LinearGradient>
            </>
          }
          data={responseState.filter(item => {
            //console.log(item.date.toDateString());
            //console.log(selDate.toDateString);
            var date = new Date(item.date);
            return new Date(item.date).toDateString() == selDate.toDateString();
          })}
          renderItem={eventCard}
          style={{flex: 1}}
        />
      )}
    </SafeAreaView>
  );
};

const styles = ScaledSheet.create({
  calendarStripContainer: {
    width: '100%',
    height: Dimensions.get('window').height / 8,
    alignSelf: 'center',
    //paddingTop: verticalScale(10),
    backgroundColor: Colors.CalendarStripcontainerColor,
  },
  dateContainer: {
    backgroundColor: Colors.dateContainerColor,
    color: Colors.BLACK,
    elevation: 10,
    borderWidth: scale(1),
    borderRadius: scale(30),
    borderColor: Colors.background_dark,
    fontSize: scale(fontSizeVeryLarge),
    fontFamily: FONT,
    height: verticalScale(35),
    width: scale(35),
    justifyContent: 'center',
    alignItems: 'center',
  },
  month: {
    color: Colors.calendarHeaderStyleColor,
    fontSize: scale(20),
    fontFamily: FONT,
    fontWeight: '900',
    marginBottom: verticalScale(9),
    height: verticalScale(30),
  },
});

export default Scheduler;
