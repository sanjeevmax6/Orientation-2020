import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Text,
  Alert,
  Linking,
  Pressable,
} from 'react-native';
import CustomAlert from '../../components/customAlert';
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
  FONT,
  fontSizeMedium,
} from '../../utils/UIConstants';
import {UserData} from '../../mobx/userStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as KEYS from '../../utils/STORAGE_KEYS';
import VersionCheck from 'react-native-version-check';
import {APP_PLAYSTORE_URL} from '../../utils/APIConstants';
import {Dimensions} from 'react-native';
import {GAME_Store} from '../../mobx/gameStore';
import {leaderAPI} from '../game/leaderAPI.js';
import {observer} from 'mobx-react';
import {ScrollView} from 'react-native';

//Width is same as two normal mainmenu cards (width of normal card is 130) + the space between them
const gameCardWidth =
  (Dimensions.get('window').width - 2 * scale(130)) / 3 + 2 * scale(130);

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const MainMenu = observer(({navigation}) => {
  const [logoutVisible, setLogoutVisible] = useState(false);
  const [sideNavVisible, setSideNavVisible] = useState(false);
  const logOut = () => {
    Alert.alert(
      'Logout?',
      'You will return to login screen',
      [
        {
          text: 'NO',
          style: 'cancel',
        },
        {
          text: 'YES',
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
            UserData.setAdmin(false);
          },
        },
      ],
      {cancelable: false},
    );
  };


  let sideNavItemsList = [
    {name:"What's your club calling?", icon:'paper-plane-outline', key:3, onPress:()=>{ navigation.navigate('ClubCallingQuiz'); setSideNavVisible(false);}},
    {name: 'Feedback', icon: 'question-mark-circle-outline', key: 2},
    {
      name: 'Logout',
      icon: 'log-out-outline',
      onPress: () => {
        setSideNavVisible(false);
        logOut();
      },
      key: 7,
    },
  ];


  const data = {
    orientationTitle: 'Orientation 2021',
    studentName: UserData.userName,
    studentRollNo: UserData.userRollNo,
    studentBranch: UserData.userDepartment,
  };

  //To Check if Game Card should be rendered or not

  const isLeader = GAME_Store.getLeader;
  if (!GAME_Store.getLeaderAPISuccess) {
    leaderAPI();
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <Layout style={{flex: 1}}>
        <CustomAlert
          title={'Logout?'}
          message={'You will return to login screen'}
          modalVisible={logoutVisible}
          setModalVisible={setLogoutVisible}
          buttons={[
            {
              text: 'NO',
            },
            {
              text: 'YES',
              func: () => {
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
          ]}
        />
        {sideNavVisible && (
          <View style={styles.sideNav}>
            <View style={styles.sideNavTop}>
              <Text style={styles.sideNavHeading}>Orientation'22</Text>
            </View>
            {sideNavItemsList.map((item, i) => (
              <TouchableOpacity
                style={styles.sideNavItems}
                onPress={item.onPress}
                key={i}>
                <Icon
                  style={styles.iconDashBoard}
                  fill={Colors.Tertiary}
                  name={item.icon}
                />
                <Text style={styles.sideNavItemsText}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        {sideNavVisible && (
          <TouchableOpacity
            onPress={() => setSideNavVisible(false)}
            style={styles.sideNavRest}
            activeOpacity={0.5}></TouchableOpacity>
        )}

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
              <View style={styles.sideNavBarBtn}>
                <TouchableOpacity onPress={() => setSideNavVisible(true)}>
                  <Icon
                    style={styles.iconDashBoard}
                    fill={Colors.DashboardLogo}
                    name="menu-outline"
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.detailsContainer}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon
                  style={styles.iconDashBoard}
                  fill={Colors.DashboardLogo}
                  name="person-outline"
                />

                <Text numberOfLines={1} style={styles.textDashBoard}>
                  {data.studentName}
                </Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon
                  style={styles.iconDashBoard}
                  fill={Colors.DashboardLogo}
                  name="hash-outline"
                />
                <Text style={[styles.textDashBoard]}>{data.studentRollNo}</Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon
                  style={styles.iconDashBoard}
                  fill={Colors.DashboardLogo}
                  name="book-outline"
                />
                <Text numberOfLines={1} style={styles.textDashBoard}>
                  {data.studentBranch}
                </Text>
              </View>
            </View>
          </ImageBackground>
        </View>
        <ScrollView contentContainerStyle={styles.mainMenu}>
          <View style={styles.mainMenu}>
            {GAME_Store.getLeader ? (
              <View style={styles.cardRow}>
                <Card style={styles.gameCard}>
                  <Pressable
                    onPress={() => {
                      navigation.navigate('GameNavigator');
                    }}>
                    <ImageBackground
                      source={require('../../assets/images/gameImages/menu.png')}
                      style={{
                        height: verticalScale(80),
                        width: scale(gameCardWidth),
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}></ImageBackground>
                  </Pressable>
                </Card>
              </View>
            ) : null}
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
                      <Text style={styles.textMainMenu}>Events</Text>
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
                    navigation.navigate('Timetable');
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
              <Card style={styles.card6}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('MagazineAndSymposium');
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
            </View>
          </View>
        </ScrollView>
      </Layout>
    </SafeAreaView>
  );
});

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
  sideNavBarBtn: {
    marginTop: verticalScale(-30),
    paddingRight: scale(paddingSmall),
    alignItems: 'flex-start',
    paddingLeft: 5,
  },
  sideNav: {
    width: 300,
    backgroundColor: '#f2f2f2',
    zIndex: 2,
    position: 'absolute',
    height: windowHeight,
  },
  sideNavHeading: {
    fontSize: scale(fontSizeVeryLarge),
    fontWeight: '500',
  },
  sideNavTop: {
    padding: scale(10),
    paddingTop: scale(50),
    marginBottom: scale(15),
    backgroundColor: Colors.Tertiary,
  },
  sideNavRest: {
    height: windowHeight,
    position: 'absolute',
    width: windowWidth,
    backgroundColor: Colors.Black,
    zIndex: 1,
    opacity: 0.5,
  },
  sideNavItems: {
    margin: 15,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  sideNavItemsText: {
    paddingLeft: 10,
  },
  detailsContainer: {
    flex: 1,
    paddingLeft: scale(paddingSmall),
    justifyContent: 'center',
    paddingRight: scale(paddingSmall),
  },
  iconDashBoard: {
    width: scale(iconMedium),
    height: verticalScale(iconMedium),
  },
  orientationTitleText: {
    fontSize: scale(fontSizeVeryLarge),
    color: Colors.White,
    fontFamily: FONT,
  },
  textDashBoard: {
    fontSize: scale(fontSizeBig),
    color: Colors.White,
    fontFamily: FONT,
    flex: 1,
  },
  mainMenu: {
    flexGrow: 1,
    // backgroundColor: '#f2f2f2',
    justifyContent: 'center',
    paddingBottom: verticalScale(10),
    justifyContent: 'center',
  },
  cardGrid: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardRow: {
    flexDirection: 'row',
    // backgroundColor: '#f2f2f2',
    justifyContent: 'space-evenly',
  },
  card1: {
    marginTop: verticalScale(20),
    height: verticalScale(130),
    width: scale(130),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(borderRadiusLarge),
    backgroundColor: Colors.Card1Color,
    borderWidth: 0,
  },
  card2: {
    marginTop: verticalScale(20),
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
  gameCard: {
    marginTop: verticalScale(20),
    height: verticalScale(80),
    width: gameCardWidth,
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
    fontFamily: FONT,
  },
  iconMainMenu: {
    width: scale(iconLarge),
    height: verticalScale(iconLarge),
  },
});

export default MainMenu;
