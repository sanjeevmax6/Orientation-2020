import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';
import {GAME_Store} from '../../mobx/gameStore';
import {API_GAME_LINKS} from '../../utils/APIConstants';
import * as ERRORS from '../../utils/ERROR_MESSAGES';

export const gameLinksAPI = ({navigation}) => {
  var url = API_GAME_LINKS;
  NetInfo.fetch().then(state => {
    if (state.isConnected === true) {
      axios
        .get(url, {
          headers: {
            'Content-Type': 'application/json',
            token: 'spidernitt123orientation21',
          },
        })
        .then(response => {
          if (response.status === 200) {
            GAME_Store.setLinks(response.data.links);
          }
        })
        .catch(error => {});
    } else {
    }
  });
};
