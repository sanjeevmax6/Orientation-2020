import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {Card, Icon} from '@ui-kitten/components';
import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  PixelRatio,
  Image,
  Modal,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';

import {
  borderRadius,
  borderRadiusLarge,
  fontSizeMedium,
  paddingMedium,
  fontSizeSmall,
  fontSizeVeryLarge,
  FONT,
} from '../utils/UIConstants';
import {Black, White} from '../utils/colors';

let cardHeight = 200;
let cardWidth = 150;

const ContactCard = ({item}) => {
  const [visible, setVisible] = useState(false);
  return (
    <View>
      <Card style={styles.card}>
        <TouchableOpacity onPress={() => setVisible(true)}>
          <ImageBackground
            source={{
              uri: item.imageUrl,
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
                {item.name}
              </Text>
              <Text numberOfLines={1} style={styles.textBody}>
                {item.department}
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
          <TouchableOpacity
            onPress={() => {
              setVisible(false);
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
          <View
            style={{
              backgroundColor: 'rgba(254,252,248, 0.97)',
              borderRadius: scale(borderRadius),
            }}>
            <Image
              source={{
                uri: item.imageUrl,
              }}
              resizeMode="cover"
              style={styles.image2}
            />

            <View
              style={{
                marginLeft: scale(6),
                marginRight: scale(6),
                alignItems: 'center',
                paddingBottom: verticalScale(8),
              }}>
              <Text
                style={{fontSize: scale(fontSizeVeryLarge), fontFamily: FONT}}>
                {item.name}
              </Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon style={styles.icon} fill={Black} name="phone" />
                <Text
                  selectable={true}
                  selectionColor={'#f13e4d'}
                  style={styles.phoneText}>
                  {item.mobile}
                  {'   '}|{'   '}
                </Text>
                <Icon style={styles.icon} fill={Black} name="browser-outline" />
                <Text style={styles.phoneText}>{item.department}</Text>
              </View>
            </View>
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
    marginHorizontal: scale(8),
    marginVertical: scale(8),
    elevation: 5,
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
    fontWeight: 'bold',
    fontFamily: FONT,
  },
  textBody: {
    marginLeft: scale(paddingMedium),
    fontSize: scale(fontSizeSmall) / PixelRatio.getFontScale(),
    color: White,
    fontFamily: FONT,
  },

  content: {
    borderTopLeftRadius: moderateScale(borderRadius),
    borderTopRightRadius: moderateScale(borderRadius),
    padding: scale(10),
    backgroundColor: 'rgba(204, 198, 204, 0.8)',
    justifyContent: 'center',
    flex: 1,
  },
  phoneText: {
    alignItems: 'center',
    fontSize: moderateScale(16),
    fontFamily: FONT,
  },

  image2: {
    height: verticalScale(300),
    borderTopLeftRadius: moderateScale(borderRadius),
    borderTopRightRadius: moderateScale(borderRadius),
  },
  icon: {
    width: scale(16),
    height: verticalScale(16),
    marginRight: scale(6),
  },
});

export default ContactCard;
