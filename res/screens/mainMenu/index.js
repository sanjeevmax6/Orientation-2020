import React from 'react';
import {ScrollView, View, StyleSheet} from 'react-native';
import {Layout, Text, Card, Icon} from '@ui-kitten/components';
import * as Colors from '../../utils/colors';
import {scale, verticalScale} from 'react-native-size-matters';
import * as eva from '@eva-design/eva';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {AppNavigator} from '../../navigation/app-navigation';
import {SafeAreaView} from 'react-native';

const MainMenu = ({navigation}) => {
  const data = {
    orientationTitle: 'Orientation 2021',
    studentName: 'XYZ',
    studentRollNo: '10612000',
    studentBranch: 'CSE',
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <Layout style={{flex: 1}}>
        <View style={styles.dashboard}>
          <View style={styles.headingContainer}>
            <View style={styles.orientationTitleContainer}>
              <Text style={styles.orientationTitleText}>
                {data.orientationTitle}
              </Text>
            </View>
            <View style={styles.logoutContainer}>
              <Icon
                style={styles.iconDashBoard}
                fill={Colors.Tertiary}
                name="log-out-outline"
              />
            </View>
          </View>
          <View style={styles.detailsContainer}>
            <View style={{flexDirection: 'row'}}>
              <Icon
                style={styles.iconDashBoard}
                fill={Colors.Accent}
                name="person-outline"
              />
              <ScrollView
                style={{height: verticalScale(25), marginLeft: scale(10)}}
                horizontal={true}>
                <Text style={styles.textDashBoard}>{data.studentName}</Text>
              </ScrollView>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Icon
                style={styles.iconDashBoard}
                fill={Colors.Accent}
                name="hash-outline"
              />
              <Text style={[styles.textDashBoard, {marginLeft: scale(10)}]}>
                {data.studentRollNo}
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Icon
                style={styles.iconDashBoard}
                fill={Colors.Accent}
                name="book-outline"
              />
              <ScrollView
                style={{height: verticalScale(25), marginLeft: scale(10)}}
                horizontal={true}>
                <Text style={styles.textDashBoard}>{data.studentBranch}</Text>
              </ScrollView>
            </View>
          </View>
        </View>
        <View style={styles.mainMenu}>
          <View style={styles.cardRow}>
            <Card
              style={styles.card1}
              onPress={() => {
                navigation.navigate('Scheduler');
              }}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Icon
                  style={styles.iconMainMenu}
                  fill={Colors.Black}
                  name="calendar-outline"
                />
              </View>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text style={styles.textMainMenu}>Scheduler</Text>
              </View>
            </Card>
            <Card
              style={styles.card2}
              onPress={() => {
                navigation.navigate('VirtualMap');
              }}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Icon
                  style={styles.iconMainMenu}
                  fill={Colors.Black}
                  name="map-outline"
                />
              </View>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text style={styles.textMainMenu}>Virtual Map</Text>
              </View>
            </Card>
          </View>

          <View style={styles.cardRow}>
            <Card
              style={styles.card3}
              onPress={() => {
                navigation.navigate('Contacts');
              }}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Icon
                  style={styles.iconMainMenu}
                  fill={Colors.Black}
                  name="people-outline"
                />
              </View>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text style={styles.textMainMenu}>Contacts</Text>
              </View>
            </Card>
            <Card
              style={styles.card4}
              onPress={() => {
                navigation.navigate('ClubsAndFests');
              }}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Icon
                  style={styles.iconMainMenu}
                  fill={Colors.Black}
                  name="bulb-outline"
                />
              </View>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text style={styles.textMainMenu}>Clubs & Fests</Text>
              </View>
            </Card>
          </View>

          <View style={styles.cardRow}>
            <Card
              style={styles.card5}
              onPress={() => {
                navigation.navigate('MagazineAndSymposium');
              }}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Icon
                  style={styles.iconMainMenu}
                  fill={Colors.Black}
                  name="award-outline"
                />
              </View>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text style={styles.textMainMenu}>Magazine & Symposium</Text>
              </View>
            </Card>
            <Card
              style={styles.card6}
              onPress={() => {
                navigation.navigate('Timetable');
              }}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Icon
                  style={styles.iconMainMenu}
                  fill={Colors.Black}
                  name="browser-outline"
                />
              </View>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text style={styles.textMainMenu}>Timetable</Text>
              </View>
            </Card>
          </View>
        </View>
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  dashboard: {
    height: verticalScale(150),
    backgroundColor: Colors.Primary,
  },
  headingContainer: {
    height: verticalScale(50),
  },
  orientationTitleContainer: {
    marginTop: verticalScale(15),
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutContainer: {
    marginTop: verticalScale(-30),
    marginRight: scale(10),
    alignItems: 'flex-end',
  },
  detailsContainer: {
    flex: 1,
    marginLeft: scale(20),
    justifyContent: 'center',
    marginRight: scale(20),
  },
  iconDashBoard: {
    width: scale(25),
    height: verticalScale(25),
  },
  orientationTitleText: {
    fontSize: scale(25),
    color: Colors.White,
  },
  textDashBoard: {
    fontSize: scale(16),
    color: Colors.White,
  },
  mainMenu: {
    flex: 1,
    backgroundColor: Colors.White,
    justifyContent: 'center',
  },
  cardGrid: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardRow: {
    flexDirection: 'row',
    backgroundColor: Colors.White,
    justifyContent: 'center',
  },
  card1: {
    height: verticalScale(130),
    width: scale(130),
    justifyContent: 'center',
    borderRadius: 25,
    backgroundColor: Colors.Card1Color,
    borderWidth: 0,
    marginRight: scale(10),
  },
  card2: {
    height: verticalScale(90),
    width: scale(130),
    marginLeft: scale(10),
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.Card2Color,
    borderWidth: 0,
  },
  card3: {
    height: verticalScale(90),
    width: scale(130),
    marginRight: scale(10),
    marginTop: verticalScale(20),
    justifyContent: 'center',
    borderRadius: 25,
    alignItems: 'center',
    backgroundColor: Colors.Card3Color,
    borderWidth: 0,
  },
  card4: {
    marginTop: verticalScale(-20),
    height: verticalScale(160),
    width: scale(130),
    marginLeft: scale(10),
    justifyContent: 'center',
    borderRadius: 25,
    alignItems: 'center',
    backgroundColor: Colors.Card4Color,
    borderWidth: 0,
  },
  card5: {
    marginTop: verticalScale(-10),
    height: verticalScale(140),
    width: scale(130),
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.Card5Color,
    borderWidth: 0,
    marginRight: scale(10),
  },
  card6: {
    marginTop: verticalScale(20),
    height: verticalScale(110),
    width: scale(130),
    marginLeft: scale(10),
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.Card6Color,
    borderWidth: 0,
  },
  textMainMenu: {
    textAlign: 'center',
    textAlignVertical: 'top',
    fontSize: scale(15),
    color: Colors.Black,
  },
  iconMainMenu: {
    width: scale(40),
    height: verticalScale(40),
  },
});

export default MainMenu;
