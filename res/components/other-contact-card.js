import React from 'react';
import {Card, Icon, Text} from '@ui-kitten/components';
import {
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {FONT, paddingSmall} from '../utils/UIConstants';
import Clipboard from '@react-native-clipboard/clipboard';
import {scale, verticalScale} from 'react-native-size-matters';
import {Black, White} from '../utils/colors';
import {useToast} from 'react-native-toast-notifications';
import {borderRadiusMedium} from '../utils/UIConstants';
import {isAtom} from 'mobx/dist/internal';

const TransportationCard = ({item}) => {
  const toast = useToast();

  return (
    <View>
      <Card style={styles.card}>
        <View style={styles.cardContainer}>
          <Icon style={styles.icon} fill={Black} name="person" />
          <Text style={styles.text}>{item.name}</Text>
        </View>
        <View style={styles.cardContainer}>
          <Icon style={styles.icon} fill={Black} name="phone" />
          <TouchableOpacity
            onPress={() => {
              //Clipboard.setString(data.mobile + '');
              toast.show(`Copied Name phone number to clipboard`, {
                type: 'success',
                placement: 'top',
                duration: 1500,
                offsetTop: verticalScale(1000),
                animationType: 'slide-in',
              });
            }}>
            <Text style={styles.text}>{item.mobile}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.cardContainer}>
          <Icon style={styles.icon} fill={Black} name="clock" />
          <Text style={styles.text}>{item.available}</Text>
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: verticalScale(5),
    marginHorizontal: scale(paddingSmall),
    backgroundColor: White,
    borderRadius: scale(borderRadiusMedium),
    width: scale(320),
  },
  icon: {
    width: scale(20),
    height: verticalScale(20),
    marginRight: scale(paddingSmall),
  },
  cardContainer: {
    flexDirection: 'row',
  },
  text: {
    color: Black,
    fontStyle: 'normal',
    fontFamily: FONT,
  },
});

export default TransportationCard;
