import React from 'react';

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
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {scale, verticalScale} from 'react-native-size-matters';
import {
  paddingMedium,
  paddingSmall,
  borderRadius,
  fontSizeMedium,
} from '../../utils/UIConstants';
import {Icon} from '@ui-kitten/components';
import ClubCategory from './clubCategory';

import {observer} from 'mobx-react';
import {Club_Modal_Store} from '../../mobx/clubModalStore';
import LinearGradient from 'react-native-linear-gradient';

const data = {
  technical: [
    {
      _id: '618d37328df3a8200872541a',
      imageUrl: 'https://i.ibb.co/bzJZ00K/Spider-Logo-Shubham-Saha.jpg',
      name: 'Spider',
      description:
        "Spider, the Research and Development Club of NIT Trichy is a group of people enthusiastic about technology and innovation. We ideate and pursue projects that are relevant to today's industry in fields like Artificial Intelligence and Machine Learning, Electronics, Computer Technology along with App and Web Development. Spread across 4 domains: Algorithms, Tronix, App Development and Web Development, we as a team look forward to Ideate and Innovate to take Research and Development projects to greater heights.",
      category: 'Technical',
      website: 'https://spider.nitt.edu/',
      LinkedIn: 'https://www.linkedin.com/company/spider-r-d/ ',
      Youtube: 'https://www.youtube.com/channel/UC0JTWs8r33HNaUgypshwpFA',
      Instagram: 'https://www.instagram.com/spider_nitt/ ',
      Medium: 'https://medium.com/spidernitt ',
      Facebook: 'https://www.facebook.com/SpiderNitt/ ',
      __v: 0,
    },
    {
      _id: '618d37d58df3a8200872541d',
      imageUrl: 'https://i.ibb.co/Mc16xDp/Maximus-logo-lochan-chenna.jpg',
      name: 'Maximus - The Math Society of NITT',
      description:
        "Maximus is a close knit community of philomaths, allured by the paradoxes of mathematics. Since it's founding in 2015, Maximus has taken a profusion of initiatives to bestir the inquisitiveness for maths among the students of our college.One such initiative is conducting 'Engineering Mathematics' and 'Programming in C' classes for the first year students of our college.With the 'Maths Week' being the highlight of our mettle, we conduct events like workshops, hackathons, and several other contests throughout the year to explore the bounds of mathematics.",
      category: 'Technical',
      website: '',
      LinkedIn: 'https://www.linkedin.com/company/maximus-nitt',
      Youtube: '',
      Instagram: ' https://www.instagram.com/maximus_nitt/',
      Medium: '',
      Facebook: 'https://www.facebook.com/MaximusNITT',
      __v: 0,
    },
    {
      _id: '618d38088df3a82008725420',
      imageUrl: 'https://i.ibb.co/M5CdbJF/RMI-logo-2-2-hari-shankar.png',
      name: 'RMI',
      description:
        'Robotics and Machine Intelligence (RMI), is the official robotics and technical research club of NIT Trichy. We primarily focus on technical, research projects and competitions in Robotics, Artificial Intelligence and related fields. We also conduct workshops and events throughout the year to encourage enthusiastic students to learn and pursue robotics. We are one of the oldest clubs in our campus with strong alumni connections all around the world doing active research in the field of robotics and resources required for students to explore the field of robotics.',
      category: 'Technical',
      website: 'https://rmi.nitt.edu/',
      LinkedIn: '',
      Youtube: '',
      Instagram: 'https://www.instagram.com/rmi_nitt/',
      Medium: '',
      Facebook: '',
      __v: 0,
    },
    {
      _id: '618d39028df3a82008725423',
      imageUrl: 'https://i.ibb.co/PMSR7jC/3-D-Nivethaa-Ravi.png',
      name: '3rd Dimesion Aeromodelling Club',
      description:
        'At The 3rd Dimension Aeromodelling Club, we engage ourselves to design and develop a span of models varying from Aerodynamic gliders to Autonomous Drones. We take up projects that unfold new areas related to aeromodelling, fluid mechanics, surveillance, advanced control systems, and auto-piloting algorithms, which sets new records for us. The club was founded in 2013 by many aeromodelling enthusiasts who had a passion for defying gravity and soaring high by building UAVs from scratch. Over the years, our models were evolved significantly, our domain has expanded wide, and we have secured many podiums in different National Competitions and events.​',
      category: 'Technical',
      website: ' https://3d.nitt.edu',
      LinkedIn:
        'https://www.linkedin.com/company/the-third-dimension-aeromodelling-club',
      Youtube: '',
      Instagram: 'https://www.instagram.com/3d_nitt',
      Medium: '',
      Facebook: ' https://www.facebook.com/3d.amc.nitt',
      __v: 0,
    },
  ],
  cultural: [],
  community: [],
};

const ClubsAndFests = observer(() => {
  //on click icon
  const linkOpener = link => {
    Linking.canOpenURL(link).then(supported => {
      if (supported) {
        Linking.openURL(link);
      } else {
        console.log("Don't know how to open URI: " + link);
      }
    });
  };
  console.log(Club_Modal_Store.Medium);
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <ClubCategory
          categoryName={data.technical[0].category}
          clubList={data.technical}
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
            <Image
              source={{
                uri: Club_Modal_Store.Url,
              }}
              resizeMode="cover"
              style={styles.image2}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={{marginLeft: scale(6), marginRight: scale(6)}}>
                <Text style={{fontSize: scale(30) / PixelRatio.getFontScale()}}>
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
                        style={styles.icon}
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
                  {Club_Modal_Store.Description}
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

export default ClubsAndFests;
