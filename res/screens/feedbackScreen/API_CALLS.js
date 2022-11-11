import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';
import {FEEDBACK_STORE} from '../../mobx/feedbackStore';
import {UserData} from '../../mobx/userStore';
import {API_POST_FEEDBACK} from '../../utils/APIConstants';
import * as ERRORS from '../../utils/ERROR_MESSAGES';

export const PostFeedback = () => {
  var url = UserData.getBaseUrl + API_POST_FEEDBACK;
  console.log("random");
  NetInfo.fetch().then(state => {
    if (state.isConnected === true) {
      FEEDBACK_STORE.setLoading(true);
      const message = FEEDBACK_STORE.getMessage;
      const tokenz = UserData.token;
      console.log(tokenz);
      axios
        .post(url,{
          name: UserData.userName,
          department: UserData.userDepartment,
          rollNo: UserData.userRollNo,
          message: message
        },
          {headers: {token: UserData.token}},
        
    )
        .then(response => {
          console.log()
          if (response.status === 200) {
            FEEDBACK_STORE.setSuccess(true);
            FEEDBACK_STORE.setError(false);
            FEEDBACK_STORE.setErrorText(response.data.message);
            console.log(FEEDBACK_STORE.getSuccess)
            console.log("feedback added");
          }
          FEEDBACK_STORE.setLoading(false);
          console.log(21)
        })
        .catch(error => {

          FEEDBACK_STORE.setError(true);
          // FEEDBACK_STORE.setSuccess(false);
          if (error.response) {
            FEEDBACK_STORE.setErrorText(error.response.data.message);
          } else if (error.request) {
            FEEDBACK_STORE.setErrorText(ERRORS.TIME_OUT);
          } else {
            FEEDBACK_STORE.setErrorText(ERRORS.UNEXPECTED);
          }
          console.log(FEEDBACK_STORE.getErrorText)
          FEEDBACK_STORE.setLoading(false);
          console.log(FEEDBACK_STORE.getError+"bhai")
        });
    } else {
      FEEDBACK_STORE.setError(true);
      FEEDBACK_STORE.setErrorText(ERRORS.NO_NETWORK);
      FEEDBACK_STORE.setLoading(false);
      FEEDBACK_STORE.setSuccess(false);
      console.log(FEEDBACK_STORE.getErrorText)
      console.log("yaha hai")
      console.log(FEEDBACK_STORE.getError)
    }
  });
// console.log(dept);
};
