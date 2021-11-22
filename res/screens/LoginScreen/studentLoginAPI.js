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
            // AsyncStorage.setItem('name', response.data.name);
            // AsyncStorage.setItem('rollNo', response.data.rollNo);
            // AsyncStorage.setItem('department', response.data.department);

            // UserData.setName(response.data.name);
            // UserData.setDepartment(response.data.department);
            // UserData.setRollNo(response.data.token);

            //DELETE IT
            AsyncStorage.setItem(KEYS.USER_NAME, 'TEST');
            AsyncStorage.setItem(KEYS.USER_ROLL_NO, '123');
            AsyncStorage.setItem(KEYS.USER_DEPARTMENT, 'CSG');

            UserData.setName('TEST');
            UserData.setDepartment('123');
            UserData.setRollNo('CSG');

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
