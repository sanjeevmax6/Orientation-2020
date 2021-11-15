import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {Card, Layout, Modal, Icon} from '@ui-kitten/components';
import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  PixelRatio,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import {scale, verticalScale} from 'react-native-size-matters';

import {
  borderRadius,
  borderRadiusLarge,
  fontSizeMedium,
  paddingSmall,
  paddingMedium,
} from '../utils/UIConstants';
import {Black, White} from '../utils/colors';

let cardHeight = 200;
let cardWidth = 150;
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
        backdropStyle={styles.backdrop}
        visible={visible}
        onBackdropPress={() => setVisible(false)}>
        <Layout style={styles.content}>
          <View style={styles.imageContainer}>
            <Card style={styles.circle}>
              <View
                style={{
                  marginLeft: scale(-24),
                  marginTop: scale(-14),
                  backgroundColor: White,
                }}>
                <ImageBackground
                  source={{
                    uri: 'https://i.pinimg.com/736x/51/62/1b/51621b2f3f79d8b25ddb8bccbbf366ca--north-india-smiling-faces.jpg',
                  }}
                  resizeMode="cover"
                  style={styles.image2}></ImageBackground>
              </View>
            </Card>
            <View>
              <View style={styles.infoContainer}>
                <Icon style={styles.icon} fill={Black} name="person" />
                <Text style={styles.text}>{props.name}</Text>
              </View>
              <View style={styles.infoContainer}>
                <Icon style={styles.icon} fill={Black} name="home" />
                <Text style={styles.text}>{props.dept}</Text>
              </View>
              <View style={styles.infoContainer}>
                <Icon style={styles.icon} fill={Black} name="phone" />
                <Text style={styles.text}>{props.phone}</Text>
              </View>
              <View style={styles.infoContainer}>
                <Icon style={styles.icon} fill={Black} name="info" />
                <Text style={styles.text}>{props.intro}</Text>
              </View>
            </View>
          </View>
        </Layout>
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
    marginVertical: 3,
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
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 4,
    paddingVertical: 4,
    borderRadius: borderRadius,
  },
  text: {
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    width: scale(cardWidth+30),
    textAlign: 'justify'
  },
  imageContainer: {
    // height: verticalScale(150),
    // width: scale(200),
    margin : verticalScale(10),
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  circle: {
    height: verticalScale(70),
    width: scale(70),
    borderRadius: scale(1000),
    borderWidth: scale(3),
    marginBottom: verticalScale(10),
  },
  image2: {
    height: verticalScale(70),
    width: scale(70),
  },
  icon: {
    width: scale(18),
    height: verticalScale(18),
    marginRight: 8,
  },
});

export default ContactCard;
