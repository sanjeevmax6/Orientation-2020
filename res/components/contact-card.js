import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {Card, Layout, Icon} from '@ui-kitten/components';
import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  PixelRatio,
  Image,
  Modal,
  ScrollView,
} from 'react-native';
import {Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {scale, verticalScale} from 'react-native-size-matters';

import {
  borderRadius,
  borderRadiusLarge,
  fontSizeMedium,
  paddingSmall,
  Pressable,
  paddingBig,
  paddingMedium,
} from '../utils/UIConstants';
import {Black, Grey, White} from '../utils/colors';

let cardHeight = 200;
let cardWidth = 150;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ContactCard = props => {
  const [visible, setVisible] = useState(false);
  return (
    <View>
      <Card style={styles.card}>
        <TouchableOpacity onPress={() => setVisible(true)}>
          <ImageBackground
            source={{
              uri: 'https://i.pinimg.com/736x/51/62/1b/51621b2f3f79d8b25ddb8bccbbf366ca--north-india-smiling-faces.jpg',
            }}
            resizeMode="cover"
            style={styles.image}>
            <LinearGradient
              colors={['transparent', 'rgba(10, 10, 10, 0.75)', Black]}
              style={styles.linearGradient}
              locations={[0.5, 0.75, 1.0]}
            />
            <View style={styles.textContainer}>
              <Text numberOfLines={1} style={styles.textName}>
                {props.name}
              </Text>
              <Text numberOfLines={1} style={styles.textBody}>
                {props.dept}
              </Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      </Card>

      <Modal
        visible={visible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => {
          setVisible(false);
        }}>
        <View style={styles.content}>
          <View
            style={{
              backgroundColor: 'rgba(254,252,248, 0.97)',
              flex: 1,
              borderRadius: scale(borderRadius),
            }}>
            <Image
              source={{
                uri: 'https://i.pinimg.com/736x/51/62/1b/51621b2f3f79d8b25ddb8bccbbf366ca--north-india-smiling-faces.jpg',
              }}
              resizeMode="cover"
              style={styles.image2}
            />

            <View style={{marginLeft: scale(6), marginRight: scale(6)}}>
              <Text numberOfLines={1} style={{fontSize: scale(30)}}>
                {props.name}
              </Text>
              <View style={{flexDirection: 'row'}}>
                <Icon style={styles.icon} fill={Black} name="phone" />
                <Text numberOfLines={1} style={styles.text}>
                  {props.phone}
                </Text>
              </View>
            </View>
            <View
              style={{
                height: verticalScale(1),
                backgroundColor: '#eaeaea',
                marginHorizontal: scale(3),
              }}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
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
                    fontSize: scale(16),
                    width: '100%',
                    textAlign: 'justify',
                  }}>
                  {props.intro}
                </Text>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    height: verticalScale(cardHeight),
    width: scale(cardWidth),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: scale(borderRadiusLarge),
    borderWidth: 0,
    //margin: paddingMedium,
  },
  image: {
    height: verticalScale(cardHeight),
    width: scale(cardWidth),
  },
  linearGradient: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    height: verticalScale(cardHeight),
    width: scale(cardWidth),
  },
  infoContainer: {
    flexDirection: 'row',
    // alignItems: 'center',
  },
  textContainer: {
    height: verticalScale(40),
    width: scale(120),
    position: 'absolute',
    bottom: 0,
  },
  textName: {
    marginLeft: scale(paddingMedium),
    fontSize: scale(fontSizeMedium) / PixelRatio.getFontScale(),
    color: White,
  },
  textBody: {
    marginLeft: scale(paddingMedium),
    fontSize: scale(fontSizeMedium) / PixelRatio.getFontScale(),
    color: White,
    marginTop: verticalScale(-3),
  },

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
    width: scale(16),
    height: verticalScale(16),
    marginRight: scale(6),
  },
});

export default ContactCard;
