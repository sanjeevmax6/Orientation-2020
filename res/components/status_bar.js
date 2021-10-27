import {View, StyleSheet, StatusBar, Platform} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {getStatusBarHeight} from 'react-native-status-bar-height';

import React from 'react';

const Status_Bar = () => {
  const StatusBarHeight = getStatusBarHeight();

  return (
    <View>
      <StatusBar
        barStyle="light-content"
        translucent={true}
        backgroundColor="transparent"
      />
      <View style={{height: StatusBarHeight, width: '100%'}}>
        <LinearGradient
          start={{x: 0.0, y: 0.0}}
          end={{x: 1.0, y: 0.0}}
          colors={['#f13e4d', '#ff5130', '#ff512f']}
          style={style.Container}></LinearGradient>
      </View>
    </View>
  );
};

export default Status_Bar;

const style = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#2980b9',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
