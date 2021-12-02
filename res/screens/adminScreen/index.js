import React, {useState} from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {TextInput} from 'react-native-element-textinput';
import {
  FONT,
  fontSizeBig,
  fontSizeVeryLarge,
  paddingMedium,
  paddingSmall,
} from '../../utils/UIConstants';
import {scale, verticalScale} from 'react-native-size-matters';
import {Black} from '../../utils/colors';
import LinearGradient from 'react-native-linear-gradient';
import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';
import * as ERRORS from '../../utils/ERROR_MESSAGES';
import {TRIGGER_NOTIFICATION} from '../../utils/APIConstants';
import {UserData} from '../../mobx/userStore';
import LoaderPage from '../LoadingScreen';
import ErrorScreen from '../../components/errorScreen';
const AdminScreen = () => {
  const [state, setState] = useState(0);
  const [ErrorText, setErrorText] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ImageUrl, setImageUrl] = useState('');
  const [RedirectLink, setRedirectLink] = useState('');

  const submit = () => {
    console.log('Doing Api Call for Admin');
    Handle_API_CALL();
  };

  const Handle_API_CALL = () => {
    var url = UserData.getBaseUrl + TRIGGER_NOTIFICATION;
    setState(1);
    NetInfo.fetch().then(state => {
      if (state.isConnected === true) {
        axios
          .post(
            url,
            {
              title: title,
              description: description,
              image: ImageUrl,
              magURL: RedirectLink,
            },
            {
              headers: {
                firebaseToken: UserData.getFireBaseToken,
                token: UserData.token,
              },
            },
          )
          .then(response => {
            if (response.status === 200) {
              console.log(response);

              setImageUrl('');
              setDescription('');
              setErrorText('');
              setRedirectLink('');
              setTitle('');
              setState(0);
            } else {
              setErrorText(response.data.message);
              setState(2);
            }
          })
          .catch(error => {
            console.log(error);
            if (error.response) {
              setErrorText(error.response.data.message);
            } else if (error.request) {
              setErrorText(ERRORS.TIME_OUT);
            } else {
              setErrorText(ERRORS.UNEXPECTED);
            }
            setState(2);
          });
      } else {
        setState(2);
        setErrorText(ERRORS.NO_NETWORK);
      }
    });
  };

  return (
    <>
      {state === 1 ? (
        <>
          <LoaderPage />
        </>
      ) : (
        <>
          {state === 2 ? (
            <>
              <ErrorScreen
                errorMessage={ErrorText}
                navigation="true"
                useOnlyFn={true}
                fn={() => {
                  setState(0);
                }}
              />
            </>
          ) : (
            <>
              <ScrollView>
                <TextInput
                  value={title}
                  style={styles.input1}
                  inputStyle={styles.inputStyle}
                  labelStyle={styles.labelStyle}
                  placeholder="Title"
                  placeholderTextColor="gray"
                  onChangeText={text => {
                    setTitle(text);
                  }}
                  focusColor="black"
                />
                <TextInput
                  value={description}
                  style={styles.input1}
                  inputStyle={styles.inputStyle}
                  labelStyle={styles.labelStyle}
                  placeholder="Description"
                  placeholderTextColor="gray"
                  onChangeText={text => {
                    setDescription(text);
                  }}
                  focusColor="black"
                />
                <TextInput
                  value={ImageUrl}
                  style={styles.input1}
                  inputStyle={styles.inputStyle}
                  labelStyle={styles.labelStyle}
                  placeholder="Image URL"
                  placeholderTextColor="gray"
                  onChangeText={text => {
                    setImageUrl(text);
                  }}
                  focusColor="black"
                />
                <TextInput
                  value={RedirectLink}
                  style={styles.input1}
                  inputStyle={styles.inputStyle}
                  labelStyle={styles.labelStyle}
                  placeholder="Redirect Link"
                  placeholderTextColor="gray"
                  onChangeText={text => {
                    setRedirectLink(text);
                  }}
                  focusColor="black"
                />
                <View>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontWeight: '500',
                      textTransform: 'uppercase',
                      fontSize: scale(12),
                      fontFamily: FONT,
                    }}>
                    Users will be redirected to this link
                  </Text>
                </View>
                <View style={{elevation: 15}}>
                  <LinearGradient
                    start={{x: 0.0, y: 0.25}}
                    end={{x: 0.5, y: 1.0}}
                    locations={[0, 0.6, 0.8]}
                    colors={['#f13e4d', '#ff5130', '#ff512f']}
                    style={{
                      padding: scale(9),
                      paddingRight: scale(18),
                      marginTop: verticalScale(40),
                      borderRadius: scale(24),
                      marginBottom: verticalScale(28),
                      width: scale(150),

                      alignSelf: 'center',
                    }}>
                    <TouchableOpacity style={{}} onPress={submit}>
                      <View style={{width: scale(9)}} />

                      <Text
                        style={{
                          fontSize: scale(18),
                          color: 'white',
                          fontWeight: 'bold',
                          textAlign: 'center',
                          fontFamily: FONT,
                        }}>
                        SUBMIT
                      </Text>
                    </TouchableOpacity>
                  </LinearGradient>
                </View>
              </ScrollView>
            </>
          )}
        </>
      )}
    </>
  );
};

export default AdminScreen;

const styles = StyleSheet.create({
  input1: {
    marginHorizontal: paddingMedium,
    marginTop: paddingSmall,
    borderWidth: scale(1),
    height: verticalScale(55),
    paddingHorizontal: scale(8),
    borderRadius: scale(8),
  },
  inputStyle: {fontSize: scale(fontSizeBig), color: 'black'},
  labelStyle: {fontSize: scale(fontSizeBig)},

  title: {
    marginTop: verticalScale(paddingSmall),
    paddingVertical: scale(paddingSmall),
    color: Black,
    paddingLeft: scale(paddingMedium),
    fontSize: scale(fontSizeVeryLarge),
    fontWeight: 'bold',
  },
});
