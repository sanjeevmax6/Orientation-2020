import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';
import {contactsStore} from '../../mobx/contactsStore';
import {UserData} from '../../mobx/userStore';
import {API_GET_CONTACTS} from '../../utils/APIConstants';
import * as ERRORS from '../../utils/ERROR_MESSAGES';

export const getContacts = ({navigation}, setErrorText,setConnectivity) => {
  NetInfo.fetch().then(state => {
    if (state.isConnected == true) {
      contactsStore.setIsAdminLoading(true);
      contactsStore.setIsOrientationLoading(true);
      setConnectivity(true);
      axios
        .get(API_GET_CONTACTS, {
          headers: {
            'Content-Type': 'application/json',
            token: UserData.token,
          },
        })
        .then(response => {
          contactsStore.setIsOrientationLoading(false);
          contactsStore.setIsAdminLoading(false);
          contactsStore.setOrientationData(response.data.Orientation);
          contactsStore.setAdminData(response.data.Admin);
        })
        .catch(err => {
          Alert.alert(
            'Error occured',
            `An error occred while gathering data:\n ${err.message}`,
            [
              {
                text: 'Ok',
                onPress: () => navigation.goBack(),
              },
            ],
          );
          console.log(err);
        });
    } else {
      setConnectivity(false);
      setErrorText(ERRORS.NO_NETWORK);
    }
  });
};
