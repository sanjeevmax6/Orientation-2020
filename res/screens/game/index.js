import {Layout, Card} from '@ui-kitten/components';
import React, {useState, useEffect, useRef} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
  AppState,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {verticalScale, scale} from 'react-native-size-matters';
import {GAME_Store} from '../../mobx/gameStore';
import * as Colors from '../../utils/colors';
import ErrorScreen from '../../components/errorScreen';
import LoaderPage from '../LoadingScreen';
import {
  borderRadiusLarge,
  squidGameFont,
  fontSizeVeryLarge,
  fontSizeBig,
  paddingSmall,
  paddingMedium,
  paddingBig,
} from '../../utils/UIConstants';
import {IS_GAME_START} from '../../utils/STORAGE_KEYS';
import moment from 'moment';
import {observer} from 'mobx-react';
import {gameLinksAPI} from './gameLinksAPI';
import {LOADING_SQUID} from '../../utils/LOADING_TYPES';
import {GAME_DAY, GAME_MONTH, GAME_YEAR} from '../../utils/GAME_DATE';

const game = observer(({navigation}) => {
  const [startTime, setStartTime] = useState([23, 23]);
  const [loading, setLoading] = useState(true);
  const [links, setLinks] = useState(null);
  const [error, setError] = useState(false);

  const getDuration = () => {
    setLinks(GAME_Store.getLinks);
    console.log('links' + links);
    if (!loading) {
      console.log('inside Loading');
      setStartTime([
        moment(links[0].startTime, 'HH:mm').format('HH'), //index 0 is hour and 1 is minute
        moment(links[0].startTime, 'HH:mm').format('mm'),
      ]);
      var dur = null;

      var sTime = moment(
        new Date(
          GAME_YEAR,
          GAME_MONTH,
          GAME_DAY,
          startTime[0],
          startTime[1],
          0,
        ),
      );
      var currentTime = moment(new Date(GAME_Store.getCurrentTime));
      console.log('currentTIme ' + currentTime);
      console.log('Stime ' + sTime);
      //const date = moment.utc().format();
      //const local = moment.utc(date).local().format();

      dur = moment.duration(sTime.diff(currentTime)).asMilliseconds();
      //setDuration(dur);
      if (dur > 0) GAME_Store.setStartGame(false);
      else GAME_Store.setStartGame(true);
      console.log(dur);
      setTime(dur);
    }
  };

  useEffect(() => {
    gameLinksAPI(setLoading, setError);
    const unsubscribe = navigation.addListener('focus', () => {
      gameLinksAPI(setLoading, setError);
      getDuration();
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    getDuration();
  }, [loading, GAME_Store.getLinks]);

  const [timerOn, setTimerOn] = useState(false);
  const [time, setTime] = useState(null);
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const [dispTime, setDispTime] = useState('');

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        console.log('App has come to the foreground!');
        gameLinksAPI(setLoading, setError);
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      console.log('AppState', appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    //console.log('UseEffect in Start Screen' + timerOn);
    let interval = null;
    if (timerOn) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime - 1000);
        var seconds = Math.floor((time / 1000) % 60);
        var minutes = Math.floor((time / (1000 * 60)) % 60);
        var hours = Math.floor((time / (1000 * 60 * 60)) % 24);
        setDispTime('' + hours + ':' + minutes + ':' + seconds);
        console.log(seconds);
      }, 1000);
    } else {
      clearImmediate(interval);
    }

    return () => clearInterval(interval);
  }, [timerOn, time]);

  function startTimer(duration) {
    console.log('I got called');

    setTimerOn(true);
  }

  if (!timerOn && !loading) startTimer(1000);
  //console.log('Time' + time);

  return (
    <SafeAreaView style={{flex: 1}}>
      {error ? (
        <ErrorScreen navigation={navigation} errorMessage={error} />
      ) : loading ? (
        <LoaderPage navigation={navigation} LoaderType={LOADING_SQUID} />
      ) : (
        <Layout style={{flex: 1, backgroundColor: Colors.Black}}>
          <ImageBackground
            source={require('../../assets/images/gameImages/background.jpg')}
            resizeMode="stretch"
            style={{
              flex: 1,
              width: undefined,
              height: undefined,
            }}>
            <View style={styles.headingContainer}>
              <Text style={styles.heading}>
                <Text style={{color: Colors.White}}>{'} '}</Text>
                Would you like to play a game with me?
                <Text style={{color: Colors.White}}>{' {'}</Text>
              </Text>
            </View>

            <View style={styles.cardContainer}>
              <Card style={styles.card}>
                {GAME_Store.getStartGame ? (
                  <TouchableOpacity
                    onPress={() => {
                      if (GAME_Store.getStartGame) {
                        GAME_Store.setOnPressStartGame(true);
                        AsyncStorage.setItem(IS_GAME_START, 'true');
                      }
                    }}>
                    <ImageBackground
                      source={require('../../assets/images/gameImages/buttonImage.jpg')}
                      resizeMode="contain"
                      style={{
                        width: scale(250),
                        height: verticalScale(75),
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text style={styles.cardText}>
                        <Text style={{color: Colors.White}}>{'    '}</Text>
                        YES
                        <Text style={{color: Colors.White}}>{' }{O'}</Text>
                      </Text>
                    </ImageBackground>
                  </TouchableOpacity>
                ) : (
                  <ImageBackground
                    source={require('../../assets/images/gameImages/buttonImage.jpg')}
                    resizeMode="contain"
                    style={{
                      width: scale(250),
                      height: verticalScale(75),
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={styles.cardText}>
                      <Text style={{color: Colors.White}}>{'    '}</Text>
                      {dispTime}
                      {/* <Text style={{color: Colors.White}}>{' }{O'}</Text> */}
                    </Text>
                  </ImageBackground>
                )}
              </Card>
            </View>
          </ImageBackground>
        </Layout>
      )}
    </SafeAreaView>
  );
});

export default game;

const styles = StyleSheet.create({
  headingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(40),
    paddingHorizontal: scale(paddingMedium),
  },
  heading: {
    color: Colors.squidGamePink,
    fontSize: scale(20),
    fontFamily: squidGameFont,
    textAlign: 'center',
  },
  cardContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scale(paddingMedium),
    marginTop: verticalScale(40),
  },
  card: {
    height: verticalScale(75),
    width: scale(250),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(borderRadiusLarge),
    backgroundColor: Colors.Black,
    borderWidth: scale(6),
    borderColor: Colors.squidGameGreen,
  },
  cardText: {
    color: Colors.squidGameYellow,
    fontSize: scale(20),
    fontFamily: squidGameFont,
    textAlign: 'center',
  },
});
