import React, {useRef} from 'react';
import {useEffect, useState} from 'react';

import {
  Text,
  SafeAreaView,
  View,
  Modal,
  StyleSheet,
  Image,
  PixelRatio,
  TouchableOpacity,
  Linking,
  RefreshControl,
} from 'react-native';
import Toast from 'react-native-toast-notifications';
import {ScrollView} from 'react-native-gesture-handler';
import Clipboard from '@react-native-clipboard/clipboard';
import {scale, verticalScale} from 'react-native-size-matters';
import {paddingSmall, borderRadius, FONT} from '../../utils/UIConstants';
import {Icon, Layout} from '@ui-kitten/components';
import ClubCategory from './clubCategory';
import {observer} from 'mobx-react';
import {Club_Modal_Store} from '../../mobx/clubModalStore';
import LinearGradient from 'react-native-linear-gradient';
import {TOAST_COLOR} from '../../utils/colors';
import ErrorScreen from '../../components/errorScreen';
import LoaderPage from '../LoadingScreen';

const category = ['Technical', 'Cultural', 'Social', 'Fests'];

import {festApis, clubApis} from './API_CALLS';
const ClubsAndFests = observer(({navigation}) => {
  const toastRef = useRef();
  const linkOpener = link => {
    link = link.trim();

    Linking.canOpenURL(link).then(supported => {
      if (supported) {
        Linking.openURL(link);
      } else {
        console.log('Cannot open ' + link);
        Clipboard.setString(link);
        toastRef.current.show(`Copied link to clipboard`, {
          type: 'success',
          placement: 'top',
          animationType: 'slide-in',
        });
      }
    });
  };
  const [clubData, setClubData] = useState([]);

  const [clubLoading, setClubLoading] = useState(true);
  const [festData, setFestData] = useState([]);
  const [festLoading, setFestLoading] = useState(true);
  const [errorText, setErrorText] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isConnected, setConnectivity] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setClubLoading(false);
    setFestLoading(false);
    setSuccess(false);
    clubApis(
      setClubLoading,
      setConnectivity,
      setSuccess,
      setClubData,
      setErrorText,
    );
    festApis(
      setFestLoading,
      setConnectivity,
      setFestData,
      setSuccess,
      setErrorText,
    );
    setRefreshing(false);
  }, []);

  useEffect(() => {
    clubApis(
      setClubLoading,
      setConnectivity,
      setSuccess,
      setClubData,
      setErrorText,
    );
  }, []);

  useEffect(() => {
    festApis(
      setFestLoading,
      setConnectivity,
      setFestData,
      setSuccess,
      setErrorText,
    );
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <Layout style={{flex: 1, justifyContent: 'center'}}>
        {isConnected == false ? (
          <ErrorScreen
            errorMessage={errorText}
            navigation={navigation}
            buttonText="GO BACK"
            showIconInButton={true}
          />
        ) : clubLoading || festLoading ? (
          <LoaderPage navigation={navigation} />
        ) : success ? (
          <>
            <ScrollView
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }>
              <View style={{flex: 1}}>
                <ClubCategory
                  categoryName={category[0] + ' Clubs'}
                  clubList={clubData.technical}
                />
              </View>
              <View style={{flex: 1}}>
                <ClubCategory
                  categoryName={category[1] + ' Clubs'}
                  clubList={clubData.cultural}
                />
              </View>
              <View style={{flex: 1}}>
                <ClubCategory
                  categoryName={category[2] + ' Clubs'}
                  clubList={clubData.social}
                />
              </View>
              <View style={{flex: 1, marginBottom: verticalScale(20)}}>
                <ClubCategory
                  categoryName={category[3]}
                  clubList={festData.data}
                />
              </View>
              <Modal
                visible={Club_Modal_Store.ModalState}
                animationType="fade"
                transparent={true}
                onRequestClose={() => {
                  Club_Modal_Store.closeModal();
                }}>
                <View style={styles.content}>
                  <View
                    style={{
                      backgroundColor: 'rgba(254,252,248, 0.97)',
                      flex: 1,
                      borderRadius: scale(borderRadius),
                      elevation: 5,
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        Club_Modal_Store.closeModal();
                      }}
                      style={{
                        position: 'absolute',
                        zIndex: 1,
                        right: 0,
                        backgroundColor: '#e2e2df',
                        margin: scale(3),
                        borderRadius: scale(16),
                      }}>
                      <Icon
                        style={{width: scale(24), height: scale(24)}}
                        fill="black"
                        name="close"
                      />
                    </TouchableOpacity>
                    <Image
                      source={{
                        uri: Club_Modal_Store.Url,
                      }}
                      resizeMode="cover"
                      style={styles.image2}
                    />
                    <ScrollView showsVerticalScrollIndicator={false}>
                      <View
                        style={{marginLeft: scale(6), marginRight: scale(6)}}>
                        <Text
                          style={{
                            fontSize: scale(30) / PixelRatio.getFontScale(),
                            fontFamily: FONT,
                            paddingHorizontal: scale(6),
                            fontWeight: '900',
                          }}>
                          {Club_Modal_Store.ClubName}
                        </Text>

                        <View
                          style={{
                            flexDirection: 'row',

                            justifyContent: 'flex-end',
                          }}>
                          {Club_Modal_Store.Website ? (
                            <TouchableOpacity
                              onPress={() => {
                                linkOpener(Club_Modal_Store.Website);
                              }}>
                              <Icon
                                style={styles.icon}
                                fill="black"
                                name="globe"
                                pack="FontAwesome5"
                              />
                            </TouchableOpacity>
                          ) : (
                            <></>
                          )}
                          {Club_Modal_Store.LinkedIn ? (
                            <TouchableOpacity
                              onPress={() => {
                                linkOpener(Club_Modal_Store.LinkedIn);
                              }}>
                              <Icon
                                style={styles.icon}
                                fill="black"
                                name="linkedin"
                                pack="FontAwesome5"
                              />
                            </TouchableOpacity>
                          ) : (
                            <></>
                          )}
                          {Club_Modal_Store.Youtube ? (
                            <TouchableOpacity
                              onPress={() => {
                                linkOpener(Club_Modal_Store.Youtube);
                              }}>
                              <Icon
                                style={{
                                  width: scale(23),
                                  height: verticalScale(18),
                                  marginHorizontal: scale(2),
                                }}
                                fill="black"
                                name="youtube"
                                pack="FontAwesome5"
                              />
                            </TouchableOpacity>
                          ) : (
                            <></>
                          )}
                          {Club_Modal_Store.Instagram ? (
                            <TouchableOpacity
                              onPress={() => {
                                linkOpener(Club_Modal_Store.Instagram);
                              }}>
                              <Icon
                                style={styles.icon}
                                fill="black"
                                name="instagram"
                                pack="FontAwesome5"
                              />
                            </TouchableOpacity>
                          ) : (
                            <></>
                          )}
                          {Club_Modal_Store.Medium ? (
                            <TouchableOpacity
                              onPress={() => {
                                linkOpener(Club_Modal_Store.Medium);
                              }}>
                              <Icon
                                style={styles.icon}
                                fill="black"
                                name="medium"
                                pack="FontAwesome5"
                              />
                            </TouchableOpacity>
                          ) : (
                            <></>
                          )}
                          {Club_Modal_Store.Facebook ? (
                            <TouchableOpacity
                              onPress={() => {
                                linkOpener(Club_Modal_Store.Facebook);
                              }}>
                              <Icon
                                style={styles.icon}
                                fill="black"
                                name="facebook-square"
                                pack="FontAwesome5"
                              />
                            </TouchableOpacity>
                          ) : (
                            <></>
                          )}
                        </View>
                      </View>
                      <LinearGradient
                        start={{x: 0.0, y: 0.25}}
                        end={{x: 0.5, y: 1.0}}
                        locations={[0, 0.6, 0.8]}
                        colors={['#f13e4d', '#ff5130', '#ff512f']}
                        style={{
                          height: verticalScale(1),
                          backgroundColor: '#eaeaea',
                          marginHorizontal: scale(5),
                          marginVertical: verticalScale(6),
                          opacity: 0.8,
                        }}
                      />

                      <View
                        style={{
                          marginTop: verticalScale(3),
                          marginLeft: scale(6),
                          marginRight: scale(6),
                          borderRadius: scale(borderRadius),
                          paddingVertical: verticalScale(paddingSmall),
                          marginBottom: verticalScale(6),
                        }}>
                        <Text
                          style={{
                            fontSize: scale(16) / PixelRatio.getFontScale(),
                            width: '100%',
                            textAlign: 'justify',
                            lineHeight: verticalScale(30),
                            fontFamily: FONT,
                            paddingHorizontal: scale(6),
                          }}>
                          {Club_Modal_Store.Description}
                        </Text>
                      </View>
                    </ScrollView>
                  </View>
                </View>
                <Toast
                  successColor={TOAST_COLOR}
                  ref={toastRef}
                  offset={verticalScale(35)}
                  duration={1500}
                  textStyle={{fontFamily: FONT, fontSize: scale(14)}}
                />
              </Modal>
            </ScrollView>
          </>
        ) : (
          <ErrorScreen errorMessage={errorText} />
        )}
      </Layout>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  content: {
    borderRadius: borderRadius,
    padding: scale(14),
    backgroundColor: 'rgba(204, 198, 204, 0.8)',
    flex: 1,
  },
  text: {
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    textAlign: 'justify',
  },

  image2: {
    height: verticalScale(300),
    borderRadius: borderRadius,
  },
  icon: {
    width: scale(20),
    height: verticalScale(18),
    marginHorizontal: scale(3),
  },
});

export default ClubsAndFests;
