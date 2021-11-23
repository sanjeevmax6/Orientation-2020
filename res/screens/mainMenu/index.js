import React from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import {Layout, Card, Icon} from '@ui-kitten/components';
import * as Colors from '../../utils/colors';
import {scale, verticalScale} from 'react-native-size-matters';
import {SafeAreaView} from 'react-native';
import {
  borderRadiusLarge,
  fontSizeBig,
  paddingMedium,
  paddingSmall,
  iconLarge,
  iconMedium,
  fontSizeVeryLarge,
} from '../../utils/UIConstants';
import {UserData} from '../../mobx/userStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as KEYS from '../../utils/STORAGE_KEYS';

const MainMenu = ({navigation}) => {
  const logOut = () => {
    Alert.alert(
      'LOGOUT',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            AsyncStorage.removeItem(KEYS.USER_TOKEN);
            AsyncStorage.removeItem(KEYS.USER_DEPARTMENT);
            AsyncStorage.removeItem(KEYS.USER_NAME);
            AsyncStorage.removeItem(KEYS.USER_ROLL_NO);
            AsyncStorage.removeItem(KEYS.IS_USER_ADMIN);
            UserData.setToken('');
            UserData.setDepartment('');
            UserData.setName('');
            UserData.setRollNo('');
          },
        },
      ],
      {cancelable: false},
    );
  };

  const data = {
    orientationTitle: 'Orientation 2021',
    studentName: UserData.userName,
    studentRollNo: UserData.userRollNo,
    studentBranch: UserData.userDepartment,
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Layout style={{flex: 1}}>
        <View style={styles.dashboard}>
          <ImageBackground
            source={require('../../assets/images/dashboardBackground.png')}
            style={{
              flex: 1,
            }}
            resizeMode="cover">
            <View style={styles.headingContainer}>
              <View style={styles.orientationTitleContainer}>
                <Text style={styles.orientationTitleText}>
                  {data.orientationTitle}
                </Text>
              </View>
              <View style={styles.logoutContainer}>
                <TouchableOpacity onPress={() => logOut()}>
                  <Icon
                    style={styles.iconDashBoard}
                    fill={Colors.DashboardLogo}
                    name="log-out-outline"
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.detailsContainer}>
              <View style={{flexDirection: 'row'}}>
                <Icon
                  style={styles.iconDashBoard}
                  fill={Colors.DashboardLogo}
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
                  fill={Colors.DashboardLogo}
                  name="hash-outline"
                />
                <Text style={[styles.textDashBoard, {marginLeft: scale(10)}]}>
                  {data.studentRollNo}
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Icon
                  style={styles.iconDashBoard}
                  fill={Colors.DashboardLogo}
                  name="book-outline"
                />
                <ScrollView
                  style={{height: verticalScale(25), marginLeft: scale(10)}}
                  horizontal={true}>
                  <Text style={styles.textDashBoard}>{data.studentBranch}</Text>
                </ScrollView>
              </View>
            </View>
          </ImageBackground>
        </View>
        <View style={styles.mainMenu}>
          <View style={styles.cardRow}>
            <Card style={styles.card1}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Scheduler');
                }}>
                <ImageBackground
                  source={require('../../assets/images/card1.jpg')}
                  style={{
                    height: verticalScale(130),
                    width: scale(130),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Icon
                      style={styles.iconMainMenu}
                      fill={Colors.White}
                      name="calendar-outline"
                    />
                  </View>
                  <View
                    style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={styles.textMainMenu}>Scheduler</Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            </Card>
            <Card style={styles.card2}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('VirtualMap');
                }}>
                <ImageBackground
                  source={require('../../assets/images/card2.jpg')}
                  style={{
                    height: verticalScale(90),
                    width: scale(130),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Icon
                      style={styles.iconMainMenu}
                      fill={Colors.White}
                      name="map-outline"
                    />
                  </View>
                  <View
                    style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={styles.textMainMenu}>Virtual Map</Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            </Card>
          </View>

          <View style={styles.cardRow}>
            <Card style={styles.card3}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Contacts');
                }}>
                <ImageBackground
                  source={require('../../assets/images/card3.jpg')}
                  style={{
                    height: verticalScale(90),
                    width: scale(130),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Icon
                      style={styles.iconMainMenu}
                      fill={Colors.White}
                      name="people-outline"
                    />
                  </View>
                  <View
                    style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={styles.textMainMenu}>Contacts</Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            </Card>
            <Card style={styles.card4}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('ClubsAndFests');
                }}>
                <ImageBackground
                  source={require('../../assets/images/card4.jpg')}
                  style={{
                    height: verticalScale(160),
                    width: scale(130),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Icon
                      style={styles.iconMainMenu}
                      fill={Colors.White}
                      name="bulb-outline"
                    />
                  </View>
                  <View
                    style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={styles.textMainMenu}>Clubs & Fests</Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            </Card>
          </View>

          <View style={styles.cardRow}>
            <Card style={styles.card5}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('MagazineAndSymposium');
                }}>
                <ImageBackground
                  source={require('../../assets/images/card5.jpg')}
                  style={{
                    height: verticalScale(140),
                    width: scale(130),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Icon
                      style={styles.iconMainMenu}
                      fill={Colors.White}
                      name="award-outline"
                    />
                  </View>
                  <View
                    style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={styles.textMainMenu}>Symposiums</Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            </Card>
            <Card style={styles.card6}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Timetable');
                }}>
                <ImageBackground
                  source={require('../../assets/images/card6.jpg')}
                  style={{
                    height: verticalScale(110),
                    width: scale(130),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Icon
                      style={styles.iconMainMenu}
                      fill={Colors.White}
                      name="browser-outline"
                    />
                  </View>
                  <View
                    style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={styles.textMainMenu}>Academic Calendar</Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
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
    marginTop: verticalScale(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutContainer: {
    marginTop: verticalScale(-30),
    paddingRight: scale(paddingSmall),
    alignItems: 'flex-end',
  },
  detailsContainer: {
    flex: 1,
    paddingLeft: scale(paddingMedium),
    justifyContent: 'center',
    paddingRight: scale(paddingMedium),
  },
  iconDashBoard: {
    width: scale(iconMedium),
    height: verticalScale(iconMedium),
  },
  orientationTitleText: {
    fontSize: scale(fontSizeVeryLarge),
    color: Colors.White,
  },
  textDashBoard: {
    fontSize: scale(fontSizeBig),
    color: Colors.White,
  },
  mainMenu: {
    flex: 1,
    backgroundColor: '#e7dada',
    justifyContent: 'center',
  },
  cardGrid: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardRow: {
    flexDirection: 'row',
    backgroundColor: '#e7dada',
    justifyContent: 'space-evenly',
  },
  card1: {
    height: verticalScale(130),
    width: scale(130),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(borderRadiusLarge),
    backgroundColor: Colors.Card1Color,
    borderWidth: 0,
  },
  card2: {
    height: verticalScale(90),
    width: scale(130),
    borderRadius: scale(borderRadiusLarge),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.Card2Color,
    borderWidth: 0,
  },
  card3: {
    height: verticalScale(90),
    width: scale(130),
    marginTop: verticalScale(20),
    justifyContent: 'center',
    borderRadius: scale(borderRadiusLarge),
    alignItems: 'center',
    backgroundColor: Colors.Card3Color,
    borderWidth: 0,
  },
  card4: {
    marginTop: verticalScale(-20),
    height: verticalScale(160),
    width: scale(130),
    justifyContent: 'center',
    borderRadius: scale(borderRadiusLarge),
    alignItems: 'center',
    backgroundColor: Colors.Card4Color,
    borderWidth: 0,
  },
  card5: {
    marginTop: verticalScale(-10),
    height: verticalScale(140),
    width: scale(130),
    borderRadius: scale(borderRadiusLarge),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.Card5Color,
    borderWidth: 0,
  },
  card6: {
    marginTop: verticalScale(20),
    height: verticalScale(110),
    width: scale(130),
    borderRadius: scale(borderRadiusLarge),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.Card6Color,
    borderWidth: 0,
  },
  textMainMenu: {
    textAlign: 'center',
    textAlignVertical: 'top',
    fontSize: scale(fontSizeBig),
    color: Colors.White,
  },
  iconMainMenu: {
    width: scale(iconLarge),
    height: verticalScale(iconLarge),
  },
});

export default MainMenu;
