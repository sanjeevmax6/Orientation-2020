import React, {useEffect, useState} from 'react';
import {
  FlatList,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {squidGameCyan, squidGameOrange, squidGameYellow, White, squidGameBg} from '../../utils/colors';
import {scale, verticalScale} from 'react-native-size-matters';
import NetInfo from '@react-native-community/netinfo';

const LeaderBoard = () => {
  const [users, setUsers] = useState([]);
  const getUsers = () => {
    const axios = require('axios');
    NetInfo.fetch().then(state => {
      if (state.isConnected === true) {
        axios
          .get('https://mystery-hunt.cloudns.nz/game/leaderboard', {
            headers: {
              token: 'spidernitt123orientation21',
            },
          })
          .then(response => {
            console.log(JSON.stringify(response));
            console.log(response.data.result);
            setUsers(response.data.result);
          });
      }
    });
  };

  const renderItem = ({item}) => {
    return (
      <View style={styles.title}>
        <Text style={styles.name} ellipsizeMode="tail" numberOfLines={1}>
          {item.teamName}
        </Text>
        <Text style={styles.teamPoint}>{item.teamPoints}</Text>
        <Text style={styles.rollNo}>{item.teamLeaderRollNumber} </Text>
      </View>
    );
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../game/resources/leader.webp')}
        resizeMode="cover"
        style={styles.image}>
        <Text style={styles.text}>LEADER BOARD</Text>
        <View style={styles.title}>
          <Text style={styles.titleName}>Name:</Text>
          <Text style={styles.titlePoint}>Points:</Text>
          <Text style={styles.titleRollNo}>Team Leader Roll No.:</Text>
        </View>
        <View style={styles.list}>
          <FlatList data={users} renderItem={renderItem} />
        </View>
      </ImageBackground>
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
  text: {
    color: squidGameCyan,
    fontSize: scale(30),
    marginTop: verticalScale(18),
    marginBottom: verticalScale(60),
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: squidGameBg,
  },
  title: {
    justifyContent: 'center',
    marginTop: verticalScale(10),
    borderColor: White,
    borderWidth: verticalScale(1),
    backgroundColor: squidGameBg,
    opacity: verticalScale(0.9),
  },
  titleName: {
    color: squidGameOrange,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: scale(18),
  },
  titlePoint: {
    color: squidGameYellow,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: scale(18),
  },
  titleRollNo: {
    color: White,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: scale(18),
  },
  name: {
    color: squidGameOrange,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: scale(20),
  },
  teamPoint: {
    color: squidGameYellow,
    textAlign: 'center',
    fontSize: scale(20),
  },
  rollNo: {
    color: White,
    textAlign: 'center',
    fontSize: scale(18),
  },
  names: {
    color: White,
    textAlign: 'center',
    fontSize: scale(27),
  },
  points: {
    color: White,
    fontSize: scale(27),
    textAlign: 'right',
    marginLeft: verticalScale(30),
  },
});

export default LeaderBoard;

