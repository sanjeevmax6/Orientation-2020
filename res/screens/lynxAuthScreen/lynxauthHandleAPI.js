import {
  API_STUDENT_LOGIN,
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
  var url = UserData.getBaseUrl + API_STUDENT_LOGIN;
  var scrburl = UserData.getBaseUrl + SUBSCRIBE_NOTIFICATION;
  NetInfo.fetch().then(state => {
    if (state.isConnected === true) {
      if (rollNo.trim() === '') {
        API_SCREEN_Store.setErrorText(ERRORS.SIGN_UP_FILL_ALL);
        API_SCREEN_Store.setError();
      } else if (rollNo.replace(/[^0-9]/g, '').length !== 9) {
        API_SCREEN_Store.setErrorText(ERRORS.INVALID_ROLL_NUMBER);
        API_SCREEN_Store.setError();
      } else {
        axios
          .post(url, {
            rollNo,
          })
          .then(response => {
            if (response.status === 200) {
              if (Platform.OS === 'ios') {
                console.log(response.data.token);
                AsyncStorage.setItem(KEYS.USER_TOKEN, response.data.token);
                AsyncStorage.setItem(KEYS.USER_NAME, response.data.name);
                AsyncStorage.setItem(
                  KEYS.USER_ROLL_NO,
                  response.data.rollNo + '',
                );
                AsyncStorage.setItem(
                  KEYS.USER_DEPARTMENT,
                  response.data.department,
                );
                AsyncStorage.setItem(
                  KEYS.IS_USER_ADMIN,
                  response.data.isAdmin + '',
                ); //Async can't handle bool or numbers
                
                API_SCREEN_Store.setSuccess(true);
                // UserData.setName(response.data.name);
                // UserData.setDepartment(response.data.department);
                // UserData.setRollNo(response.data.rollNo + '');
                // UserData.setAdmin(response.data.isAdmin);
                //once the token is set it will go to DASHBOARD
                // UserData.setToken(response.data.token); // only token is coming in response as of now
              } else {
                console.log('Subscribing');
                console.log(response.data.token);
                axios
                  .post(
                    {
                      headers: {
                        firebaseToken: UserData.getFireBaseToken,
                        token: response.data.token,
                      },
                    },
                  )
                  .then(subscribe => {
                    if (subscribe.status === 200) {
                      console.log(subscribe.data.message);
                      AsyncStorage.setItem(
                        KEYS.USER_TOKEN,
                        response.data.token,
                      );
                      AsyncStorage.setItem(KEYS.USER_NAME, response.data.name);
                      AsyncStorage.setItem(
                        KEYS.USER_ROLL_NO,
                        response.data.rollNo + '',
                      );
                      AsyncStorage.setItem(
                        KEYS.USER_DEPARTMENT,
                        response.data.department,
                      );
                      AsyncStorage.setItem(
                        KEYS.IS_USER_ADMIN,
                        response.data.isAdmin + '',
                      ); //Async can't handle bool or numbers
                       API_SCREEN_Store.setSuccess(true);
                      // UserData.setName(response.data.name);
                      // UserData.setDepartment(response.data.department);
                      // UserData.setRollNo(response.data.rollNo + '');
                      // UserData.setAdmin(response.data.isAdmin);
                      //once the token is set it will go to DASHBOARD
                      // UserData.setToken(response.data.token); // only token is coming in response as of now
                    } else {
                      API_SCREEN_Store.setSuccess(false);
                      API_SCREEN_Store.setErrorText(ERRORS.UNEXPECTED);
                      API_SCREEN_Store.setError();
                    }
                  })
                  .catch(error => {
                    if (error.response) {
                      // The request was made and the server responded with a status code
                      // that falls out of the range of 2xx
                      
                      API_SCREEN_Store.setErrorText(ERRORS.UNEXPECTED);
                    } else if (error.request) {
                      // The request was made but no response was received
                      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                      // http.ClientRequest in node.js

                      API_SCREEN_Store.setErrorText(ERRORS.TIME_OUT);
                    } else {
                      // Something happened in setting up the request that triggered an Error
                      API_SCREEN_Store.setErrorText(ERRORS.UNEXPECTED);
                    }
                    API_SCREEN_Store.setSuccess(false);
                    API_SCREEN_Store.setError();
                  });
              }
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
            API_SCREEN_Store.setSuccess(false);
            API_SCREEN_Store.setError();
          });
      }
    } else {
      API_SCREEN_Store.setSuccess(false);
      API_SCREEN_Store.setError();
      API_SCREEN_Store.setErrorText(ERRORS.NO_NETWORK);
    }
  });
};
