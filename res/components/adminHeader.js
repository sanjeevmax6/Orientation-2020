import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import LinearGradient from 'react-native-linear-gradient';

import {Icon} from '@ui-kitten/components';
import {fontSizeBig, paddingSmall} from '../utils/UIConstants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as KEYS from '../utils/STORAGE_KEYS';
import {UserData} from '../mobx/userStore';

const AdminHeader = ({props, title = 'HEADER'}) => {
  const logOut = () => {
    Alert.alert(
      'LOGOUT',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            AsyncStorage.removeItem(KEYS.USER_TOKEN);
            AsyncStorage.removeItem(KEYS.USER_DEPARTMENT);
            AsyncStorage.removeItem(KEYS.USER_NAME);
            AsyncStorage.removeItem(KEYS.USER_ROLL_NO);
            AsyncStorage.removeItem(KEYS.IS_USER_ADMIN);
            UserData.setToken('');
            UserData.setDepartment('');
            UserData.setName('');
            UserData.setRollNo('');
            UserData.setAdmin(false);
          },
        },
      ],
      {cancelable: false},
    );
  };
  return (
    <LinearGradient
      start={{x: 0.0, y: 0.0}}
      end={{x: 1.0, y: 0.0}}
      colors={['#f13e4d', '#ff5130', '#ff512f']}
      style={styles.header}>
      <TouchableOpacity style={styles.button} onPress={logOut}>
        <Icon
          fill="white"
          style={{width: verticalScale(30), height: verticalScale(30)}}
          name="log-out-outline"
        />
      </TouchableOpacity>
      <View style={styles.textView}>
        <Text numberOfLines={1} style={styles.headerText}>
          {title}
        </Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    height: verticalScale(45),
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 10,
    elevation: 6,
    zIndex: 6,
    paddingHorizontal: scale(paddingSmall),
  },
  textView: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  },
  headerText: {
    alignSelf: 'center',
    fontSize: scale(fontSizeBig),
    fontWeight: 'bold',
    width: '65%',
    textAlign: 'center',
    color: 'white',
  },
  button: {
    zIndex: 1,

    position: 'absolute',
    right: scale(10),
    top: verticalScale(10),
  },
});

export default AdminHeader;
