import React from 'react';
import {Card, Icon, Text} from '@ui-kitten/components';
import {SafeAreaView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {FONT, paddingSmall} from '../utils/UIConstants';
import Clipboard from '@react-native-clipboard/clipboard';
import {scale, verticalScale} from 'react-native-size-matters';
import {Black, White} from '../utils/colors';
import {useToast} from 'react-native-toast-notifications';
import {borderRadiusMedium} from '../utils/UIConstants';

const Transportation = ({data}) => {
  const toast = useToast();

  return (
    <SafeAreaView>
      <Card style={styles.card}>
        <View style={styles.cardContainer}>
          <Icon style={styles.icon} fill={Black} name="person" />

          <Text style={styles.text}>{data.name}</Text>
        </View>
        <View style={styles.cardContainer}>
          <Icon style={styles.icon} fill={Black} name="phone" />
          <TouchableOpacity
            onPress={() => {
              Clipboard.setString(data.mobile + '');
              toast.show(`Copied ${data.name}'s phone number to clipboard`, {
                type: 'success',
                placement: 'top',
                duration: 1500,
                offsetTop: verticalScale(1000),
                animationType: 'slide-in',
              });
            }}>
            <Text style={styles.text}>{data.mobile}</Text>
          </TouchableOpacity>
        </View>
        {data.available && (
          <View style={styles.cardContainer}>
            <Icon style={styles.icon} fill={Black} name="clock" />
            <Text style={styles.text}>{data.available}</Text>
          </View>
        )}
      </Card>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: verticalScale(5),
    marginHorizontal: scale(paddingSmall),
    backgroundColor: White,
    borderRadius: scale(borderRadiusMedium),
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

export default Transportation;
