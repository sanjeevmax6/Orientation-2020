import React from 'react';

import {Text, View, TouchableOpacity, Linking} from 'react-native';
import * as colors from '../../utils/colors';
import {Divider, Icon} from '@ui-kitten/components';
import {ScaledSheet, scale, verticalScale} from 'react-native-size-matters';

const Links = ({link}) => {
  return (
    <View style={{backgroundColor: 'white'}}>
      <Text style={styles.title}>Links</Text>
      <View style={{}}>
        {/* {links.map((item, index) => { //only one link is enough
          return ( */}
        <TouchableOpacity
          style={{flexDirection: 'row', marginBottom: verticalScale(3)}}
          onPress={() => {
            Linking.openURL(link).catch(err =>
              console.error('Invalid URL', err),
            );
          }}>
          <Icon
            name="link-outline"
            fill="blue"
            style={{height: verticalScale(15), width: scale(15)}}
          />
          <Text style={styles.url} ellipsizeMode="tail" numberOfLines={1}>
            {link}
          </Text>
        </TouchableOpacity>
        {/* );
        })} */}
      </View>
    </View>
  );
};
const styles = ScaledSheet.create({
  title: {
    fontSize: scale(17),
    fontWeight: '500',
    marginVertical: verticalScale(7),
    backgroundColor: 'white',
  },
  url: {
    color: 'blue',
    marginLeft: scale(5),
  },
});
export default Links;
