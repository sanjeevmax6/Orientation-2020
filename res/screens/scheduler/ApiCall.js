import {API_GET_EVENTS} from '../../utils/APIConstants';
import NetInfo from '@react-native-community/netinfo';
import {UserData} from '../../mobx/userStore';
import axios from 'axios';

import * as ERROR_MSGS from '../../utils/ERROR_MESSAGES';

export const apiCall = (setLoading, setError, setResponseState) => {
  //using netinfo to check if online
  NetInfo.fetch().then(state => {
    if (state.isConnected == true) {
      setLoading(true);
      setError(null);
      axios
        .get(API_GET_EVENTS, {
          headers: {
            token: UserData.token, //token from mobx store
          },
        })
        .then(response => {
          //console.log(response.data);
          setResponseState(response.data.EventList); //response array

          setLoading(false);
          //console.log('data' + JSON.stringify(responseState));
        })
        .catch(error => {
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
    }
  });
};
