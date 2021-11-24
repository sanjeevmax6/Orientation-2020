import {API_SEND_OTP} from '../../utils/APIConstants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';

export const sendOTP = (
  //token,
  inputStates,
  // setLoading,
  // setErrorText,
  //dispatch,
) => {
  console.log('OTP api called');
  NetInfo.fetch().then(state => {
    if (state.isConnected == true) {
      // setLoading(true);
      axios
        .post(API_SEND_OTP, {email: inputStates.email})
        .then(response => {
          // setLoading(false);
          if (response.data.message == 'success') {
            alert('New OTP has been sent to the given email id');
          } else if (response.data.message == 'fail') {
            alert('account already been registered');
          } else alert(response.data.message);
        })
        .catch(error => {
          if (error.response) {
            console.log(error.response);
            // setLoading(false);
            //setErrorText(error.response.data.message);
          } else if (error.request) {
            console.log(error.request);
            // setErrorText('Server Error');
          }
        });
    } else {
      // setErrorText('No internet connection');
    }
  });
};
