import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';
import {contactsStore} from '../../mobx/contactsStore';
import {UserData} from '../../mobx/userStore';
import {API_GET_CONTACTS} from '../../utils/APIConstants';
import * as ERRORS from '../../utils/ERROR_MESSAGES';

export const getContacts = ({navigation}) => {
  var url = UserData.getBaseUrl + API_GET_CONTACTS;
  NetInfo.fetch().then(state => {
    if (state.isConnected === true) {
      contactsStore.setIsAdminLoading(true);
      contactsStore.setIsOrientationLoading(true);
      axios
        .get(url, {
          headers: {
            'Content-Type': 'application/json',
            token: UserData.token,
          },
        })
        .then(response => {
          if (response.status === 200) {
            contactsStore.setIsOrientationLoading(false);
            contactsStore.setIsAdminLoading(false);
            contactsStore.setOrientationData(response.data.Orientation);
            contactsStore.setAdminData(response.data.Admin);

            contactsStore.setError(false);
          }
        })
        .catch(error => {
          contactsStore.setError(true);
          if (error.response) {
            contactsStore.setErrorText(error.response.data.message);
          } else if (error.request) {
            contactsStore.setErrorText(ERRORS.TIME_OUT);
          } else {
            contactsStore.setErrorText(ERRORS.UNEXPECTED);
          }

          contactsStore.setIsOrientationLoading(false);
          contactsStore.setIsAdminLoading(false);
        });
    } else {
      contactsStore.setError(true);

      contactsStore.setErrorText(ERRORS.NO_NETWORK);
      contactsStore.setIsOrientationLoading(false);
      contactsStore.setIsAdminLoading(false);
    }
  });
};
