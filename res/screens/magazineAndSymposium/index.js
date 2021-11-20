import React from 'react';
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
} from 'react-native';

import symposiumData from '../../utils/symposiumData';
const Height = Dimensions.get('window').height;
import {Symp_Modal_Store} from '../../mobx/symposiumModalStore';
import {paddingSmall, borderRadius} from '../../utils/UIConstants';
import LinearGradient from 'react-native-linear-gradient';
import SympCard from '../../components/symp-card';
import {observer} from 'mobx-react';

const FlatListItemSeparator = () => {
  return <View style={{height: verticalScale(8)}} />;
};

const MagazineAndSymposium = observer(() => {
  const linkOpener = link => {
    Linking.canOpenURL(link).then(supported => {
      if (supported) {
        Linking.openURL(link);
      } else {
        console.log("Don't know how to open URI: " + link);
      }
    });
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{alignItems: 'center'}}>
        <FlatList
          data={symposiumData}
          showsHorizontalScrollIndicator={false}
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
            <Image
              source={{
                uri: Symp_Modal_Store.Url,
              }}
              resizeMode="cover"
              style={styles.image2}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={{marginLeft: scale(6), marginRight: scale(6)}}>
                <Text style={{fontSize: scale(30) / PixelRatio.getFontScale()}}>
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
                  }}>
                  {Symp_Modal_Store.Description}
                </Text>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
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
