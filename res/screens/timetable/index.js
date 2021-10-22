import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Layout, Text, Icon } from "@ui-kitten/components";
import { SafeAreaView } from "react-native";
import * as Colors from "../../utils/colors";
import { Calendar } from "react-native-calendars";
import {
  borderRadiusLarge,
  fontSizeBig,
  fontSizeMedium,
  fontSizeSmall,
  iconLarge,
  iconMedium,
  iconSmall,
  paddingBig,
  paddingMedium,
  paddingSmall,
} from "../../utils/UIConstants";
import moment from "moment";
import { scale, verticalScale } from "react-native-size-matters";

const data = {
  //Minimum Date : 1st October 2021
  minDay: new Date(2021, 9, 1),
  //Maximum Date : 30th April 2022
  maxDay: new Date(2022, 3, 30),
  //Current Date :
  currentDay: moment().format("YYYY-MM-DD"),
  //Title:
  title: "Academic Calendar",
};

//Function to find all Sundays between Min Day and Max Day
function getDaysBetweenDates(start, end, dayName) {
  var sundayHoliday = {};
  var result = [];
  var days = { sun: 0, mon: 1, tue: 2, wed: 3, thu: 4, fri: 5, sat: 6 };
  var day = days[dayName.toLowerCase().substr(0, 3)];
  var current = new Date(start);
  current.setDate(current.getDate() + ((day - current.getDay() + 7) % 7));
  while (current < end) {
    result.push(moment(+current).format("YYYY-MM-DD"));
    current.setDate(current.getDate() + 7);
  }
  result.forEach((date) => {
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
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.Grey }}>
      <Layout>
        <View style={styles.headingContainer}>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Text style={styles.academicCalendarText}>{data.title}</Text>
          </View>
          <View style={styles.iconHeadingContainer}>
            <Icon
              style={styles.iconHeading}
              fill={Colors.Tertiary}
              name="download-outline"
            />
          </View>
        </View>
        <Calendar
          minDate={data.minDay}
          maxDate={data.maxDay}
          onDayPress={(day) => setSelectedDate(day.dateString)}
          hideExtraDays={true}
          firstDay={1}
          showWeekNumbers={true}
          enableSwipeMonths={true}
          markingType="multi-period"
          markedDates={{
            //Sundays are Marked as Holidays
            ...getDaysBetweenDates(data.minDay, data.maxDay, "Sun"),
            [selectedDate]: {
              selected: true,
              selectedColor: Colors.selectedDayBackgroundColor,
            },
            "2021-10-11": {
              periods: [
                { startingDay: true, endingDay: false, color: Colors.Accent },
                { color: Colors.Transparent },
                { startingDay: true, endingDay: true, color: Colors.Black },
              ],
            },
            "2021-10-12": {
              periods: [
                {
                  startingDay: false,
                  endingDay: false,
                  color: Colors.Accent,
                },
              ],
            },
            "2021-10-13": {
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
            todayTextColor: Colors.Tertiary,
            textSectionTitleColor: Colors.Tertiary,
            textMonthFontSize: scale(fontSizeBig),
            textDayHeaderFontSize: scale(fontSizeMedium - 1),
            selectedDayBackgroundColor: Colors.selectedDayBackgroundColor,
            selectedDayTextColor: "#FFFFFF",
            "stylesheet.calendar.header": {
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
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                flexDirection: "column",
                justifyContent: "center",
                marginTop: verticalScale(3),
              }}
            >
              <View style={[styles.line, { backgroundColor: Colors.Accent }]} />
              <View
                style={[styles.line, { backgroundColor: Colors.Transparent }]}
              />
              <View style={[styles.line, { backgroundColor: Colors.Black }]} />
              <View
                style={[styles.line, { backgroundColor: Colors.Transparent }]}
              />
              <View
                style={[styles.line, { backgroundColor: Colors.Secondary }]}
              />
            </View>
            <Text style={styles.legendText}> : Notices</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={styles.circle} />
            <Text style={styles.legendText}> : Holiday</Text>
          </View>
        </View>
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headingContainer: {
    height: verticalScale(25),
    marginTop: verticalScale(paddingSmall),
    justifyContent: "center",
  },
  academicCalendarText: {
    fontSize: scale(fontSizeBig),
    color: Colors.Black,
  },
  iconHeadingContainer: {
    marginTop: verticalScale(-25),
    paddingRight: scale(paddingSmall) + 3,
    alignItems: "flex-end",
  },
  iconHeading: {
    width: scale(iconMedium),
    height: verticalScale(iconMedium),
  },
  legendContainer: {
    paddingBottom: verticalScale(paddingSmall / 2),
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  iconLegend: {
    width: scale(iconMedium),
    height: verticalScale(iconMedium),
  },
  circle: {
    marginTop: verticalScale(2),
    width: scale(20),
    height: verticalScale(20),
    borderRadius: scale(20 / 2),
    backgroundColor: Colors.HolidayColor,
  },
  legendText: {
    fontSize: scale(fontSizeSmall),
    color: Colors.Black,
  },
  line: {
    height: verticalScale(2),
    width: scale(35),
  },
});

export default Timetable;
