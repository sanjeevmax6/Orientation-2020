import React, {useEffect} from 'react';
import {scale, verticalScale} from 'react-native-size-matters';
import {Icon} from '@ui-kitten/components';
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
  ScrollView,
  Dimensions,
  FlatList,
  RefreshControl,
} from 'react-native';

const Height = Dimensions.get('window').height;
import {Symp_Modal_Store} from '../../mobx/symposiumModalStore';
import {paddingSmall, borderRadius, FONT} from '../../utils/UIConstants';
import LinearGradient from 'react-native-linear-gradient';
import SympCard from '../../components/symp-card';
import {observer} from 'mobx-react';
import {useState} from 'react';
import NetInfo from '@react-native-community/netinfo';
import {API_GET_SYMP_DATA} from '../../utils/APIConstants';
import {UserData} from '../../mobx/userStore';
import * as ERRORS from '../../utils/ERROR_MESSAGES';
import ErrorScreen from '../../components/errorScreen';
import LoaderPage from '../LoadingScreen';

const FlatListItemSeparator = () => {
  return <View style={{height: verticalScale(10)}} />;
};

const MagazineAndSymposium = observer(({navigation}) => {
  const linkOpener = link => {
    Linking.canOpenURL(link).then(supported => {
      if (supported) {
        Linking.openURL(link);
      } else {
        console.log("Don't know how to open URI: " + link);
      }
    });
  };

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorText, setErrorText] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isConnected, setConnectivity] = useState(false);
  const [refreshing, setRefeshing] = useState(false);

  const sympApis = () => {
    const axios = require('axios');
    NetInfo.fetch().then(state => {
      if (state.isConnected == true) {
        setLoading(true);
        setConnectivity(true);
        axios
          .get(API_GET_SYMP_DATA, {
            headers: {token: UserData.token},
          })
          .then(response => {
            setLoading(false);
            setSuccess(true);
            setData(response.data);
            console.log('Symp data API success');
          })
          .catch(error => {
            if (error.response) {
              setLoading(false);
              setErrorText(error.response.data.message);
              setSuccess(false);
            } else if (error.request) {
              setErrorText(ERRORS.TIME_OUT);
              setSuccess(false);
              setLoading(false);
            } else {
              setLoading(false);
              setSuccess(false);
              setErrorText(ERRORS.UNEXPECTED);
            }
          });
      } else {
        setSuccess(false);
        setConnectivity(false);
        setErrorText(ERRORS.NO_NETWORK);
      }
    });
  };

  const onRefresh = React.useCallback(() => {
    setRefeshing(true);
    setLoading(false);
    setSuccess(false);
    sympApis();
    setRefeshing(false);
  }, []);

  useEffect(() => {
    sympApis();
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      {isConnected == false ? (
        <ErrorScreen
          errorMessage={errorText}
          navigation={navigation}
          buttonText="MENU"
        />
      ) : loading ? (
        <LoaderPage navigation={navigation} />
      ) : success ? (
        <>
          <View style={{alignItems: 'center'}}>
            <FlatList
              data={data.data}
              showsHorizontalScrollIndicator={false}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              showsVerticalScrollIndicator={false}
              ListHeaderComponent={FlatListItemSeparator}
              ItemSeparatorComponent={FlatListItemSeparator}
              ListFooterComponent={FlatListItemSeparator}
              renderItem={({item}) => (
                <>
                  <SympCard
                    Name={item.name}
                    department={item.department}
                    url={item.imageUrl}
                    description={item.description}
                    LinkedIn={item.LinkedIn}
                    website={item.website}
                    Youtube={item.Youtube}
                    Instagram={item.Instagram}
                    Medium={item.Medium}
                    Facebook={item.Facebook}
                  />
                </>
              )}
            />
          </View>
          <Modal
            visible={Symp_Modal_Store.ModalState}
            animationType="fade"
            transparent={true}
            onRequestClose={() => {
              Symp_Modal_Store.closeModal();
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
                    Symp_Modal_Store.closeModal();
                  }}
                  style={{
                    position: 'absolute',
                    zIndex: 1,
                    right: scale(6),
                    top: verticalScale(6),

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
                    uri: Symp_Modal_Store.Url,
                  }}
                  resizeMode="cover"
                  style={styles.image2}
                />
                <ScrollView showsVerticalScrollIndicator={false}>
                  <View style={{marginLeft: scale(6), marginRight: scale(6)}}>
                    <Text
                      style={{
                        fontSize: scale(30) / PixelRatio.getFontScale(),
                        fontFamily: FONT,
                      }}>
                      {Symp_Modal_Store.ClubName}
                    </Text>

                    <View
                      style={{
                        flexDirection: 'row',

                        justifyContent: 'flex-end',
                      }}>
                      {Symp_Modal_Store.Website ? (
                        <TouchableOpacity
                          onPress={() => {
                            linkOpener(Symp_Modal_Store.Website);
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
                      {Symp_Modal_Store.LinkedIn ? (
                        <TouchableOpacity
                          onPress={() => {
                            linkOpener(Symp_Modal_Store.LinkedIn);
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
                      {Symp_Modal_Store.Youtube ? (
                        <TouchableOpacity
                          onPress={() => {
                            linkOpener(Symp_Modal_Store.Youtube);
                          }}>
                          <Icon
                            style={styles.icon}
                            fill="black"
                            name="youtube"
                            pack="FontAwesome5"
                          />
                        </TouchableOpacity>
                      ) : (
                        <></>
                      )}
                      {Symp_Modal_Store.Instagram ? (
                        <TouchableOpacity
                          onPress={() => {
                            linkOpener(Symp_Modal_Store.Instagram);
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
                      {Symp_Modal_Store.Medium ? (
                        <TouchableOpacity
                          onPress={() => {
                            linkOpener(Symp_Modal_Store.Medium);
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
                      {Symp_Modal_Store.Facebook ? (
                        <TouchableOpacity
                          onPress={() => {
                            linkOpener(Symp_Modal_Store.Facebook);
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
                      marginHorizontal: scale(3),
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
                      }}>
                      {Symp_Modal_Store.Description}
                    </Text>
                  </View>
                </ScrollView>
              </View>
            </View>
          </Modal>
        </>
      ) : (
        <ErrorScreen errorMessage={errorText} />
      )}
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  content: {
    borderRadius: borderRadius,
    padding: scale(10),
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

export default MagazineAndSymposium;
