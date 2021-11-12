import React from 'react';
import {Card, Layout, Text} from '@ui-kitten/components';
import {ImageBackground, SafeAreaView, StyleSheet, View} from 'react-native';
import ContactCard from '../../components/contact-card';
import {scale, verticalScale} from 'react-native-size-matters';
import {
  borderRadiusLarge,
  fontSizeMedium,
  fontSizeVeryLarge,
  paddingMedium,
  paddingSmall,
} from '../../utils/UIConstants';
import {Black, White, Yellow} from '../../utils/colors';
import LinearGradient from 'react-native-linear-gradient';

const Contacts = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Layout style={{flex: 1}}>
        <View style={styles.container}>
          <View style={styles.leftContainer}>
            <Card
              style={styles.peers}
              onPress={() => {
                navigation.navigate('Peers');
              }}>
              <ImageBackground
                source={{
                  uri: 'https://i.ibb.co/Bn66spG/CT.png',
                }}
                resizeMode="contain"
                style={styles.peersImg}>
                <LinearGradient
                  colors={['transparent', 'rgba(10, 10, 10, 0.5)', Black]}
                  style={styles.linearGradient}
                  locations={[0.5, 0.75, 1.0]}
                />
                <Text style={styles.name}>Peers</Text>
              </ImageBackground>
            </Card>
            <Card
              style={styles.team}
              onPress={() => {
                navigation.navigate('Orientation');
              }}>
              <ImageBackground
                source={{
                  uri: 'https://i.ibb.co/xfqhx88/peers.png',
                }}
                resizeMode="stretch"
                style={styles.teamImg}>
                <LinearGradient
                  colors={['transparent', 'rgba(10, 10, 10, 0.5)', Black]}
                  style={styles.linearGradient}
                  locations={[0.5, 0.75, 1.0]}
                />
                <Text style={styles.name}>Orientation</Text>
              </ImageBackground>
            </Card>
          </View>
          <View style={styles.rightContainer}>
            <Card
              style={styles.admin}
              onPress={() => {
                navigation.navigate('Admin');
              }}>
              <ImageBackground
                source={{
                  uri: 'https://i.ibb.co/HB74wwq/CTd-removebg-preview.png',
                }}
                resizeMode="stretch"
                style={styles.adminImg}>
                <LinearGradient
                  colors={['transparent', 'rgba(10, 10, 10, 0.5)', Black]}
                  style={styles.linearGradient}
                  locations={[0.5, 0.75, 1.0]}
                />
                <Text style={styles.name}>Admin</Text>
              </ImageBackground>
            </Card>
          </View>
        </View>
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: scale(paddingMedium),
    paddingLeft: scale(paddingMedium),
  },
  leftContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rightContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  admin: {
    backgroundColor: Yellow,
    width: scale(150),
    height: verticalScale(400),
    alignItems: 'center',
    borderRadius: borderRadiusLarge,
    marginLeft: paddingSmall,
  },
  peers: {
    backgroundColor: Yellow,
    width: scale(150),
    height: verticalScale(190),
    alignItems: 'center',
    borderRadius: borderRadiusLarge,
    marginRight: paddingSmall,
    marginBottom: paddingSmall,
  },
  team: {
    backgroundColor: Yellow,
    width: scale(150),
    height: verticalScale(190),
    alignItems: 'center',
    borderRadius: borderRadiusLarge,
    marginRight: paddingSmall,
    marginTop: paddingSmall,
  },
  adminImg: {
    width: scale(150),
    height: verticalScale(400),
    marginTop: scale(-15),
    alignItems: 'center',
  },
  peersImg: {
    width: scale(150),
    height: verticalScale(190),
    marginTop: scale(-15),
    alignItems: 'center',
    backgroundColor: 'white',
  },
  teamImg: {
    width: scale(150),
    height: verticalScale(190),
    marginTop: scale(-15),
    alignItems: 'center',
  },
  linearGradient: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    height: '100%',
    width: '100%',
  },
  name: {
    fontSize: fontSizeVeryLarge,
    position: 'absolute',
    bottom: 0,
    color: White,
    marginLeft: paddingMedium - 2,
    marginBottom: paddingSmall,
  },
});

export default Contacts;
