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
                  uri: 'https://lh3.googleusercontent.com/RaTlsxs5MWJ3MV-O8KlvTfdEhm-wSaH26byKXwLDFrKvReVnIEXKDlzFGVvYxB6H2Qvg48l3bnuoChEZtZlzEoTfuVv0Wz3iMRz5EsjysFHqi7C2jLOaFVr3ezyygofMlgm8znD4xdubmHRLfn7Vw6V1NmEdo3O-9mOLgGqIdS24oV4-7-qHepCKFSB-pWXTX18yb1NiCXLleoLDJcpe68NQ4fcXErFQDdWD3r-S-tCe-XfXo0rzQVl38bbXiflgB-OfDzJNj1dr-egyX7LbkyjdC1iRyRBBTYKPxKdIi7lK8LCaioI_e9YM16AEJ5d0AL3LX8uWiaL1bD7KY42ZcFOaDhgMNd4HFN2CRIagZz8PWSmSQcT43Qrz1J6inoTdSFN_zWASJLnHbDRa3koQXisSl_6KZFJHWmYi_mnJxr9giQeN1CqLCmKyQpwyG1fM3wvH3psJxQXktC8GNxITGOaci_OlXqw9J-AxWrRYPngITWAEVjgaxAVVBOC7mgEt5g7LP1pyXsN6nitvM3GwBuIjogQNqypJ3m9hapItgn-5nh4ZiXrKCgfvCYbH68zmbHx5cWagR1eoFQyyMvlgunlIhLOOe8DWa7xpwnjeOmou21mktBZibwMAc22pEvf453s5-nUYO_UPWiNL-m_DXN1dIUfN37QZG5OUGSBVOneo-yDKKXzBGLD4eP6G-3WqPM4p6-_XexPVNGMVWQaZrYE=w380-h241-no?authuser=0',
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
                  uri: 'https://lh3.googleusercontent.com/gF7N6LpI9YU0SKgiCwEuAti2x092NFHK6prBzr96GwUA1i8n08MhLiBLVANH1ZEBvOZU_wPbRl9yMbAZms-A2C4YfSdwLlN568ta-jI5z8ozCEUdAHZlTRUrv8W64tLlBTfPk1NtJU8d4jrsTsOVm7JgAlmKVfBRNbk7wQUgSITYz27jmBRDHKRmOSkrm6zQbqY6Hv1rmGk0cRbDkSiLW2aL3P0p0FAWDrgyhY4ziBNQ7HhOzYt_l3XH1N9PB7a4YJB5A76DAhvcCAFMJEC8wbSaWAJNs8kVp6ZOBtNwmEXM60dC9Oulgr2-bjir6jYOs1St77eE_92mpJ3WzRZCEluehFNjQkkYzaHXpz0mtjb7TrjUkh3UOmIgPRQIdRVVQkDgi9fN4D0U5q2ldNLXivBkm6cCXZxG0vLzvtt9uxuudUHNNchKa7XZuUBdAED1GREvKqTLJ5bPC7Npn_Pvv_jXZcMkAS7RI2wVZUwtfFS7JBRgbt0w5PgEKwtboJ5i2iao_gb1-zte7f1JpPzhTY8-dz1of4Kw0bmMTwU5UxYC18rv6LnwrwtumhAbFhvGE8xOKXMIJMb95-i1MdNqf1fcL8H0igVGYZW-0YxCY1GWu5nixrBl1FEq0ApW-Sn20cFJBz9F3RJVimMYEiPoW6ANZZC26XjoedVxoFQ_CBs9_-gwBuMxy7s9cf1z7a14pldDHdbaqGnytNMaqaG-h3I=w882-h952-no?authuser=0',
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
                  uri: 'https://lh3.googleusercontent.com/Ffyxz4D0_YM63UUOzobSfGUyzU2Di2U52272_8T2jIC6UnbCVyZxgAos1R1NXp-KtNLNuuEzOJ8MSjOTOZJkNp0R114q0ce-OtFYxUAnwhnZkZlH9o_NCDRcKa-nJHK-9tOOkndh41HkblWrbSnLea3iRLvX_U8Uh9bW8fYuss9DwkecDiX40XG3amRoA0sKTOWW6mqMe2lcXQbkx0qwqILK9bSw5xeYQXQcdjGXny-adJtTcKo-jWL_HgPAKsT_XKeQG8JOv5l1hNnGW6IXvZwJgasQxLBJh7ANdQlkUKxj5Jgk5JFISB4IqPj7e0aEIMYZZidOLbnCkRTJjYsJK4EfP96yUbbR6F5el5BjAqmxlNonacrNB1uHiahFbGyjvr9JEykpZQK9TPnV0RoG3k8Y0QpN1_wyTYPjLE7IaLfvGBz_u-sHhJVxoTq6fZ3HShIINyxcafEAdfECMK05Y-7kIPamltaevmS2Usg-BtJQLJ5xkmuYdB86mZV__-PkmIH3AGdbN__JLe33hS1q-XasCh4rFe7GisIvgRFwvEehbMORlkDIlIDtBC-8U57VSrIktE9Dl0_eeu6OA1Uvb1800I9jW87pF_bFXuJxjYruoILCU8q9JIfnolm0Vo8zcSUKPs9fM4Dx7pZDd_WlOwIUD0T5qNtUujcr9kFK1bb3lC8fAHNKkd9sNjaESSRglKYwHZbh_WBg_j4z6uhGLTY=w358-h654-no?authuser=0',
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
