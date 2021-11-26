import NetInfo from '@react-native-community/netinfo';

import {UserData} from '../../mobx/userStore';
import * as ERRORS from '../../utils/ERROR_MESSAGES';
import {API_GET_CLUB_DATA, API_GET_FEST_DATA} from '../../utils/APIConstants';

export const clubApis = (
  setClubLoading,
  setConnectivity,
  setSuccess,
  setClubData,
  setErrorText,
) => {
  var url = UserData.getBaseUrl + API_GET_CLUB_DATA;
  const axios = require('axios');
  NetInfo.fetch().then(state => {
    if (state.isConnected == true) {
      setClubLoading(true);
      setConnectivity(true);
      axios
        .get(url, {
          headers: {token: UserData.token},
        })
        .then(response => {
          setClubLoading(false);
          setSuccess(true);
          setClubData(response.data);
        })
        .catch(error => {
          if (error.response) {
            setClubLoading(false);
            setErrorText(error.response.data.message);
            setSuccess(false);
          } else if (error.request) {
            setErrorText(ERRORS.TIME_OUT);
            setSuccess(false);
            setClubLoading(false);
          } else {
            setClubLoading(false);
            setSuccess(false);
            setErrorText(ERRORS.UNEXPECTED);
          }
        });
    } else {
      setSuccess(false);
      setConnectivity(false);
      setErrorText(ERRORS.NO_NETWORK);
    }
  });
};

export const festApis = (
  setFestLoading,
  setConnectivity,
  setFestData,
  setSuccess,
  setErrorText,
) => {
  var url = UserData.getBaseUrl + API_GET_FEST_DATA;
  const axios = require('axios');
  NetInfo.fetch().then(state => {
    if (state.isConnected == true) {
      setFestLoading(true);
      setConnectivity(true);
      axios
        .get(url, {
          headers: {token: UserData.token},
        })
        .then(response => {
          setFestLoading(false);
          setFestData(response.data);
          setSuccess(true);
        })
        .catch(error => {
          if (error.response) {
            setFestLoading(false);
            setErrorText(error.response.data.message);
            setSuccess(false);
          } else if (error.request) {
            setErrorText(ERRORS.TIME_OUT);
            setSuccess(false);
            setFestLoading(false);
          } else {
            setFestLoading(false);
            setSuccess(false);
            setErrorText(ERRORS.UNEXPECTED);
          }
        });
    } else {
      setErrorText(ERRORS.NO_NETWORK);
      setSuccess(false);
      setConnectivity(false);
    }
  });
};
