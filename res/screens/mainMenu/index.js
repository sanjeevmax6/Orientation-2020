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
import {autoAction} from 'mobx/dist/internal';

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
    {
      name: "What's your club calling?",
      icon: 'paper-plane-outline',
      key: 3,
      onPress: () => {
        navigation.navigate('ClubCallingQuiz');
        setSideNavVisible(false);
      },
    },
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
    orientationTitle: 'Orientation 2022',
    studentName: UserData.userName,
    studentRollNo: UserData.userRollNo,
    studentBranch: UserData.userDepartment,
  };

  const title = {
    welcomeTitle: 'Welcome!',
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
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon
                  style={styles.iconDashBoard}
                  fill={Colors.Black}
                  name="person-outline"
                />

                <Text numberOfLines={1} style={styles.textDashBoard}>
                  {data.studentName}
                </Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon
                  style={styles.iconDashBoard}
                  fill={Colors.Black}
                  name="hash-outline"
                />
                <Text style={[styles.textDashBoard]}>{data.studentRollNo}</Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon
                  style={styles.iconDashBoard}
                  fill={Colors.Black}
                  name="book-outline"
                />
                <Text numberOfLines={1} style={styles.textDashBoard}>
                  {data.studentBranch}
                </Text>
              </View>
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
              height: verticalScale(120),
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
            <View>
              <Text
                style={{
                  marginLeft: scale(40),
                  fontSize: scale(20),
                  fontWeight: 'bold',
                }}>
                {title.welcomeTitle}
              </Text>
            </View>
            <View style={styles.cardRow}>
              <View style={styles.shadow}>
                <Card style={styles.card1}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('Scheduler');
                    }}>
                    <ImageBackground
                      source={require('../../assets/images/card1.png')}
                      style={{
                        height: verticalScale(70),
                        width: scale(110),
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}></ImageBackground>
                    <View
                      style={{justifyContent: 'center', alignItems: 'center'}}>
                      <Text style={styles.textMainMenu}>Events</Text>
                    </View>
                  </TouchableOpacity>
                </Card>
              </View>
              <View style={styles.shadow}>
                <Card style={styles.card2}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('VirtualMap');
                    }}>
                    <ImageBackground
                      source={require('../../assets/images/card2.png')}
                      style={{
                        height: verticalScale(70),
                        width: scale(100),
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}></ImageBackground>
                    <View
                      style={{justifyContent: 'center', alignItems: 'center'}}>
                      <Text style={styles.textMainMenu}>Virtual Map</Text>
                    </View>
                  </TouchableOpacity>
                </Card>
              </View>
            </View>

            <View style={styles.cardRow}>
              <View style={styles.shadow}>
                <Card style={styles.card3}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('Contacts');
                    }}>
                    <ImageBackground
                      source={require('../../assets/images/card3.png')}
                      style={{
                        height: verticalScale(70),
                        width: scale(110),
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}></ImageBackground>
                    <View
                      style={{
                        justifyContent: 'center',
                        marginTop: verticalScale(10),
                      }}>
                      <Text style={styles.textMainMenu}>Contacts</Text>
                    </View>
                  </TouchableOpacity>
                </Card>
              </View>
              <View style={styles.shadow}>
                <Card style={styles.card4}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('ClubsAndFests');
                    }}>
                    <ImageBackground
                      source={require('../../assets/images/card4.png')}
                      style={{
                        height: verticalScale(40),
                        width: scale(100),
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: verticalScale(25),
                      }}></ImageBackground>
                    <View
                      style={{
                        justifyContent: 'center',
                        marginTop: verticalScale(30),
                      }}>
                      <Text style={styles.textMainMenu}>Clubs & Fests</Text>
                    </View>
                  </TouchableOpacity>
                </Card>
              </View>
            </View>

            <View style={styles.cardRow}>
              <View style={styles.shadow}>
                <Card style={styles.card5}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('Timetable');
                    }}>
                    <ImageBackground
                      source={require('../../assets/images/card5.png')}
                      style={{
                        height: verticalScale(65),
                        width: scale(100),
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: verticalScale(10),
                      }}></ImageBackground>
                    <View
                      style={{
                        justifyContent: 'center',
                        marginTop: verticalScale(10),
                      }}>
                      <Text style={styles.textMainMenu}>Academic Calendar</Text>
                    </View>
                  </TouchableOpacity>
                </Card>
              </View>
              <View style={styles.shadow}>
                <Card style={styles.card6}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('MagazineAndSymposium');
                    }}>
                    <ImageBackground
                      source={require('../../assets/images/card6.png')}
                      style={{
                        height: verticalScale(80),
                        width: scale(55),
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: verticalScale(10),
                        marginLeft: scale(15),
                      }}></ImageBackground>
                    <View
                      style={{
                        justifyContent: 'center',
                        marginTop: verticalScale(5),
                      }}>
                      <Text style={styles.textMainMenu}>Symposiums</Text>
                    </View>
                  </TouchableOpacity>
                </Card>
              </View>
            </View>
          </View>
        </ScrollView>
      </Layout>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  dashboard: {
    height: verticalScale(90),
    backgroundColor: Colors.White,
  },
  headingContainer: {
    height: verticalScale(90),
  },
  orientationTitleContainer: {
    marginTop: verticalScale(30),
    marginLeft: scale(35),
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  sideNavBarBtn: {
    marginTop: verticalScale(-50),
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
    backgroundColor: Colors.Coral,
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
    color: Colors.Black,
    fontFamily: FONT,
  },
  textDashBoard: {
    fontSize: scale(fontSizeBig),
    color: Colors.Black,
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
    height: verticalScale(140),
    width: scale(140),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(borderRadiusLarge),
    borderWidth: scale(0.2),
    borderColor: Colors.Tertiary,
  },
  card2: {
    marginTop: verticalScale(20),
    height: verticalScale(140),
    width: scale(140),
    borderRadius: scale(borderRadiusLarge),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.White,
    borderWidth: scale(0.2),
    borderColor: Colors.Tertiary,
  },
  card3: {
    height: verticalScale(140),
    width: scale(140),
    marginTop: verticalScale(20),
    justifyContent: 'center',
    borderRadius: scale(borderRadiusLarge),
    alignItems: 'center',
    backgroundColor: Colors.White,
    borderWidth: scale(0.2),
    borderColor: Colors.Tertiary,
  },
  card4: {
    marginTop: verticalScale(20),
    height: verticalScale(140),
    width: scale(140),
    justifyContent: 'center',
    borderRadius: scale(borderRadiusLarge),
    alignItems: 'center',
    backgroundColor: Colors.White,
    borderWidth: scale(0.2),
    borderColor: Colors.Tertiary,
  },
  card5: {
    marginTop: verticalScale(20),
    height: verticalScale(140),
    width: scale(140),
    borderRadius: scale(borderRadiusLarge),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.White,
    borderWidth: scale(0.2),
    borderColor: Colors.Tertiary,
  },
  card6: {
    marginTop: verticalScale(20),
    height: verticalScale(140),
    width: scale(140),
    borderRadius: scale(borderRadiusLarge),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.White,
    borderWidth: scale(0.2),
    borderColor: Colors.Tertiary,
  },
  gameCard: {
    marginTop: verticalScale(20),
    height: verticalScale(80),
    width: gameCardWidth,
    borderRadius: scale(borderRadiusLarge),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.Card6Color,
    borderWidth: 1,
  },
  shadow: {
    shadowColor: Colors.Coral,
    shadowOffset: {width: 7, height: 7},
    shadowOpacity: 0.8,
    shadowRadius: 3,
  },
  textMainMenu: {
    textAlign: 'center',
    textAlignVertical: 'top',
    fontSize: scale(fontSizeMedium),
    color: Colors.Black,
    fontFamily: FONT,
  },
  iconMainMenu: {
    width: scale(iconLarge),
    height: verticalScale(iconLarge),
  },
});

export default MainMenu;
