import React, {useState} from 'react';
import {ImageBackground, TouchableOpacity} from 'react-native';
import {
  Layout,
  Text,
  Popover,
  Button,
  Card,
  Modal,
} from '@ui-kitten/components';
import {SafeAreaView, View, StyleSheet} from 'react-native';
import {
  fontSizeBig,
  fontSizeVeryLarge,
  paddingMedium,
  paddingSmall,
  fontSizeMedium,
  fontSizeSmall,
  borderRadiusLarge,
  borderRadius,
} from '../../utils/UIConstants';
import {ScrollView} from 'react-native-gesture-handler';
import ContactCard from '../../components/contact-card.js';
import {scale, verticalScale} from 'react-native-size-matters';
import {White} from '../../utils/colors';
import {PopoverView} from '@ui-kitten/components/ui/popover/popoverView.component';

const Peers = () => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <Layout>
          <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}>
            <Text style={styles.department}>COMPUTER SCIENCE</Text>
            <View style={styles.cardContainer}>
              <ContactCard
                params={setVisible}
                name="Ram Kapoor"
                dept="CSE"
                intro="Likes to code, draw water from well"
                phone='+91 34500 34500'
              />
              <ContactCard
                params={setVisible}
                name="Ankit Kumar"
                dept="CSE"
                intro="Likes to code, draw water from well"
                phone='+91 34500 34500'
              />
            </View>
            <Text style={styles.department}>ELECTRICAL</Text>
            <View style={styles.cardContainer}>
              <ContactCard
                params={setVisible}
                name="Shyam Sundar"
                dept="EEE"
                intro="Likes to code, draw water from well"
                phone='+91 34500 34500'
              />
              <ContactCard
                params={setVisible}
                name="Ganesh Kumar"
                dept="EEE"
                intro="Likes to code, draw water from well"
                phone='+91 34500 34500'
              />
            </View>
            <Text style={styles.department}>MECHANICAL</Text>
            <View style={styles.cardContainer}>
              <ContactCard
                params={setVisible}
                name="Rajeev Das"
                dept="Mech"
                intro="Likes to code, draw water from well"
                phone='+91 34500 34500'
              />
              <ContactCard
                params={setVisible}
                name="G.S. Gupta"
                dept="Mech"
                intro="Likes to code, draw water from well"
                phone='+91 34500 34500'
              />
            </View>
            <Text style={styles.department}>CHEMICAL</Text>
            <View style={styles.cardContainer}>
              <ContactCard
                params={setVisible}
                name="Abhishek Singh"
                dept="Chem"
                intro="Likes to code, draw water from well"
                phone='+91 34500 34500'
              />
              <ContactCard
                params={setVisible}
                name="Nirmal Singhal"
                dept="Chem"
                intro="Likes to code, draw water from well"
                phone='+91 34500 34500'
              />
            </View>
          </ScrollView>
        </Layout>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: paddingMedium,
    paddingRight: paddingMedium,
  },
  department: {
    marginTop: paddingSmall,
    fontSize: fontSizeBig,
  },
  cardContainer: {
    flexDirection: 'row',
    paddingTop: paddingSmall,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 4,
    paddingVertical: 8,
    borderRadius: borderRadius,
  },
  text: {
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    height: verticalScale(150),
    width: scale(180),
    marginTop: verticalScale(10),
    marginBottom: verticalScale(10),
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
  popoverView: {
    position: 'absolute',
  },
});

export default Peers;
