import React, {useEffect, useState} from 'react';

import * as Animatable from 'react-native-animatable';
import {StyleSheet, View, Text, PixelRatio, Platform} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import {Login_Store} from '../../mobx/loginStore';
import * as KEYS from '../../utils/STORAGE_KEYS';
import {UserData} from '../../mobx/userStore';
import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {REF_URL} from '../../utils/APIConstants';
import * as ERRORS from '../../utils/ERROR_MESSAGES';
import ErrorScreen from '../../components/errorScreen';
import LoaderPage from '../LoadingScreen';
import MaintenancePage from './maintain';
import {ERROR_NO_NETWORK, LOADING_EXTERNAL} from '../../utils/LOADING_TYPES';

const SplashScreen = () => {
  const [State, setState] = useState(0);
  const [URL_STATE, setURL_STATE] = useState(0);
  console.log('Splash ho raha');
  const navigate = () => {
    if (URL_STATE === 1) {
      //still loading
      setState(1);
    } else if (URL_STATE === 0) {
      //fail - we are under maintenance
      setState(2.2);
    } else if (URL_STATE === 2) {
      //fail - no internet connection
      setState(2.1);
    } else if (URL_STATE === 3) {
      // all okay go ahead
      Login_Store.closeSplash();
    }
  };

  const getBaseURL = () => {
    setURL_STATE(1);
    NetInfo.fetch().then(state => {
      if (state.isConnected == true) {
        axios
          .post(REF_URL, {
            appName: 'orientation-21',
          })
          .then(response => {
            if (response.status === 200) {
              console.log(response.data);
              UserData.setBaseUrl(response.data);
              setURL_STATE(3);
            } else {
              UserData.setErrorText('SOMETHING WENT WRONG!');
              setURL_STATE(0);
            }
          })
          .catch(error => {
            UserData.setErrorText('SOMETHING WENT WRONG!');
            setURL_STATE(0);
          });
      } else {
        UserData.setErrorText(ERRORS.NO_NETWORK);
        setURL_STATE(2);
      }
    });
  };

  const setupMobx = () => {
    console.log('Setting up');
    AsyncStorage.getItem(KEYS.USER_TOKEN).then(val => {
      if (val) UserData.setToken(val);
      else UserData.setToken(null);
    });
    AsyncStorage.getItem(KEYS.USER_NAME).then(val => {
      if (val) UserData.setName(val);
      else UserData.setName(null);
    });
    AsyncStorage.getItem(KEYS.USER_ROLL_NO).then(val => {
      if (val) UserData.setRollNo(val);
      else UserData.setRollNo(null);
    });
    AsyncStorage.getItem(KEYS.USER_DEPARTMENT).then(val => {
      if (val) UserData.setDepartment(val);
      else UserData.setDepartment(null);
    });
    AsyncStorage.getItem(KEYS.IS_USER_ADMIN).then(val => {
      if (val === 'true') {
        UserData.setAdmin(true);
      } else if (val === 'false') {
        UserData.setAdmin(false);
      } else {
        AsyncStorage.removeItem(KEYS.USER_TOKEN);
        AsyncStorage.removeItem(KEYS.USER_DEPARTMENT);
        AsyncStorage.removeItem(KEYS.USER_NAME);
        AsyncStorage.removeItem(KEYS.USER_ROLL_NO);
        AsyncStorage.removeItem(KEYS.IS_USER_ADMIN);

        UserData.setToken('');
      }
    });
  };

  useEffect(() => {
    getBaseURL();
  }, []);

  useEffect(() => {
    setupMobx();
  }, []);

  return (
    <>
      {State === 0 ? (
        <>
          <View style={styles.top}>
            <Animatable.View
              animation="fadeOutUp"
              delay={3300}
              onAnimationEnd={() => {
                navigate();
              }}>
              <Animatable.View animation="pulse" duration={1050} delay={2300}>
                <Animatable.View
                  animation="flipInX"
                  duration={1800}
                  style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'center',
                  }}>
                  <Animatable.Text
                    animation="slideInDown"
                    style={styles.main}
                    duration={1110}>
                    O
                  </Animatable.Text>
                  <Animatable.Text
                    animation="slideInDown"
                    style={styles.main}
                    duration={1220}>
                    R
                  </Animatable.Text>
                  <Animatable.Text
                    animation="slideInDown"
                    style={styles.main}
                    duration={1330}>
                    I
                  </Animatable.Text>
                  <Animatable.Text
                    animation="slideInDown"
                    style={styles.main}
                    duration={1440}>
                    E
                  </Animatable.Text>
                  <Animatable.Text
                    animation="slideInDown"
                    style={styles.main}
                    duration={1550}>
                    N
                  </Animatable.Text>
                  <Animatable.Text
                    animation="slideInDown"
                    style={styles.main}
                    duration={1660}>
                    T
                  </Animatable.Text>
                  <Animatable.Text
                    animation="slideInDown"
                    style={styles.main}
                    duration={1770}>
                    A
                  </Animatable.Text>
                  <Animatable.Text
                    animation="slideInDown"
                    style={styles.main}
                    duration={1880}>
                    T
                  </Animatable.Text>
                  <Animatable.Text
                    animation="slideInDown"
                    style={styles.main}
                    duration={1990}>
                    I
                  </Animatable.Text>
                  <Animatable.Text
                    animation="slideInDown"
                    style={styles.main}
                    duration={2100}>
                    O
                  </Animatable.Text>
                  <Animatable.Text
                    animation="slideInDown"
                    style={styles.main}
                    duration={2210}>
                    N
                  </Animatable.Text>
                  <Animatable.View
                    style={{flexDirection: 'row', marginLeft: 8}}>
                    <Animatable.Text
                      style={styles.num}
                      animation="fadeInLeftBig"
                      duration={1700}>
                      2
                    </Animatable.Text>
                    <Animatable.Text
                      style={styles.num}
                      animation="fadeInLeftBig"
                      duration={1700}>
                      1
                    </Animatable.Text>
                  </Animatable.View>
                </Animatable.View>
              </Animatable.View>
            </Animatable.View>
            <View style={styles.bottom}>
              <Animatable.View animation="fadeOutDown" delay={3300}>
                <Animatable.View animation="pulse" duration={1050} delay={2300}>
                  <Animatable.View
                    animation="slideInUp"
                    duration={2210}
                    style={{flexDirection: 'column', justifyContent: 'center'}}>
                    <Text style={styles.spiderTexts}>Spider R&D</Text>
                  </Animatable.View>
                </Animatable.View>
              </Animatable.View>
            </View>
          </View>
        </>
      ) : (
        <>
          {State === 1 ? (
            <>
              <LoaderPage LoaderType={LOADING_EXTERNAL} />
            </>
          ) : (
            <>
              {State === 2.1 ? (
                <>
                  <ErrorScreen errorMessage={ERRORS.NO_NETWORK} />
                </>
              ) : (
                <>
                  <MaintenancePage />
                </>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  main: {
    fontSize: scale(26) / PixelRatio.getFontScale(),
    color: 'black',
    top: verticalScale(-25),
    fontFamily: Platform.OS === 'android' ? 'serif' : 'arial',

    fontWeight: 'bold',
  },

  num: {
    fontSize: scale(32) / PixelRatio.getFontScale(),
    color: '#f13e4d',
    top: verticalScale(-26),
    fontFamily: Platform.OS === 'android' ? 'serif' : 'arial',

    //fontFamily: 'Montserrat-Bold',
  },

  spiderTexts: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: scale(16) / PixelRatio.getFontScale(),
    // fontWeight:"bold",
    color: 'darkblue',
    elevation: 1,
    fontFamily: Platform.OS === 'android' ? 'serif' : 'arial',
    //fontFamily: 'Montserrat-Bold',
    textAlignVertical: 'center',
  },
  bottom: {
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: verticalScale(10), //
    width: '100%',
  },
  top: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});
