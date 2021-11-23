import {API_STUDENT_LOGIN} from '../../utils/APIConstants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import {UserData} from '../../mobx/userStore';
import axios from 'axios';
import {API_SCREEN_Store} from '../../mobx/apiCallScreenStore';
import * as KEYS from '../../utils/STORAGE_KEYS';
import * as ERRORS from '../../utils/ERROR_MESSAGES';

export const studentLogin = (rollNo, password) => {
  NetInfo.fetch().then(state => {
    if (state.isConnected === true) {
      axios
        .post(API_STUDENT_LOGIN, {
          rollNo,
          password,
        })
        .then(response => {
          if (response.status === 200) {
            AsyncStorage.setItem(KEYS.USER_TOKEN, response.data.token);
            AsyncStorage.setItem(KEYS.USER_NAME, response.data.name);
            AsyncStorage.setItem(KEYS.USER_ROLL_NO, response.data.rollNo + '');
            AsyncStorage.setItem(
              KEYS.USER_DEPARTMENT,
              response.data.department,
            );
            AsyncStorage.setItem(
              KEYS.IS_USER_ADMIN,
              response.data.isAdmin + '',
            ); //Async can't handle bool or numbers

            UserData.setName(response.data.name);
            UserData.setDepartment(response.data.department);
            UserData.setRollNo(response.data.rollNo + '');
            UserData.setAdmin(response.data.isAdmin);
            //once the token is set it will go to DASHBOARD
            UserData.setToken(response.data.token); // only token is coming in response as of now
          }
        })
        .catch(error => {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx

            API_SCREEN_Store.setErrorText(error.response.data.message);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js

            API_SCREEN_Store.setErrorText(ERRORS.TIME_OUT);
          } else {
            // Something happened in setting up the request that triggered an Error
            API_SCREEN_Store.setErrorText(ERRORS.UNEXPECTED);
          }

          API_SCREEN_Store.setError();
        });
    } else {
      API_SCREEN_Store.setError();
      API_SCREEN_Store.setErrorText(ERRORS.NO_NETWORK);
    }
  });
};
