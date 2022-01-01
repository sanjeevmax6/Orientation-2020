import React, {useRef, useState, useEffect} from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  _View,
  AppState,
} from 'react-native';
import {Layout, Card} from '@ui-kitten/components';
import {SafeAreaView} from 'react-native-safe-area-context';
import {verticalScale, scale} from 'react-native-size-matters';
import * as Colors from '../../utils/colors';
import {squidGameFont, paddingMedium} from '../../utils/UIConstants';
import Gamecard1 from './gameCard1';
import Gamecard2 from './gameCard2';
import Gamecard3 from './gameCard3';
import Gamecard4 from './gameCard4';
import Gamecard5 from './gameCard5';
import moment from 'moment';
import {GAME_Store} from '../../mobx/gameStore';
import {gameLinksAPI} from './gameLinksAPI';
import ErrorScreen from '../../components/errorScreen';
import LoaderPage from '../LoadingScreen';
import {LOADING_SQUID} from '../../utils/LOADING_TYPES';
import {GAME_DAY, GAME_MONTH, GAME_YEAR} from '../../utils/GAME_DATE';

const questionScreen = ({navigation}) => {
  const [time, setTime] = useState(0);
  const [timerOn, setTimerOn] = useState(false);

  const [qn, setQn] = useState(0);

  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  const [startTime, setStartTime] = useState([null, null]);
  const [endTime, setEndTime] = useState([null, null]);
  const [loading, setLoading] = useState(true);
  const [links, setLinks] = useState(null);
  const [error, setError] = useState(false);
  const [lockQn, setLockQn] = useState(false);
  const [dispTime, setDispTime] = useState('');

  const getDuration = () => {
    setLinks(GAME_Store.getLinks);
    console.log('links' + links);
    if (!loading) {
      console.log('inside Loading');
      setStartTime([
        moment(links[qn].startTime, 'HH:mm').format('HH'),
        moment(links[qn].startTime, 'HH:mm').format('mm'),
      ]);
      setEndTime([
        moment(links[qn].endTime, 'HH:mm').format('HH'),
        moment(links[qn].endTime, 'HH:mm').format('mm'),
      ]);
      var dur = null;

      /*const st = 55;
      var timlist = [st, st + 1, st + 2, st + 3, st + 4];
      var etimlist = [st + 1, st + 2, st + 3, st + 4, st + 5];*/

      var currentTime = moment(new Date(GAME_Store.getCurrentTime));
      for (var i = 0; i < 5; i++) {
        var eTime = moment(
          new Date(GAME_YEAR, GAME_MONTH, GAME_DAY, endTime[i], endTime[i], 0),
        );
        var diff = moment.duration(eTime.diff(currentTime)).asMilliseconds();
        console.log('i loop' + i + diff);
        if (diff > 1000) {
          setQn(i);
          setLockQn(false);
          console.log('QN' + qn);
          break;
        }
      }
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

      /*console.log(sTime);
      console.log('currentTIme ' + currentTime);
      console.log('Stime ' + sTime);*/

      dur = moment.duration(sTime.diff(currentTime)).asMilliseconds();

      setTime(dur);
    }
  };

  useEffect(() => {
    gameLinksAPI(setLoading, setError);
    const unsubscribe = navigation.addListener('focus', () => {
      gameLinksAPI(setLoading, setError);
      if (!loading) getDuration();
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    getDuration();
  }, [loading, GAME_Store.getLinks]);

  useEffect(() => {
    gameLinksAPI(setLoading, setError);
  }, [lockQn]);

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
    if (timerOn && qn < 5) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime - 1000);
        var seconds = Math.floor((time / 1000) % 60);
        var minutes = Math.floor((time / (1000 * 60)) % 60);
        var hours = Math.floor((time / (1000 * 60 * 60)) % 24);

        minutes = minutes == null ? 0 : minutes < 0 ? 0 : minutes;
        seconds = seconds == null ? 0 : seconds < 0 ? 0 : seconds;
        setDispTime('' + minutes + ':' + seconds);

        console.log(qn);
        if (time < 0 && !lockQn) {
          console.log('Bot Dur called');
          setLockQn(true);
          //setQn(prevQn => (prevQn < 4 ? prevQn + 1 : prevQn));
          getDuration();
        }
      }, 1000);
    } else {
      clearImmediate(interval);
      //setQn(4);
      setDispTime('' + 0 + ':' + 0);
      if (qn >= 5) {
        //navigate  to leaderboard
      }
    }

    return () => clearInterval(interval);
  }, [timerOn, time]);

  function startTimer() {
    console.log('I got called');
    setTimerOn(true);
  }

  if (!timerOn && !loading && qn < 5) startTimer(1000);

  return (
    <SafeAreaView style={{flex: 1}}>
      {console.log(error)}
      {error ? (
        <ErrorScreen navigation={navigation} errorMessage={error} />
      ) : loading ? (
        <LoaderPage navigation={navigation} LoaderType={LOADING_SQUID} />
      ) : (
        <Layout style={{flex: 1, backgroundColor: Colors.Black}}>
          <View style={styles.headingContainer}>
            <Text style={styles.headingText}>MYSTERY HUNT</Text>
          </View>
          <ScrollView>
            <View style={styles.cardsContainer}>
              <View style={styles.container}>
                <Text
                  style={{
                    ...styles.cardText,
                    color: Colors.White,
                    fontSize: scale(15),
                  }}>
                  {'Time till the next question'}
                </Text>
                <Text style={styles.cardText}>{dispTime}</Text>
              </View>
              <>
                {qn >= 0 ? (
                  <Gamecard1 link={links[0].link} isDone={qn > 0} />
                ) : (
                  <></>
                )}
                {qn >= 1 ? (
                  <Gamecard2 link={links[1].link} isDone={qn > 1} />
                ) : (
                  <></>
                )}
                {qn >= 2 ? (
                  <Gamecard3 link={links[2].link} isDone={qn > 2} />
                ) : (
                  <></>
                )}
                {qn >= 3 ? (
                  <Gamecard4 link={links[3].link} isDone={qn > 3} />
                ) : (
                  <></>
                )}
                {qn >= 4 ? (
                  <Gamecard5 link={links[4].link} isDone={qn > 4} />
                ) : (
                  <></>
                )}
              </>
            </View>
          </ScrollView>
          <View style={styles.leaderboardContainer}>
            <Text style={styles.leaderboardText}>LEADERBOARDS : .......</Text>
          </View>
        </Layout>
      )}
    </SafeAreaView>
  );
};

export default questionScreen;
const styles = StyleSheet.create({
  headingContainer: {
    marginVertical: scale(paddingMedium),
  },
  headingText: {
    color: Colors.squidGameGreen,
    fontSize: scale(20),
    fontFamily: squidGameFont,
    textAlign: 'center',
  },
  cardsContainer: {
    alignItems: 'center',
  },
  leaderboardContainer: {
    marginVertical: scale(paddingMedium),
  },
  leaderboardText: {
    color: Colors.squidGameGreen,
    fontSize: scale(20),
    fontFamily: squidGameFont,
    textAlign: 'center',
  },
  cardText: {
    color: Colors.squidGameYellow,
    fontSize: scale(20),
    fontFamily: squidGameFont,
    textAlign: 'center',
  },
  container: {
    marginVertical: scale(10),
  },
});
