import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';
import {GAME_Store} from '../../mobx/gameStore';
import {API_GAME_LINKS, API_GAME_TOKEN} from '../../utils/APIConstants';
import * as ERROR_MSGS from '../../utils/ERROR_MESSAGES';

export const gameLinksAPI = (setLoading, setError) => {
  setLoading(true);
  setError(false);
  var url = API_GAME_LINKS;
  NetInfo.fetch().then(state => {
    if (state.isConnected === true) {
      axios
        .get(url, {
          headers: {
            'Content-Type': 'application/json',
            token: API_GAME_TOKEN,
          },
        })
        .then(response => {
          if (response.status === 200) {
            console.log(response.data.links);
            GAME_Store.setLinks(response.data.links);
            console.log('RESPONSE' + JSON.stringify(response.data.links));
            GAME_Store.setCurrentTime(response.headers.date);
            setLoading(false);
            setError(false);
          }
        })
        .catch(error => {
          setLoading(false);
          if (error.response) {
            console.log(error.response.data.message);
            setError(error.response.data.message);
          } else if (error.request) {
            console.log(error.request);
            setError(ERROR_MSGS.TIME_OUT);
          } else {
            console.log(error);
            setError(ERROR_MSGS.UNEXPECTED);
          }
        });
    } else {
      setError(ERROR_MSGS.NO_NETWORK);
      setLoading(false);
    }
  });
};
