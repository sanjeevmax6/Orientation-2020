import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {Layout, Text} from '@ui-kitten/components';
import {SafeAreaView, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {paddingMedium, paddingSmall} from '../../utils/UIConstants';
import ContactCard from '../../components/contact-card';
import {verticalScale} from 'react-native-size-matters';

const Orientation = () => {
  const [visible, setVisible] = useState(false);
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.cardContainer}>
        <ContactCard
          params={setVisible}
          name="Ram Kapoor"
          dept="CSE"
          intro="Likes to code, draw water from well. Likes to code, draw water from well. Likes to code, draw water from well. Likes to code, draw water from well."
          phone="+91 34500 34500"
        />
        <ContactCard
          params={setVisible}
          name="Ankit Kumar"
          dept="CSE"
          intro="Likes to code, draw water from well"
          phone="+91 34500 34500"
        />
      </View>
      <View style={styles.cardContainer}>
        <ContactCard
          params={setVisible}
          name="Shyam Sundar"
          dept="EEE"
          intro="Likes to code, draw water from well"
          phone="+91 34500 34500"
        />
        <ContactCard
          params={setVisible}
          name="Ganesh Kumar"
          dept="EEE"
          intro="Likes to code, draw water from well"
          phone="+91 34500 34500"
        />
      </View>
      <View style={styles.cardContainer}>
        <ContactCard
          params={setVisible}
          name="Rajeev Das"
          dept="Mech"
          intro="Likes to code, draw water from well"
          phone="+91 34500 34500"
        />
        <ContactCard
          params={setVisible}
          name="G.S. Gupta"
          dept="Mech"
          intro="Likes to code, draw water from well"
          phone="+91 34500 34500"
        />
      </View>
      <View style={styles.cardContainer}>
        <ContactCard
          params={setVisible}
          name="Rajeev Das"
          dept="Mech"
          intro="Likes to code, draw water from well"
          phone="+91 34500 34500"
        />
        <ContactCard
          params={setVisible}
          name="G.S. Gupta"
          dept="Mech"
          intro="Likes to code, draw water from well"
          phone="+91 34500 34500"
        />
      </View>
      <View style={{height: verticalScale(100)}} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: paddingMedium,
    paddingRight: paddingMedium,
    backgroundColor: 'white',
  },
  cardContainer: {
    flexDirection: 'row',
    paddingTop: paddingMedium,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
export default Orientation;
