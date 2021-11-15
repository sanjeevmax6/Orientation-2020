import React from 'react';

import * as Animatable from 'react-native-animatable';
import {StyleSheet, View, Text, PixelRatio} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';

import {Login_Store} from '../../mobx/loginStore';

const SplashScreen = () => {
  const navigate = () => {
    Login_Store.closeSplash();
  };

  return (
    <View style={styles.top}>
      <Animatable.View
        animation="fadeOutUp"
        delay={3300}
        onAnimationEnd={navigate}>
        <Animatable.View animation="pulse" duration={1050} delay={2300}>
          <Animatable.View
            animation="flipInX"
            duration={1800}
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Animatable.Text
              animation="slideInDown"
              style={styles.main}
              duration={1110}>
              O
            </Animatable.Text>
            <Animatable.Text
              animation="slideInDown"
              style={styles.main}
              duration={1220}>
              R
            </Animatable.Text>
            <Animatable.Text
              animation="slideInDown"
              style={styles.main}
              duration={1330}>
              I
            </Animatable.Text>
            <Animatable.Text
              animation="slideInDown"
              style={styles.main}
              duration={1440}>
              E
            </Animatable.Text>
            <Animatable.Text
              animation="slideInDown"
              style={styles.main}
              duration={1550}>
              N
            </Animatable.Text>
            <Animatable.Text
              animation="slideInDown"
              style={styles.main}
              duration={1660}>
              T
            </Animatable.Text>
            <Animatable.Text
              animation="slideInDown"
              style={styles.main}
              duration={1770}>
              A
            </Animatable.Text>
            <Animatable.Text
              animation="slideInDown"
              style={styles.main}
              duration={1880}>
              T
            </Animatable.Text>
            <Animatable.Text
              animation="slideInDown"
              style={styles.main}
              duration={1990}>
              I
            </Animatable.Text>
            <Animatable.Text
              animation="slideInDown"
              style={styles.main}
              duration={2100}>
              O
            </Animatable.Text>
            <Animatable.Text
              animation="slideInDown"
              style={styles.main}
              duration={2210}>
              N
            </Animatable.Text>
            <Animatable.View style={{flexDirection: 'row', marginLeft: 8}}>
              <Animatable.Text
                style={styles.num}
                animation="fadeInLeftBig"
                duration={1700}>
                2
              </Animatable.Text>
              <Animatable.Text
                style={styles.num}
                animation="fadeInLeftBig"
                duration={1700}>
                1
              </Animatable.Text>
            </Animatable.View>
          </Animatable.View>
        </Animatable.View>
      </Animatable.View>
      <View style={styles.bottom}>
        <Animatable.View animation="fadeOutDown" delay={3300}>
          <Animatable.View animation="pulse" duration={1050} delay={2300}>
            <Animatable.View
              animation="slideInUp"
              duration={2210}
              style={{flexDirection: 'column', justifyContent: 'center'}}>
              <Text style={styles.spiderTexts}>Spider R&D</Text>
            </Animatable.View>
          </Animatable.View>
        </Animatable.View>
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  main: {
    fontSize: scale(26) / PixelRatio.getFontScale(),
    color: 'black',
    top: verticalScale(-25),
    fontFamily: 'Montserrat-Medium',
    fontWeight: 'bold',
  },

  num: {
    fontSize: scale(32) / PixelRatio.getFontScale(),
    color: '#f13e4d',
    top: verticalScale(-26),
    fontFamily: 'Montserrat-Bold',
  },

  spiderTexts: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: scale(16) / PixelRatio.getFontScale(),
    // fontWeight:"bold",
    color: 'darkblue',
    elevation: 1,
    fontFamily: 'Montserrat-Bold',
    textAlignVertical: 'center',
  },
  bottom: {
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: verticalScale(10), //
    width: '100%',
  },
  top: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});
