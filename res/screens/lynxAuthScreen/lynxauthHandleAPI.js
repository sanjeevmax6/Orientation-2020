import {
  API_STUDENT_LOGIN,
  API_STUDENT_LYNX_LOGIN,
  SUBSCRIBE_NOTIFICATION,
} from '../../utils/APIConstants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import {UserData} from '../../mobx/userStore';
import axios from 'axios';
import {API_SCREEN_Store} from '../../mobx/apiCallScreenStore';
import * as KEYS from '../../utils/STORAGE_KEYS';
import * as ERRORS from '../../utils/ERROR_MESSAGES';
import {Platform} from 'react-native';

export const lynxLoginAPICall = (rollNo) => {
  var url = UserData.getBaseUrl + API_STUDENT_LYNX_LOGIN;
  console.log(rollNo+"hi");
  NetInfo.fetch().then(state => {
    if (state.isConnected === true) {
      API_SCREEN_Store.setIsLoading(true);
      if (rollNo.trim() === '') {
        API_SCREEN_Store.setErrorText(ERRORS.SIGN_UP_FILL_ALL);
        API_SCREEN_Store.setError(true);
        API_SCREEN_Store.setIsLoading(false);
      } else if (rollNo.replace(/[^0-9]/g, '').length !== 9) {
        API_SCREEN_Store.setErrorText(ERRORS.INVALID_ROLL_NUMBER);
        API_SCREEN_Store.setError(true);
        API_SCREEN_Store.setIsLoading(false);
      } else {
        rollNo = Number.parseInt(rollNo,10);
        axios
          .post(url,{
            rollNo
           })
          .then(response => {
            if (response.status === 200) { 
              console.log("bhaibhai")
              API_SCREEN_Store.setSuccess(true);
              API_SCREEN_Store.setIsLoading(false);
            }
      })
          .catch(error => {
          API_SCREEN_Store.setError(true);
          API_SCREEN_Store.setSuccess(false);
          API_SCREEN_Store.setIsLoading(false);
          if (error.response) {
            API_SCREEN_Store.setErrorText(error.response.data.message);
          } else if (error.request) {
            API_SCREEN_Store.setErrorText(ERRORS.TIME_OUT);
          } else {
            API_SCREEN_Store.setErrorText(ERRORS.UNEXPECTED);
          }
          });
      }
    } else {
      API_SCREEN_Store.setSuccess(false);
      API_SCREEN_Store.setError(true);
      API_SCREEN_Store.setErrorText(ERRORS.NO_NETWORK);
      API_SCREEN_Store.setIsLoading(false);
    }
  });
};
