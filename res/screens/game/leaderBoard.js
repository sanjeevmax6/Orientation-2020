import React, {useEffect, useState} from 'react';
import {
  FlatList,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ViewBase,
} from 'react-native';
import {
  squidGameCyan,
  squidGameYellow,
  White,
  squidGameBg,
  squidGamePink,
  Black,
  squidGameGreen,
} from '../../utils/colors';
import {scale, verticalScale} from 'react-native-size-matters';
import NetInfo from '@react-native-community/netinfo';
import {API_GAME_TOKEN, API_GAME_LEADERBOARD} from '../../utils/APIConstants';
import {
  borderRadiusLarge,
  borderRadiusMedium,
  squidGameFont,
  paddingSmall,
} from '../../utils/UIConstants';
import {Card} from '@ui-kitten/components';
import LoaderPage from '../LoadingScreen';
import ErrorScreen from '../../components/errorScreen';
import * as ERRORS from '../../utils/ERROR_MESSAGES';
import {LOADING_SQUID} from '../../utils/LOADING_TYPES';
import {UserData} from '../../mobx/userStore';

const LeaderBoard = ({navigation}) => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [errorText, setErrorText] = useState(null);
  const [success, setSuccess] = useState(false);
  var userScore, userTeam, userPoints;

  const getUsers = () => {
    const axios = require('axios');
    NetInfo.fetch().then(state => {
      if (state.isConnected === true) {
        setLoading(true);
        axios
          .get(API_GAME_LEADERBOARD, {
            headers: {
              token: API_GAME_TOKEN,
            },
          })
          .then(response => {
            if (response.status === 200) {
              //console.log(JSON.stringify(response.data));
              //console.log(response.data.result);
              //console.log('Done');
              setLoading(false);
              if (response.data.status === 400) {
                setErrorText(response.data.message);
                setError(true);
              } else {
                console.log(JSON.stringify(response.data.result));
                setUsers(response.data.result);
                setSuccess(true);
              }
            } else if (response.status >= 400) {
              setLoading(false);
              if (response.data.message == null) {
                setErrorText('Server Error, Try Again Later');
              } else {
                setErrorText(response.data.message);
              }
              setError(true);
            }
          })
          .catch(error => {
            setLoading(false);
            setError(true);
            if (error.response) {
              setErrorText(error.response.data.message);
            } else if (error.request) {
              setErrorText(ERRORS.TIME_OUT);
            } else {
              setErrorText(ERRORS.UNEXPECTED);
            }
          });
      } else {
        setLoading(false);
        setError(true);
        setErrorText('No Internet Connection');
      }
    });
  };

  function checkIndex(element) {
    return element.teamLeaderRollNumber == this;
  }

  const renderItem = ({item}) => {
    return (
      <Card style={styles.itemContainer}>
        <Text style={styles.itemRank}>
          RANK: {users.findIndex(checkIndex, item.teamLeaderRollNumber) + 1}
        </Text>
        <Text style={styles.itemName} ellipsizeMode="tail" numberOfLines={2}>
          {item.teamName}
        </Text>
        <Text style={styles.itemTeamPoint}>
          {item.teamPoints === null ? 0 : item.teamPoints}
        </Text>
      </Card>
    );
  };

  useEffect(() => {
    getUsers();
  }, []);

  if (success) {
    console.log('Inside Success:');
    userScore = users.filter(function (item) {
      return UserData.userRollNo == item.teamLeaderRollNumber;
    });
    userTeam = userScore[0].teamName;
    userPoints = userScore[0].teamPoints;
    console.log('User Score: ' + JSON.stringify(userScore));
  }

  return (
    <SafeAreaView style={styles.container}>
      {error ? (
        <ErrorScreen errorMessage={errorText} navigation={navigation} />
      ) : isLoading ? (
        <LoaderPage navigation={navigation} LoaderType={LOADING_SQUID} />
      ) : success ? (
        <ImageBackground
          source={require('../../assets/images/gameImages/leader.webp')}
          resizeMode="cover"
          style={styles.image}>
          <Card style={styles.headingView}>
            <Text style={styles.headingText}>LEADERBOARD</Text>
          </Card>
          <View style={styles.titleContainer}>
            <Text style={styles.titleRank}>
              RANK:{' '}
              {users.findIndex(checkIndex, userScore[0].teamLeaderRollNumber) +
                1}
            </Text>
            <Text
              style={styles.titleName}
              ellipsizeMode="tail"
              numberOfLines={2}>
              {userTeam}
            </Text>
            <Text style={styles.titlePoint}>{userPoints}</Text>
          </View>
          <FlatList
            data={users}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            style={{
              marginBottom: verticalScale(paddingSmall),
            }}
            bounces={false}
            bouncesZoom={false}
            load
          />
        </ImageBackground>
      ) : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
  headingView: {
    backgroundColor: squidGameBg,
    borderRadius: scale(borderRadiusMedium),
    borderWidth: 0,
    marginTop: verticalScale(20),
    marginBottom: verticalScale(10),
    marginHorizontal: scale(10),
    borderColor: White,
    borderWidth: scale(4),
  },
  headingText: {
    color: squidGameCyan,
    fontSize: scale(25),
    fontFamily: squidGameFont,
    textAlign: 'center',
  },
  titleContainer: {
    marginHorizontal: scale(10),
    marginBottom: verticalScale(20),
    borderRadius: scale(borderRadiusLarge),
    justifyContent: 'center',
    padding: scale(10),
    borderColor: squidGameGreen,
    borderWidth: scale(4),
    backgroundColor: squidGameBg,
  },
  itemContainer: {
    marginHorizontal: scale(25),
    marginVertical: verticalScale(5),
    borderRadius: scale(borderRadiusLarge),
    justifyContent: 'center',
    padding: scale(10),
    borderColor: White,
    borderWidth: scale(4),
    backgroundColor: squidGameBg,
    elevation: 5,
  },
  titleRank: {
    marginTop: verticalScale(10),
    color: White,
    textAlign: 'center',
    fontFamily: squidGameFont,
    fontSize: scale(18),
  },
  titleName: {
    marginTop: verticalScale(20),
    color: White,
    textAlign: 'center',
    fontFamily: squidGameFont,
    fontSize: scale(18),
  },
  titlePoint: {
    color: White,
    textAlign: 'center',
    fontFamily: squidGameFont,
    fontSize: scale(18),
    marginBottom: verticalScale(20),
  },
  titleRollNo: {
    color: White,
    textAlign: 'center',
    fontFamily: squidGameFont,
    fontSize: scale(18),
  },
  itemName: {
    marginTop: verticalScale(20),
    color: squidGameYellow,
    textAlign: 'center',
    fontFamily: squidGameFont,
    fontSize: scale(20),
  },
  itemTeamPoint: {
    color: squidGamePink,
    textAlign: 'center',
    fontSize: scale(20),
    fontFamily: squidGameFont,
  },
  itemRank: {
    color: White,
    textAlign: 'center',
    fontSize: scale(18),
    //transform: [{rotate: '90deg'}],
    fontFamily: squidGameFont,
  },
  updateMessageContainer: {
    marginHorizontal: scale(10),
    marginBottom: verticalScale(20),
    borderRadius: scale(borderRadiusLarge),
    justifyContent: 'center',
    padding: scale(10),
    borderColor: White,
    borderWidth: scale(4),
    backgroundColor: squidGameBg,
  },
  updateMessageText: {
    color: squidGamePink,
    textAlign: 'center',
    fontFamily: squidGameFont,
    fontSize: scale(18),
  },
});

export default LeaderBoard;
