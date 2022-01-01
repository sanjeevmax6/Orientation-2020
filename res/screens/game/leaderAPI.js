import NetInfo from '@react-native-community/netinfo';
import {GAME_Store} from '../../mobx/gameStore';
import {API_GAME_CHECK_LEADER, API_GAME_TOKEN} from '../../utils/APIConstants';
import {UserData} from '../../mobx/userStore';

export const leaderAPI = () => {
  const axios = require('axios');
  //using netinfo to check if online
  NetInfo.fetch().then(state => {
    if (state.isConnected == true) {
      axios
        .post(
          API_GAME_CHECK_LEADER,
          JSON.stringify({
            rollNo: UserData.userRollNo,
          }),
          {
            headers: {
              token: API_GAME_TOKEN,
              'content-type': 'application/json',
            },
          },
        )
        .then(response => {
          if (response.status === 200) {
            console.log(JSON.stringify(response));
            console.log('From Leader Check API :' + response.data.isLeader);
            GAME_Store.setLeader(response.data.isLeader);
            GAME_Store.setLeaderAPISuccess(true);
            GAME_Store.setCurrentTime(response.headers.date);
            console.log('Get current time' + response.headers.date);
          } else {
            GAME_Store.setLeader(false);
            GAME_Store.setLeaderAPISuccess(true);
          }
        })
        .catch(error => {
          console.log(error);
          GAME_Store.setLeader(false);
          GAME_Store.setLeaderAPISuccess(true);
        });
    } else {
      GAME_Store.setLeader(false);
      GAME_Store.setLeaderAPISuccess(true);
    }
  });
};
